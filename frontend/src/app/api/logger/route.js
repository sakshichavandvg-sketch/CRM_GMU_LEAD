import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'audit_payload_logs.json');
    
    // Append to array in file
    let logs = [];
    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf-8');
      if (existing) logs = JSON.parse(existing);
    }
    
    logs.push({
      timestamp: new Date().toISOString(),
      ...data
    });
    
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
