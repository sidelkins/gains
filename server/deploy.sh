#!/bin/bash

docker build -t gains-api .

docker run -p 3000:3000 gains-api
