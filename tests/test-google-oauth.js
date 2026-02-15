// test-google-oauth.js
require('dotenv').config();

console.log('\nGOOGLE OAUTH CREDENTIALS VERIFICATION\n');
console.log('═'.repeat(50));

// Check GOOGLE_CLIENT_ID
if (process.env.GOOGLE_CLIENT_ID) {
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
} else {
    console.log('GOOGLE_CLIENT_ID: Not defined');
}

// Check GOOGLE_CLIENT_SECRET
if (process.env.GOOGLE_CLIENT_SECRET) {
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET.substring(0, 10) + '...');
} else {
    console.log('GOOGLE_CLIENT_SECRET: Not defined');
}

// Check GOOGLE_CALLBACK_URL
if (process.env.GOOGLE_CALLBACK_URL) {
    console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
} else {
    console.log('GOOGLE_CALLBACK_URL: Not defined');
}

console.log('═'.repeat(50));

// Check .env file
const fs = require('fs');
if (fs.existsSync('.env')) {
    console.log('.env file: Present');
    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('GOOGLE_CLIENT_ID')) {
        console.log('GOOGLE_CLIENT_ID found in .env');
    }
    if (envContent.includes('GOOGLE_CLIENT_SECRET')) {
        console.log('GOOGLE_CLIENT_SECRET found in .env');
    }
    if (envContent.includes('GOOGLE_CALLBACK_URL')) {
        console.log('GOOGLE_CALLBACK_URL found in .env');
    }
} else {
    console.log('.env file: Not found');
}

console.log('═'.repeat(50));
console.log('\nTo get your Google OAuth credentials:');
console.log('   1. Go to https://console.cloud.google.com');
console.log('   2. Create a project or select an existing one');
console.log('   3. Go to "APIs & Services" > "Credentials"');
console.log('   4. Create an "OAuth client ID" of type "Web application"');
console.log('   5. Add as redirect URI: http://localhost:3000/api/auth/google/callback');
console.log('   6. Copy the Client ID and Client Secret to your .env file\n');