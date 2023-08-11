#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] &&
  [[ $1 == "trybe-security-parameter" ]] &&
  git filter-repo \
    --path .trybe \
    --path .github \
    --path .vscode \
    --path trybe.yml \
    --path __tests__ \
    --path env.example \
    --path public \
    --path FAQ.md \
    --path README.md \
    --path package.json \
    --path package-lock.json \
    --invert-paths --force --quiet
