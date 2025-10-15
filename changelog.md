# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

* * *

## [Unreleased]

### Added

- Automated chart.js installation and management via npm
  - `package.json` with Chart.js dependency
  - `npm install` to download Chart.js to `/public/`
  - `npm run update-chartjs` to update to latest Chart.js version
- Bubble chart support (`type="bubble"`)
  - New chart type for displaying three-dimensional data (x, y, radius)
  - Extended `<bx:chartdata>` component with `x`, `y`, and `r` attributes for bubble charts
  - Comprehensive bubble chart example in test files
  - Documentation for bubble chart usage in readme.md
- Chart selection guide in readme.md
  - "Choosing the Right Chart Type" section with quick selection guide
  - Visual examples table with images for all 10 chart types
  - Decision tree for selecting appropriate chart type
  - Common pitfalls and best practices guide
- Responsive chart support with Chart.js features
  - `responsive` attribute (default: true) - Chart resizes to fit container width
  - `maintainAspectRatio` attribute (default: true) - Maintains width/height ratio during resize
  - `aspectRatio` attribute (default: 2) - Custom aspect ratio (width/height)
  - `resizeDelay` attribute (default: 0) - Delay in milliseconds before resize update for performance
- Container div now uses flexible sizing when responsive mode is enabled
- Comprehensive test file with 7+ responsive chart examples
- Documentation for responsive features in readme.md

### Changed

- Updated validTypes array in ChartSeries.bx to include "bubble"
- Enhanced buildChartConfig() in Chart.bx to support bubble chart data structure
- Updated renderChart to support responsive and non-responsive modes
- Chart container styling now adapts based on responsive settings
- Module now supports 10 chart types (previously 9)

## [1.0.0] - 2025-10-11

## [1.0.0] - 2025-10-11

- First iteration of this module

[unreleased]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.0.0
