# SoundLab

SoundLab is a collaborative DJ web app created using various services provided by AWS. This was the final project for [CMSC389L: Practical Cloud Computing with AWS](https://umd-cs-stics.gitbooks.io/cmsc389l-fall2017/content/).

## Running locally
### Preqrequisites
* [AWS Command Line Interface](https://aws.amazon.com/cli/) installed (with `PATH` configured).
* [AWS SAM Local](https://github.com/awslabs/aws-sam-local) installed.
* [Elastic Beanstalk CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) installed.
* [Docker daemon](https://www.docker.com/) installed & running.
* `npm` and `node.js`

### Clone the repo
`git clone https://github.com/rstumbaugh/soundlab`

### Install required packages
`cd soundlab; npm install`

`cd ebs; npm install`

### Start the API
In `soundlab/`, execute `npm run api`.

### Compile the JS & start the app server
`cd eb/`

`npm run build`

`npm run start`

Navigate to `localhost:8081` in a different browser tabs to simulate a few users. To join an existing session, simply enter the same session name on the home page.