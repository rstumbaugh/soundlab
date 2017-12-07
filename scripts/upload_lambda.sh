#! /bin/bash

home=$(pwd)
for func in $( ls $home/../lambda_funcs/ | grep -v "__pycache__"); do
    cd $home/../lambda_funcs/$func
    zipfile=$func.zip
    zip -r $zipfile *

    aws lambda update-function-code \
        --function-name $func \
        --zip-file fileb://$zipfile

    aws lambda update-function-configuration \
        --function-name $func \
        --handler func.lambda_handler \
        --runtime python3.6
    rm *.zip
done