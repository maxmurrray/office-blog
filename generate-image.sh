#!/bin/bash
source ~/.openclaw/.env
PROMPT="$1"
OUTFILE="$2"
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=$GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Generate an image: $PROMPT\"}]}],\"generationConfig\":{\"responseModalities\":[\"TEXT\",\"IMAGE\"]}}" \
| python3 -c "
import json,sys,base64
r=json.load(sys.stdin)
for p in r.get('candidates',[{}])[0].get('content',{}).get('parts',[]):
  if 'inlineData' in p:
    d=base64.b64decode(p['inlineData']['data'])
    open('$OUTFILE','wb').write(d)
    print('OK: $OUTFILE ('+str(len(d))+' bytes)')
if 'error' in r: print('ERR:',json.dumps(r['error'])[:150])
"
