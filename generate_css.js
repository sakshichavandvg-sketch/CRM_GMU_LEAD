const fs = require('fs');
const html = fs.readFileSync('stitch_export.html', 'utf8');
const match = html.match(/tailwind\.config = (\{.*?\})\s*</s);
const config = eval('(' + match[1] + ')');
const theme = config.theme.extend;

let css = '.stitch-call-report {\n';
for (const [key, value] of Object.entries(theme.colors)) {
    css += `  --color-${key}: ${value};\n`;
}
for (const [key, value] of Object.entries(theme.spacing)) {
    css += `  --spacing-${key}: ${value};\n`;
}
for (const [key, value] of Object.entries(theme.borderRadius)) {
    css += `  --radius-${key}: ${value};\n`;
}
for (const [key, value] of Object.entries(theme.fontFamily)) {
    css += `  --font-${key}: ${value.join(', ')};\n`;
}
for (const [key, value] of Object.entries(theme.fontSize)) {
    css += `  --text-${key}: ${value[0]};\n`;
    if (value[1].lineHeight) css += `  --leading-${key}: ${value[1].lineHeight};\n`;
    if (value[1].letterSpacing) css += `  --tracking-${key}: ${value[1].letterSpacing};\n`;
    if (value[1].fontWeight) css += `  --weight-${key}: ${value[1].fontWeight};\n`;
}
css += '}\n\n';

for (const [key, value] of Object.entries(theme.colors)) {
    css += `.stitch-call-report .bg-${key} { background-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .text-${key} { color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .border-${key} { border-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .ring-${key} { --tw-ring-color: var(--color-${key}); }\n`;
    css += `.stitch-call-report .shadow-${key}\\/10 { --tw-shadow-color: color-mix(in srgb, var(--color-${key}) 10%, transparent); }\n`;
}
for (const [key, value] of Object.entries(theme.spacing)) {
    css += `.stitch-call-report .p-${key} { padding: var(--spacing-${key}); }\n`;
    css += `.stitch-call-report .px-${key} { padding-left: var(--spacing-${key}); padding-right: var(--spacing-${key}); }\n`;
    css += `.stitch-call-report .gap-${key} { gap: var(--spacing-${key}); }\n`;
}
for (const [key, value] of Object.entries(theme.borderRadius)) {
    const className = key === 'DEFAULT' ? 'rounded' : `rounded-${key}`;
    css += `.stitch-call-report .${className} { border-radius: var(--radius-${key}); }\n`;
}
for (const [key, value] of Object.entries(theme.fontFamily)) {
    css += `.stitch-call-report .font-${key} { font-family: var(--font-${key}); }\n`;
}
for (const [key, value] of Object.entries(theme.fontSize)) {
    css += `.stitch-call-report .text-${key} { font-size: var(--text-${key}); line-height: var(--leading-${key}); font-weight: var(--weight-${key}); letter-spacing: var(--tracking-${key}); }\n`;
}

css += `
.stitch-call-report { font-family: 'Outfit', sans-serif; }
.stitch-call-report .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block;
    vertical-align: middle;
}
.stitch-call-report .main-shadow { box-shadow: 0 8px 32px rgba(15,23,42,.05); }
.stitch-call-report .table-row-hover:hover { background-color: #F9FAFB; }
.stitch-call-report .transition-standard { transition: all 0.2s ease-in-out; }

/* additional overrides to prevent bleed */
.stitch-call-report button { outline: none; }
`;

fs.mkdirSync('frontend/src/features/callReports/components/stitch', { recursive: true });
fs.writeFileSync('frontend/src/features/callReports/components/stitch/stitch-theme.css', css);
console.log('Created stitch-theme.css');
