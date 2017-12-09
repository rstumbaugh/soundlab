#! /bin/bash

aws dynamodb create-table \
  --cli-input-json file://create-session-table.json \
  --endpoint-url http://localhost:5555