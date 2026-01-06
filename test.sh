
#!/bin/bash

MENSAJE="$1"

if [ -z "$MENSAJE" ]; then
  echo "Uso: $0 \"mensaje a enviar\""
  exit 1
fi

http POST http://localhost:3000/chat \
  Content-Type:application/json \
  "messages:=[{\"role\":\"user\",\"content\":\"$MENSAJE\"}]"
