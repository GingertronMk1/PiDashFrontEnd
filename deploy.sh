#!/bin/sh

git fetch origin
git reset --hard origin/built-main
git clean -f
printf "\033c"
echo "Done!"