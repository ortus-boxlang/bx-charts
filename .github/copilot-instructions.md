# BoxLang Charts Module - Copilot Instructions

## Project Overview

**Purpose**: A comprehensive charting module for the BoxLang runtime that provides interactive Chart.js-based visualizations through BoxLang components. This module enables developers to create rich, responsive charts using familiar BoxLang template syntax.

**Target Audience**: BoxLang developers who need to integrate data visualization capabilities into their web applications. Suitable for both beginners and advanced users with varying levels of charting experience.

**Key Features**:
- Support for 10 chart types (pie, bar, line, doughnut, radar, area, scatter, bubble, etc.)
- Nested component architecture for intuitive data organization
- Responsive design with customizable dimensions and styling
- Advanced features like stacked/clustered series, axis titles, grid lines
- Bubble chart support with x, y, r coordinate system
- Static asset serving with security and content-type management

**Runtime Requirements**: BoxLang 1.0.0+ with web support for `htmlHead()` BIF

## Architecture Overview

This is a **BoxLang module** that provides comprehensive charting capabilities using Chart.js. Key architectural elements:

- **Module System**: BoxLang modules follow a specific structure with `ModuleConfig.bx` as the entry point
- **Components**: Chart-related components (Chart, ChartData, ChartSeries) that can be used in both script and template syntax
- **Asset Serving**: Static assets (JS/CSS) served via `index.bxm` proxy from `/public/` directory
- **Module Mapping**: All modules are registered with prefix `bxModules.{mapping}` (this module uses `bxcharts`)

## File Structure & Patterns

### Core Module Files
- `ModuleConfig.bx` - Module descriptor with lifecycle methods (`configure()`, `onLoad()`, `onUnload()`)
- `box.json` - ForgeBox package descriptor with BoxLang-specific metadata
- `Build.bx` - BoxLang build script for packaging (not Gradle/Maven)
- `index.bxm` - Static asset proxy for serving files from `/public/` via `/bxmodules/bxcharts/public/index.bxm?target=filename`

### Component Architecture (`components/`)
All components follow this pattern:
```boxlang
@BoxComponent( "componentname" )  // Registers component for use as bx:componentname
@AllowsBody( true|false )         // Whether component accepts body content
@RequiresBody( true|false )       // Whether body is mandatory
class{
    // Standard injected properties (moduleRecord, boxRuntime, etc.)
    function invoke( required context, Struct attributes, any body, Struct executionState ){
        var buffer = newBuffer();
        var bodyResult = processBody( context, body, buffer );
        // Component logic here
    }
}
```

### Chart Component Hierarchy
```
<bx:chart> (main container)
└── <bx:chartseries> (defines chart type/styling)
    └── <bx:chartdata> (individual data points)
```

## Enhanced Chart Features

### Supported Chart Types
- **Basic**: `pie`, `bar`, `line`, `doughnut`, `radar`, `polarArea`
- **Enhanced**: `area`, `horizontalbar`, `scatter`, `bubble`

### Chart Attributes (`<bx:chart>`)
- **Dimensions**: `chartwidth`, `chartheight` (default: 400x300)
- **Styling**: `title`, `backgroundcolor`, `showlegend`, `show3d`
- **Axis Configuration**: `xaxistitle`, `yaxistitle`
- **Grid Lines**: `showxgridlines`, `showygridlines`
- **Series Layout**: `seriesplacement` (default, cluster, stacked)

### Series Attributes (`<bx:chartseries>`)
- **Type**: `type` (required) - chart type from supported list
- **Styling**: `colorlist` (comma-separated colors), `serieslabel`
- **Data Source**: Contains `<bx:chartdata>` components

### Data Attributes (`<bx:chartdata>`)
- **Required**: `item` (label), `value` (numeric value for most charts)
- **Bubble Charts**: `item`, `x`, `y`, `r` (coordinates and radius instead of value)

## Chart-Specific Patterns

### Parent-Child Component Communication
- **ChartData** components register data with parent **ChartSeries** via `context.findClosestComponent()`
- **ChartSeries** components register series with parent **Chart** via execution state
- Data flows: ChartData → ChartSeries → Chart → Rendered HTML/JS

