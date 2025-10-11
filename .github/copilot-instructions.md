# BoxLang Charts Module - Copilot Instructions

## Architecture Overview

This is a **BoxLang module** that provides comprehensive charting capabilities using Chart.js. Key architectural elements:

- **Module System**: BoxLang modules follow a specific structure with `ModuleConfig.bx` as the entry point
- **Components**: Chart-related components (Chart, ChartData, ChartSeries) that can be used in both script and template syntax
- **Asset Serving**: Static assets (JS/CSS) served via `Asset.bx` proxy from `/lib/` directory
- **Module Mapping**: All modules are registered with prefix `bxModules.{mapping}` (this module uses `bxcharts`)

## File Structure & Patterns

### Core Module Files
- `ModuleConfig.bx` - Module descriptor with lifecycle methods (`configure()`, `onLoad()`, `onUnload()`)
- `box.json` - ForgeBox package descriptor with BoxLang-specific metadata
- `Build.bx` - BoxLang build script for packaging (not Gradle/Maven)
- `Asset.bx` - Static asset proxy for serving files from `/lib/` via `/bxmodules/bxcharts/public/Asset.bx?target=filename`

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
- **Enhanced**: `area`, `horizontalbar`, `scatter`

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
- **Required**: `item` (label), `value` (numeric value)

## Chart-Specific Patterns

### Parent-Child Component Communication
- **ChartData** components register data with parent **ChartSeries** via `context.findClosestComponent()`
- **ChartSeries** components register series with parent **Chart** via execution state
- Data flows: ChartData → ChartSeries → Chart → Rendered HTML/JS

### Asset Management
- Chart.js library stored in `/lib/chart.min.js`
- Served via `Asset.bx?target=chart.min.js`
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
- **Dependencies**: Chart.js library managed manually in `/lib/`
- **Documentation**: [BoxLang MCP Server Docs](https://boxlang.ortusbooks.com/~gitbook/mcp)

### Component Development Lifecycle
1. Components auto-register via annotations during module load
2. Parent components initialize execution state for child data collection
3. Child components find parent via `context.findClosestComponent("parentname")`
4. Data aggregation happens during body processing

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
- Chart types: `pie`, `bar`, `line`, `doughnut`, `radar`, `polarArea`, `area`, `horizontalbar`, `scatter`
- Color support: hex colors with `##` prefix (BoxLang escapes `#` for interpolation, so `##` becomes literal `#`)
- Advanced features: stacked/clustered series, grid line control, axis titles
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
- `stacked` → Chart.js bar with `scales.x.stacked: true, scales.y.stacked: true`

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

## Key Files to Reference

- **Chart.bx** - Main component with Chart.js integration and HTML rendering
- **ChartSeries.bx** - Series data collection and validation patterns
- **ChartData.bx** - Simple child component registration pattern
- **Asset.bx** - Static file serving with security and content-type handling

## Common Tasks

- **Add chart types**: Update `validTypes` array in ChartSeries.bx
- **Add chart options**: Extend `buildChartConfig()` method in Chart.bx
- **Add static assets**: Place in `/lib/` and serve via `Asset.bx?target=filename`
- **Test charts**: Use `test-charts.bx` example file
- **Debug data flow**: Check execution state in parent components