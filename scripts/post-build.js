#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Running post-build checks...\n');

// Build verification
const buildDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found');
  process.exit(1);
}

console.log('✅ Build directory exists');

// Check for required build files
const requiredFiles = [
  '.next/BUILD_ID',
  '.next/routes-manifest.json',
];

let allFilesExist = true;
requiredFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Build verification failed');
  process.exit(1);
}

// Generate sitemap (if next-sitemap is configured)
console.log('\n📄 Checking for sitemap configuration...');
const sitemapConfig = path.join(process.cwd(), 'next-sitemap.config.js');
if (fs.existsSync(sitemapConfig)) {
  console.log('✅ Sitemap configuration found');
  console.log('ℹ️  Run next-sitemap separately if needed');
} else {
  console.log('⚠️  No sitemap configuration found');
}

// Asset optimization checks
console.log('\n🎨 Checking build output...');
const staticDir = path.join(buildDir, 'static');
if (fs.existsSync(staticDir)) {
  const stats = fs.statSync(staticDir);
  console.log(`✅ Static assets directory: ${(getDirectorySize(staticDir) / 1024 / 1024).toFixed(2)} MB`);
} else {
  console.log('⚠️  No static directory found');
}

console.log('\n✅ Post-build checks completed successfully!\n');

// Helper function to get directory size
function getDirectorySize(dirPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    });
  } catch (err) {
    // Ignore errors
  }
  return size;
}
