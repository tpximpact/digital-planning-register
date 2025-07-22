# This file is part of the Digital Planning Register project.
# 
# Digital Planning Register is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# Digital Planning Register is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.


# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine AS base

# ////////////////////////////// dependencies
FROM base AS deps
ENV HUSKY=0
# we dont want it to install chrome as it will fail in alpine - also we're not running tests in this container but we need dev dependencies to build the app 🤷‍♀️
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Husky install file needed too
COPY .husky/install.mjs ./.husky/install.mjs
# Copy the local tgz package
COPY digital-planning-data-schemas-*.tgz ./
# Install dependencies
RUN npm ci

# ////////////////////////////// build
FROM base AS builder
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

CMD ["node", "server.js"]
