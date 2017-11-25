# SoundLab

SoundLab is a collaborative DJ web app created using various services provided by AWS. This was the final project for [CMSC389L: Practical Cloud Computing with AWS](https://umd-cs-stics.gitbooks.io/cmsc389l-fall2017/content/).

## Running locally
### Preqrequisites
* [AWS Command Line Interface](https://aws.amazon.com/cli/) installed (with `PATH` configured).
* [AWS SAM Local](https://github.com/awslabs/aws-sam-local) installed.
* [Elastic Beanstalk CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) installed.
* `npm` and `node.js`

### Clone the repo
`git clone https://github.com/rstumbaugh/soundlab`

### Install required packages
`cd soundlab; npm install`

`cd ebs; npm install`

### Start the API
In `soundlab/`, execute `npm run api`.

### Start the app server
In `soundlab/eb/`, execute `npm run start`.

If doing local development on the React front end, execute `npm run watch` in `soundlab/eb/`.