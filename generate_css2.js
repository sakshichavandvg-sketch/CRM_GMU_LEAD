const fs = require('fs');
const html = fs.readFileSync('stitch_export.html', 'utf8');
const match = html.match(/tailwind\.config = (\{.*?\})\s*</s);
const config = eval('(' + match[1] + ')');
const theme = config.theme.extend;

let css = fs.readFileSync('frontend/src/features/callReports/components/stitch/stitch-theme.css', 'utf8');

for (const [key, value] of Object.entries(theme.colors)) {
    css += `.stitch-call-report .hover\\:bg-${key}:hover { background-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .focus\\:border-${key}:focus { border-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .focus\\:ring-${key}:focus { --tw-ring-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .active\\:scale-95:active { transform: scale(0.95); }\n`;
}

fs.writeFileSync('frontend/src/features/callReports/components/stitch/stitch-theme.css', css);
console.log('Appended hover/focus states to stitch-theme.css');
