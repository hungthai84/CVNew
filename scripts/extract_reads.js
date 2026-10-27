const fs = require('fs');
const readline = require('readline');

async function extractReads() {
  const p = 'C:\\Users\\My Profile\\.gemini\\antigravity\\brain\\64a21c8a-8a8a-4593-a060-a652b5810db7\\.system_generated\\logs\\transcript_full.jsonl';
  const stream = fs.createReadStream(p, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let lineNum = 0;
  let reads = [];
  for await (const line of rl) {
    lineNum++;
    if (line.includes('Showing lines') && line.includes('AboutView.tsx')) {
      const d = JSON.parse(line);
      reads.push({ lineNum, content: d.content });
    }
  }
  console.log('Total reads of AboutView:', reads.length);
  fs.writeFileSync('all_recent_reads.json', JSON.stringify(reads, null, 2), 'utf8');
}

extractReads();
