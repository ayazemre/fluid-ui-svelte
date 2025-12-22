#!/bin/bash

# Extract version from package.json using base linux tools
get_version() {
    grep '"version":' "$1" | head -1 | sed 's/.*"version": "\(.*\)".*/\1/'
}

CURRENT_VERSION=$(get_version package.json)

# Try to get the version from origin/main
# If this fails (e.g. no remote), it will default to comparing against the latest tag
git fetch origin main --quiet 2>/dev/null
MAIN_VERSION=$(git show origin/main:package.json 2>/dev/null | grep '"version":' | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')

if [ -z "$MAIN_VERSION" ]; then
    # Fallback to the latest git tag if main is not accessible
    LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    if [ -n "$LATEST_TAG" ]; then
        MAIN_VERSION=$LATEST_TAG
        echo "Comparing against latest tag: $LATEST_TAG"
    else
        echo "Could not find a reference version to compare against (main branch or tags)."
        exit 0
    fi
fi

echo "Current version: $CURRENT_VERSION"
echo "Reference version: $MAIN_VERSION"

if [ "$CURRENT_VERSION" == "$MAIN_VERSION" ]; then
    echo "Error: Version in package.json has not been updated ($CURRENT_VERSION)."
    exit 1
else
    echo "Success: Version has been updated to $CURRENT_VERSION."
    exit 0
fi
