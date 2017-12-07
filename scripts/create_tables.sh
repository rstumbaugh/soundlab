#! /bin/bash

cd ~/Development/soundlab/scripts
aws dynamodb create-table \
  --cli-input-json file://create-request-table.json \
  --endpoint-url http://localhost:5555