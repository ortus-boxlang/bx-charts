# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

* * *

## [Unreleased]

### Added
- Responsive chart support with Chart.js features
  - `responsive` attribute (default: true) - Chart resizes to fit container width
  - `maintainAspectRatio` attribute (default: true) - Maintains width/height ratio during resize
  - `aspectRatio` attribute (default: 2) - Custom aspect ratio (width/height)
- Container div now uses flexible sizing when responsive mode is enabled
- Comprehensive test file with 7+ responsive chart examples
- Documentation for responsive features in readme.md

### Changed
- Updated renderChart to support responsive and non-responsive modes
- Chart container styling now adapts based on responsive settings

## [1.0.0] - 2025-10-11

## [1.0.0] - 2025-10-11

## [1.0.0] - 2025-10-11

- First iteration of this module

[unreleased]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ortus-boxlang/bx-charts/compare/v1.0.0...v1.0.0
