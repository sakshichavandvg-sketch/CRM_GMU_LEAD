const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/OneDrive/Desktop/Project/GMU/frontend/src/features/leads/components/details';

const mappings = {
  '-2xl': '-12',
  '-xl': '-8',
  '-lg': '-6',
  '-md': '-4',
  '-sm': '-2',
  '-xs': '-1'
};

const prefixes = ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'gap'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const prefix of prefixes) {
    for (const [suffix, newSuffix] of Object.entries(mappings)) {
      const regex = new RegExp(`\\b${prefix}${suffix}\\b`, 'g');
      content = content.replace(regex, `${prefix}${newSuffix}`);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverse(filePath);
    } else if (filePath.endsWith('.jsx')) {
      processFile(filePath);
    }
  }
}

traverse(dir);
console.log('Done');
