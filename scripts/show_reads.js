const fs = require('fs');

const reads = JSON.parse(fs.readFileSync('all_recent_reads.json', 'utf8'));
console.log('Read 19 lineNum:', reads[19].lineNum);
console.log('Read 20 lineNum:', reads[20].lineNum);
// Let's write reads 17, 18, 19, 20 content to a text file
for (let i = 17; i < reads.length; i++) {
  fs.writeFileSync(`read_${i}.txt`, JSON.stringify(reads[i]), 'utf8');
}
