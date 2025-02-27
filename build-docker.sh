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

#! /bin/bash

docker build --pull --rm -f "Dockerfile" -t councilpublicindex:latest "."
docker run \
  --rm \
  -p 3000:3000 \
  --name dpr \
  --env-file .env.test \
  councilpublicindex:latest
