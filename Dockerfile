

# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine as base

# ////////////////////////////// dependencies
FROM base as deps
ENV HUSKY=0
# we dont want it to install chrome as it will fail in alpine - also we're not running tests in this container but we need dev dependencies to build the app 🤷‍♀️
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Husky install file needed too
COPY .husky/install.mjs ./.husky/install.mjs
# Install dependencies
RUN npm ci

# ////////////////////////////// build
FROM base as builder
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
CMD ["tail", "-f", "/dev/null"]

# ////////////////////////////// run
FROM base AS runner
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD node server.js
