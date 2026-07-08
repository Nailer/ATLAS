# in the backend
npm run dev

curl -X POST http://localhost:8099/shield \
  -H "Content-Type: application/json" \
  -d '{"contractAddress": "0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63"}'