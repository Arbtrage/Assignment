#!/bin/bash
cd client
if [ ! -d "node_modules" ]; then
  # Install server dependencies
  npm install
fi
npm run dev &

cd ..

cd server

if [ ! -d "node_modules" ]; then
  # Install server dependencies
  npm install
fi


npm run start