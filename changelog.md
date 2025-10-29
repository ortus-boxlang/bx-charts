# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

* * *

## [Unreleased]

## [1.3.0] - 2025-10-29

### Fixed

- `backgroundColor` attribute in Chart component
  - Now correctly applies background color to chart container div
  - Supports hexadecimal values (e.g., `##FFFFFF`) and named colors (e.g., `white`)
  - Added padding to prevent chart elements from touching container edges
- Improved handling of font styles for bold and italic.
- Corrected all boolean attribute defaults in Chart.bx and ChartSeries.bx components
  - Ensured boolean attributes default to `false` unless explicitly set to `true`
  - Reviewed and updated documentation to reflect accurate default values

## [1.2.0] - 2025-10-16

### Added

- `borderColor` attribute for Chart component and ChartSeries component
  - Chart level: Controls border color for all chart elements globally
  - Series level: Overrides chart-level borderColor for individual series
  - Accepts hexadecimal values (e.g., `##FF0000`) or named colors (e.g., `red`)
  - Falls back to series colors when not specified
  - Works with chart types: bar, line, area, pie, doughnut, radar, polarArea, bubble, horizontalbar
  - Comprehensive documentation in Chart.bx and ChartSeries.bx components
- `borderWidth` attribute for Chart component and ChartSeries component
  - Chart level: Controls border width in pixels for all chart elements globally
  - Series level: Overrides chart-level borderWidth for individual series
  - Applies to chart types: bar, line, area, pie, doughnut, radar, polarArea, bubble, horizontalbar
  - Default values: 1 for bar, 2 for pie/doughnut/polarArea/bubble, 3 for line/area/radar
  - Set to custom value to override defaults (e.g., `borderwidth="5"`)
  - Works in conjunction with borderColor attribute
- `borderRadius` attribute for Chart component and ChartSeries component
  - Chart level: Controls border radius in pixels for all bars globally
  - Series level: Overrides chart-level borderRadius for individual series
  - Applies to chart types: bar, horizontalbar only
  - Default: 0 (sharp corners)
  - Set to positive value for rounded bars (e.g., `borderradius="10"`)
  - Creates modern, polished bar chart appearance
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
- Responsive chart support features
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

- First iteration of this module

[unreleased]: https://github.com/ortus-boxlang/bx-charts/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.0.0
