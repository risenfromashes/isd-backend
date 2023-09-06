#!/bin/bash

git submodule update --init --recursive

cd VeriTax-FrontEnd
bash commands.md

npm run build

cd ..

npm install

