curl -w '\n\nTimeConnect: %{time_connect}\nTimeTransfer: %{time_starttransfer}\nTimeTotal: %{time_total}\n\n' \
-k --location --request POST https://api.defender.openzeppelin.com/autotasks/c17984aa-cf64-4c8d-b9c1-977cd0561493/runs/webhook/598f0539-a18f-427a-85cf-86ac6c4e6c89/TZdMNsNgePyUff6z8Phpj7 \
--header "Content-Type: application/json" \
--data '{
  "signature": "0xa35054cd1a20980be9334e4e5764dbb8feca9fccc789ec49b2b4244a769cf067238de2ae76a5cf9031702be642c77bbf6a98258a848d1ad92cc8604c5d4f978c1c",
  "request": {
    "value": 0,
    "gas": 1000000,
    "nonce": "0",
    "to": "0x180e0496e6ca844D65829260cdaEDaA874D40b6D",
    "from": "0xf3Dc5189dE653dbD3415726f050d1edC2e227030",
    "data": "0x6057361d0000000000000000000000000000000000000000000000000000000000000100"
  },
  "forwarderAddress": "0xaBf6e4bAAd731687FC1A78Ea363316B457dDd1c3",
  "type": "forward"
}' \
| jq -r 'if .status == "success" then (.result | fromjson | .txHash) else {result,message,status} end'
