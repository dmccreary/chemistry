#!/bin/bash
# Remove all .backup files from the repository

find . -name "*.backup" -type f -print -delete
