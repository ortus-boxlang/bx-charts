#!/usr/bin/env node

/**
 * Script to copy Chart.js assets from node_modules to the public directory
 * 
 * This script is used to update the Chart.js library by copying the minified
 * version from node_modules to the public directory where it's served by the module.
 */

const fs = require('fs');
const path = require('path');

// Define source and destination paths
const sourceFile = path.join(__dirname, '..', 'node_modules', 'chart.js', 'dist', 'chart.umd.js');
const destFile = path.join(__dirname, '..', 'public', 'chart.min.js');

// Check if source file exists
if (!fs.existsSync(sourceFile)) {
    console.error('❌ Error: Chart.js source file not found at:', sourceFile);
    console.error('   Please run "npm install" first.');
    process.exit(1);
}

// Create public directory if it doesn't exist
const publicDir = path.dirname(destFile);
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('✅ Created public directory');
}

// Copy the file
try {
    fs.copyFileSync(sourceFile, destFile);
    console.log('✅ Successfully copied Chart.js to public/chart.min.js');
    
    // Get version from package.json
    const packageJson = require('../node_modules/chart.js/package.json');
    console.log(`📦 Chart.js version: ${packageJson.version}`);
    
    // Get file size
    const stats = fs.statSync(destFile);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 File size: ${fileSizeInKB} KB`);
    
} catch (error) {
    console.error('❌ Error copying file:', error.message);
    process.exit(1);
}
