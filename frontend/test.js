const http = require('http');

function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve) => {
    let reqData = data;
    if (data && typeof data !== 'string') {
      reqData = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }
    if (reqData) {
      headers['Content-Length'] = Buffer.byteLength(reqData);
    }

    console.log(`\n--- REQUEST ---`);
    console.log(`URL: http://192.168.1.33:3000${path}`);
    console.log(`Method: ${method}`);
    if (reqData) console.log(`Payload: ${reqData}`);

    const req = http.request({
      hostname: '192.168.1.8',
      port: 3000,
      path: path,
      method: method,
      headers: headers
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`--- RESPONSE ---`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body}`);
        resolve({ statusCode: res.statusCode, headers: res.headers, data: body });
      });
    });

    req.on('error', (err) => resolve({ error: err.message }));

    if (reqData) {
      req.write(reqData);
    }
    req.end();
  });
}

async function test() {
  console.log('Logging in...');
  const loginRes = await makeRequest('/api/leads/auth/login', 'POST', { username: 'rahul.sharma', password: 'GMU@123' });
  const cookies = loginRes.headers['set-cookie'];
  const cookieHeader = cookies ? cookies.map(c => c.split(';')[0]).join('; ') : '';

  if (!cookieHeader) {
    console.log('Login failed');
    return;
  }

  const empId = 'EMP0004';

  // 1. Dashboard
  await makeRequest(`/api/leads/manager/users/${empId}/dashboard`, 'GET', null, { Cookie: cookieHeader });

  // 2. Leads
  await makeRequest(`/api/leads/manager/users/${empId}/leads`, 'GET', null, { Cookie: cookieHeader });

  // 3. Update Profile
  await makeRequest(`/api/leads/manager/users/${empId}/profile`, 'PUT', { name: 'Test User' }, { Cookie: cookieHeader });

  // 4. Update Status
  await makeRequest(`/api/leads/manager/users/${empId}/active-status`, 'PATCH', { status: 'inactive' }, { Cookie: cookieHeader });
}

test();
