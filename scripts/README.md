# Scripts Directory

This directory contains utility scripts for managing the BoxLang Charts module.

## copy-assets.js

This script copies the Chart.js library from `node_modules` to the `public` directory.

**Usage:**
```bash
npm run copy-assets
```

**What it does:**
1. Locates the Chart.js UMD build in `node_modules/chart.js/dist/chart.umd.js`
2. Copies it to `public/chart.min.js`
3. Reports the version and file size

**When to use:**
- After updating the Chart.js version in package.json
- When setting up a new development environment
- As part of the automated `npm run update` command
