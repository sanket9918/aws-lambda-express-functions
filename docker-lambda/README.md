# Serverless - AWS Node.js Docker

This project is an experiment to test the custom nodejs images as lambda and couples with aws ambda runtime interface to make it compatible with the lambda runtime. 
## Instructions to deploy to Docker 
- To build the docker image.
```sh
docker build -t docker-lambda . 
```

- To run the image in a container
```sh
docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 \                        
    --entrypoint /aws-lambda/aws-lambda-rie \
    docker-lambda:latest \
        /usr/local/bin/npx aws-lambda-ric build/index.handler
```
- To test the functionality of the lambda handler deployed, run this command or else test it with a API testing tool (Postman)
```sh
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```


## Test your service

To test the code locally without deploying it with the Docker, run this command

```sh
serverless invoke local --function hello -d '{}'
```
