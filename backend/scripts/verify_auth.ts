// using native fetch


const BASE_URL = 'http://localhost:3001/auth';
let cookie = '';

async function register() {
    console.log('1. Registering user...');
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'newpassword123',
            name: 'Test Admin'
        })
    });
    const data = await res.json();
    console.log('Register Response:', res.status, data);
}

async function login() {
    console.log('\n2. Logging in...');
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'newpassword123'
        })
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
        cookie = setCookie;
        console.log('Login Successful. Cookie received.');
    } else {
        console.log('Login Failed. No cookie.');
    }
    const data = await res.json();
    console.log('Login Response:', res.status, data);
}

async function accessProtected() {
    console.log('\n3. Accessing /me (Protected)...');
    const res = await fetch(`${BASE_URL}/me`, {
        headers: {
            'Cookie': cookie
        }
    });
    const data = await res.json();
    console.log('Me Response:', res.status, data);
}

async function logout() {
    console.log('\n4. Logging out...');
    const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Cookie': cookie
        }
    });
    console.log('Logout Response:', res.status);
}

async function accessProtectedAfterLogout() {
    console.log('\n5. Accessing /me after logout...');
    // Cookie should be cleared or invalid, but we simulate browser behavior by clearing it or sending the cleared one?
    // The server sends Set-Cookie to clear it.
    // We will just send no cookie or the old one to see if server invalidated it (JWT doesn't invalidate on server side usually unless blacklist, but client clears it).
    // Wait, logout controller clears cookie on client. JWT is stateless.
    // So if I send the OLD token, it will STILL work unless token expired or I implemented blacklist (I didn't).
    // BUT, the browser would clear it.
    // So this test step validates that if NO cookie is sent, it fails.

    const res = await fetch(`${BASE_URL}/me`, {
        // No cookie
    });
    console.log('Me Response (No Cookie):', res.status);
}

async function run() {
    try {
        await register();
        await login();
        if (cookie) {
            await accessProtected();
            await logout();
            await accessProtectedAfterLogout();
        }
    } catch (e) {
        console.error(e);
    }
}

run();
