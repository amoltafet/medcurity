## About Tools

The .\tools folder contains files and code that control automation and deployment of the app and the server.
The docker-config.yml file contains code that it is used in Azure Web App under Deployment Center > Settings > Docker Compose 

### Built With Docker

Currently the deployment builds the docker containers then pushes them to the azure container registry. When that push is detected, azure deploys the containers respective to their app service.