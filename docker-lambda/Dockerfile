# Define custom function directory
ARG FUNCTION_DIR="/function"

FROM node:18-bullseye as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY src package.json tsconfig.json ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

# If the dependency is not in package.json uncomment the following line
# RUN npm install aws-lambda-ric

RUN npm install && npm install aws-lambda-ric
RUN npm install -g typescript
RUN tsc


# Grab a fresh slim copy of the image to reduce the final size
FROM node:18-bullseye

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["app.handler"]