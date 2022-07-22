#!/bin/sh

sourceDir="../src"
targetDir="../__tests__"

find "$sourceDir" -type d | sed -e "s?$sourceDir?$targetDir?" | xargs mkdir -p