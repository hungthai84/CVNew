const fs = require('fs');

const code = fs.readFileSync('.next/server/app/page.js', 'utf8');

// Find occurrences of AboutView
const regex = /\/\*\*\*\/ "\.\/src\/components\/views\/AboutView\.tsx":[\s\S]*?\/\*\*\*\/ "\.\//;
const match = code.match(regex);
if (match) {
  console.log('Found AboutView bundle! Length:', match[0].length);
  fs.writeFileSync('aboutview_bundle.js', match[0], 'utf8');
} else {
  // Let's search by string
  const start = code.indexOf('"./src/components/views/AboutView.tsx"');
  console.log('Start index:', start);
  if (start !== -1) {
    const slice = code.slice(start, start + 35000);
    fs.writeFileSync('aboutview_bundle.js', slice, 'utf8');
    console.log('Saved slice of length', slice.length);
  }
}
