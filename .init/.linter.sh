#!/bin/bash
cd /home/kavia/workspace/code-generation/study-hub-210261-211586/study_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

