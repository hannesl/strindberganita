#!/bin/bash

# Usage: bash deploy.sh

echo "This script will overwrite the remote site files with your local copy."
echo "Are you sure you want to continue?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) echo "Oh, well."; exit;;
    esac
done

# Get the path to the site directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Copying site files, please be patient..."
s3cmd sync --delete-removed \
  --exclude ".sass-cache*"\
  --exclude ".git*"\
  --exclude ".gitignore"\
  --exclude "deploy.sh"\
  --exclude "sass*"\
  --exclude "config.rb"\
  --exclude ".DS_Store"\
  $DIR/ s3://www.strindberganita.se/test/

echo "Done!"
