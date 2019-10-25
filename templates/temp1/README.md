# Welcome to projectName
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

### [Homepage] HomePage

## Requirements

1. Install the following:
    * Node.js 
    * npm (node package manager)
    * Docker 

2. Authenticating to the google cloud console
## Installation

##### Node
- Installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- Installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.
      $ sudo apt install nodejs
      $ sudo apt install npm

-  Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.


``` node --version```
  
``` npm --version```
    

###
##### Docker 

- Installation on Windows
https://docs.docker.com/docker-for-windows/install/

- Installation on Ubuntu
https://docs.docker.com/docker-for-mac/


##### Project

1. git clone ProjectURL
2. cd projectName
3. mkdir .env
4. npm install nodemon -g 
5. npm install 

## Authenticating to the google cloud console
Please use one of the flowing to add authentication file in your local machine 

* https://cloud.google.com/docs/authentication/production
* https://cloud.google.com/video-intelligence/docs/common/auth


## npm command usage



| Command description                     |Command                              | 
| :--------------------------------------|:------------------------------------| 
| Build the project                       |  npm run build                      |
| Run the project locally                 |  npm run dev                        |
| Build docker image                      |  npm run docker                     |
| Check linting                           |  npm run lint                       |
| Fix linting issue                       |  npm run lint:fix                   |
| Run test                                |  npm run test                       |
| Build the project                       |  npm run build                      |
| Run the project on production mode      |  npm start                          |


## Author

👤 ZtarMobile Development Team 