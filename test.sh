#!/bin/bash
http POST http://localhost:3000/chat \
  Content-Type:application/json \
  'messages:=[{"role":"user","content":"¿Que es una funcion anonima en javascript?"}]'
