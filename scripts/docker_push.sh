#!/bin/bash
set -e

# Configuration - Update these variables or pass them as environment variables
REGISTRY=${DOCKER_REGISTRY:-"your-registry-url"}
IMAGE_NAME="fluid-ui-svelte"
TAG=${IMAGE_TAG:-"latest"}

FULL_IMAGE_NAME="$REGISTRY/$IMAGE_NAME:$TAG"

echo "Building Docker image: $FULL_IMAGE_NAME..."
docker build -t "$FULL_IMAGE_NAME" .

echo "Pushing image to registry..."
docker push "$FULL_IMAGE_NAME"

echo "Docker push complete."
