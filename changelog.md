# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

* * *

## [Unreleased]

### Added

- Array data source support in ChartSeries component
  - `data` attribute - Array to use as data source, providing flexible alternative to chartData components and queries
  - Supports array of structs format: `[{item:"Product A",value:100}, {item:"Product B",value:200}]`
  - Supports array of arrays (positional) format: `[["Product A",100], ["Product B",200]]`
  - Supports bubble chart array of structs: `[{item:"Point A",x:10,y:20,r:5}]`
  - Supports bubble chart array of arrays: `[["Point A",10,20,5]]`
  - Internal `convertArrayToChartData()` method for array-to-chart-data conversion
  - Comprehensive validation with descriptive error messages
  - Mixed format detection to prevent inconsistent data
- Explorer page for array data examples (`explorer/charts-array.bxm`)
  - 10 comprehensive examples showcasing array data source usage
  - Examples for both array of structs and array of arrays formats
  - Bubble chart examples with both formats
  - Documentation section explaining format selection and usage
- Updated readme.md with array data source examples and usage guidelines
  - New section "Chart with Array Data Source" with multiple examples
  - Array format comparison table
  - Dynamic array example showing programmatic data generation
- Enhanced ChartSeries documentation with array format examples
- Test coverage for array data functionality
  - Tests for array of structs format
  - Tests for array of arrays format
  - Tests for bubble chart array formats
  - Tests for validation and error handling

### Changed

- ChartSeries now supports three data source methods: chartData components, query objects, and arrays
- Enhanced component documentation with more comprehensive examples

## [1.1.0] - 2025-10-15

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

[unreleased]: https://github.com/ortus-boxlang/bx-charts/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.0.0