### Asset Management
- Chart.js library stored in `/public/chart.min.js`
- Served via `index.bxm?target=chart.min.js`
- HTML head injection using `htmlHead()` BIF from BoxLang web support

### Chart Configuration Pattern
```boxlang
// Chart component builds Chart.js config from series data
var chartConfig = {
    "type": "pie|bar|line",
    "data": { "labels": [], "datasets": [] },
    "options": { "responsive": true, "plugins": {...} }
};
```

## Development Workflows

### Building & Testing
- **Build**: `boxlang Build.bx [--version=x.y.z]` - Creates distributable zip in `build/artifacts/`
- **Test**: Uses TestBox framework with specs in `tests/specs/` (`.bxm` extension for templates, `.bx` for classes)
- **Local Development Setup**: Run `./setup.sh` to create symbolic link in `boxlang_modules/bx-charts` for local module development
- **Dependencies**:
  - Chart.js library automatically managed via npm (see package.json)
  - Run `npm install` to download Chart.js to `/public/`
  - Run `npm run update-chartjs` to update to latest Chart.js version
- **Documentation**: [BoxLang MCP Server Docs](https://boxlang.ortusbooks.com/~gitbook/mcp)

### Component Development Lifecycle
1. Components auto-register via annotations during module load
2. Parent components initialize execution state for child data collection
3. Child components find parent via `context.findClosestComponent("parentname")`
4. Data aggregation happens during body processing

## Essential Commands & Tooling

### Local Development Setup
```bash
# Set up local development environment (creates symbolic link)
./setup.sh

# Install Node.js dependencies and download Chart.js
npm install

# Update Chart.js to the latest version
npm run update-chartjs
```

### Build Commands
```bash
# Build module with default version (1.0.0)
boxlang Build.bx

# Build with specific version and build ID
boxlang Build.bx --version=1.1.0 --buildId=123
```

### Testing Commands
```bash
# Run TestBox specs (requires BoxLang with TestBox)
boxlang tests/specs/ChartSpec.bx

# Manual testing with example charts
boxlang tests/test-charts-enhanced.bx
```

### Code Formatting
```bash
# Format all BoxLang code using cfformat
box run-script format

# Watch for changes and auto-format
box run-script format:watch
```

### Package Management
- Uses ForgeBox for distribution (`box.json` configuration)
- Dependencies managed via CommandBox (`commandbox-boxlang`, `testbox`, etc.)
- Static assets (Chart.js) included directly in `/public/` directory
- Chart.js managed via npm - automatically downloads to `/public/` on `npm install`

## BoxLang-Specific Conventions

### Component Usage Patterns
- Template syntax: `<bx:chart><bx:chartseries><bx:chartdata></bx:chartdata></bx:chartseries></bx:chart>`
- Nested components use execution state for data passing
- Body processing: Always use `processBody(context, body, buffer)` pattern
- Early exits: Check `bodyResult.isEarlyExit()` after processing body

### Web Integration
- Use `htmlHead()` BIF to inject JavaScript libraries
- Generate unique DOM IDs for multiple charts: `createUUID().replace("-", "", "all")`
- Render HTML canvas elements with inline JavaScript initialization

### Chart.js Integration
- Chart types: `pie`, `bar`, `line`, `doughnut`, `radar`, `polarArea`, `area`, `horizontalbar`, `scatter`, `bubble`
- Color support: hex colors with `##` prefix (BoxLang escapes `#` for interpolation, so `##` becomes literal `#`)
- Advanced features: stacked/clustered series, grid line control, axis titles
- Bubble chart support: uses x, y coordinates and r for bubble size
- Responsive by default, custom dimensions via `chartwidth`/`chartheight`

### Color Handling Patterns
```boxlang
// BoxLang uses # for interpolation (#variable#), so to use a literal #, escape it with ##
if ( left( color, 2 ) == "##" ) {
    color = "#" & right( color, len(color) - 2 );
}
// Named colors supported: red, blue, green, etc.
// Hex colors: #FF6384, ff6384, ##ff6384 (## becomes literal #)
```

### Chart Type Mappings
- `area` → Chart.js `line` with `fill: true`
- `horizontalbar` → Chart.js `bar` with `indexAxis: "y"`
- `scatter` → Chart.js `scatter` with `showLine: false`
- `bubble` → Chart.js `bubble` with x, y, r coordinate system
- `stacked` → Chart.js bar with `scales.x.stacked: true, scales.y.stacked: true`

## Coding Standards & Best Practices

### BoxLang Component Conventions
- Use `@BoxComponent("name")` annotation to register components
- Always implement `invoke(context, attributes, body, executionState)` method
- Use `processBody(context, body, buffer)` pattern for nested content
- Check `bodyResult.isEarlyExit()` after processing child components
- Validate required attributes early and throw descriptive errors
- **Static blocks must be defined AFTER property definitions** - BoxLang requires properties to be declared before static initializers


### Naming Conventions
- Component files: PascalCase (e.g., `Chart.bx`, `ChartSeries.bx`)
- Component names: lowercase (e.g., `chart`, `chartseries`, `chartdata`)
- Attributes: camelCase (e.g., `chartWidth`, `showLegend`, `seriesLabel`)
- Internal variables: camelCase with descriptive names

### Code Formatting
- Follow Ortus Standards (`.cfformat.json`)
- Use tabs for indentation
- Always use explicit scoping for variables
- Include comprehensive docblocks with parameter descriptions

## Usage Examples

### Basic Pie Chart
```boxlang
<bx:chart title="Sales Data" chartwidth="400" chartheight="300">
    <bx:chartseries type="pie" colorlist="FF6384,36A2EB,FFCE56" serieslabel="Q4 Sales">
        <bx:chartdata item="Product A" value="150">
        <bx:chartdata item="Product B" value="200">
        <bx:chartdata item="Product C" value="100">
    </bx:chartseries>
</bx:chart>
```

### Stacked Bar Chart with Axis Titles
```boxlang
<bx:chart title="Resource Usage" xaxistitle="Servers" yaxistitle="Usage %"
          seriesplacement="stacked" showygridlines="true">
    <bx:chartseries type="bar" serieslabel="Current Usage">
        <bx:chartdata item="Server 1" value="30">
        <bx:chartdata item="Server 2" value="45">
    </bx:chartseries>
</bx:chart>
```

### Area Chart with Grid Lines
```boxlang
<bx:chart title="Trend Analysis" xaxistitle="Time" yaxistitle="Value"
          showxgridlines="true" showygridlines="true">
    <bx:chartseries type="area" colorlist="36A2EB" serieslabel="Performance">
        <bx:chartdata item="Jan" value="100">
        <bx:chartdata item="Feb" value="150">
    </bx:chartseries>
</bx:chart>
```

### Bubble Chart with Three Dimensions
```boxlang
<bx:chart title="Portfolio Analysis" xaxistitle="Risk" yaxistitle="Return">
    <bx:chartseries type="bubble" colorlist="FF6384" serieslabel="Investments">
        <bx:chartdata item="Stock A" x="20" y="15" r="10">
        <bx:chartdata item="Stock B" x="40" y="25" r="15">
        <bx:chartdata item="Bond C" x="10" y="8" r="5">
    </bx:chartseries>
</bx:chart>
```

## Key Files to Reference

- **Chart.bx** - Main component with Chart.js integration and HTML rendering
- **ChartSeries.bx** - Series data collection and validation patterns
- **ChartData.bx** - Simple child component registration pattern
- **index.bxm** - Static file serving with security and content-type handling

## Common Tasks

- **Add chart types**: Update `validTypes` array in ChartSeries.bx
- **Add chart options**: Extend `buildChartConfig()` method in Chart.bx
- **Add static assets**: Place in `/public/` and serve via `index.bxm?target=filename`
- **Test charts**: Use `test-charts-enhanced.bx` example file
- **Debug data flow**: Check execution state in parent components