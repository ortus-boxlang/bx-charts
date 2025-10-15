#!/bin/bash

# Create the boxlang_modules directory if it doesn't exist
mkdir -p boxlang_modules
# Navigate to the boxlang_modules directory
cd boxlang_modules
# Create a symbolic link to the bx-charts module, if it doesn't exist
[ ! -L "bx-charts" ] && ln -s ../ bx-charts