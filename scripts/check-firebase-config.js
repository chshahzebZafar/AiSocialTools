/**
 * Firebase Configuration Checker
 * Run this script to verify your Firebase configuration
 * 
 * Usage: node scripts/check-firebase-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Firebase Configuration...\n');

// Check for .env.local file
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('📝 Create a .env.local file with your Firebase configuration.\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      envVars[key.trim()] = value.trim();
    }
  }
});

// Required Firebase variables
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

console.log('📋 Environment Variables Check:\n');

let allPresent = true;
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value.length > 0) {
    // Mask sensitive values
    const displayValue = varName.includes('API_KEY') 
      ? `${value.substring(0, 10)}...` 
      : value;
    console.log(`✅ ${varName}: ${displayValue}`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allPresent = false;
  }
});

console.log('\n');

// Check project ID consistency
const projectId = envVars['NEXT_PUBLIC_FIREBASE_PROJECT_ID'];
const authDomain = envVars['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'];

if (projectId && authDomain) {
  console.log('🔗 Project Consistency Check:\n');
  
  // Extract project ID from auth domain
  const authDomainProject = authDomain.replace('.firebaseapp.com', '');
  
  if (projectId === authDomainProject) {
    console.log(`✅ Project ID matches auth domain: ${projectId}`);
  } else {
    console.log(`⚠️  Project ID mismatch:`);
    console.log(`   Project ID: ${projectId}`);
    console.log(`   Auth Domain Project: ${authDomainProject}`);
    console.log(`   This might cause authentication issues!`);
  }
  
  // Check if it matches the expected project
  if (projectId === 'socialtools-a82dc') {
    console.log(`✅ Project ID matches expected: ${projectId}`);
  } else {
    console.log(`⚠️  Project ID (${projectId}) doesn't match expected (socialtools-a82dc)`);
    console.log(`   Make sure you're using the correct Firebase project!`);
  }
}

console.log('\n');

// Summary
if (allPresent) {
  console.log('✅ All required environment variables are present!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Verify OAuth Consent Screen is configured in Google Cloud Console');
  console.log('   2. Ensure Identity Toolkit API is enabled');
  console.log('   3. Check that authorized domains match in both Firebase and OAuth consent screen');
  console.log('   4. Restart your dev server: npm run dev');
} else {
  console.log('❌ Some environment variables are missing!');
  console.log('   Please add them to your .env.local file.');
}

console.log('\n');

