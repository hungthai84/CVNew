const fs = require('fs');
const readline = require('readline');

async function extractLine(targetLine) {
  const p = 'C:\\Users\\My Profile\\.gemini\\antigravity\\brain\\64a21c8a-8a8a-4593-a060-a652b5810db7\\.system_generated\\logs\\transcript_full.jsonl';
  const stream = fs.createReadStream(p, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (lineNum === targetLine) {
      fs.writeFileSync('extracted_line_12901.json', line, 'utf8');
      console.log('Saved line', targetLine);
      break;
    }
  }
}

extractLine(12901);
