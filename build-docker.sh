#! /bin/bash

docker build --pull --rm -f "Dockerfile" -t councilpublicindex:latest "."
docker run \
  --rm \
  -p 3000:3000 \
  --name dpr \
  --env-file .env.test \
  councilpublicindex:latest
