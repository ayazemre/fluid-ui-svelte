#!/bin/bash
set -e

echo "Building library package..."
npm run build

echo "Publishing to NPM..."
# Ensure you are authenticated via 'npm login' or have NPM_TOKEN set
npm publish --access public

echo "NPM deployment complete."
