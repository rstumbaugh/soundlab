#! /bin/bash

for i in $( ls ../lambda/*.py ); do
    name=$(basename $i .py)
    cp $i .
    zipfile=$name.zip
    zip $zipfile $name.py
    aws lambda update-function-code --function-name $name --zip-file fileb://$zipfile
    aws lambda update-function-configuration --function-name $name --handler $name.lambda_handler --runtime python3.6
    rm *.py *.zip
done