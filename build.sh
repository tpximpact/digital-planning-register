#! /bin/bash

rm -rf .next
npm run build
cp -r public/ .next/standalone/public
cp -r .next/static .next/standalone/.next
node .next/standalone/server.js
