# BoxLang Charts Module - Copilot Instructions

## Architecture Overview

This is a **BoxLang module** that provides charting capabilities using Chart.js. Key architectural elements:

- **Module System**: BoxLang modules follow a specific structure with `ModuleConfig.bx` as the entry point
- **Components**: Chart-related components (Chart, ChartData, ChartSeries) that can be used in both script and template syntax
- **Asset Serving**: Static assets (JS/CSS) served via `Asset.bx` proxy from `/lib/` directory
- **Module Mapping**: All modules are registered with prefix `bxModules.{mapping}` (this module uses `bxcharts`)

## File Structure & Patterns

### Core Module Files
- `ModuleConfig.bx` - Module descriptor with lifecycle methods (`configure()`, `onLoad()`, `onUnload()`)
- `box.json` - ForgeBox package descriptor with BoxLang-specific metadata
- `Build.bx` - BoxLang build script for packaging (not Gradle/Maven)
- `Asset.bx` - Static asset proxy for serving files from `/lib/` via `/bxmodules/bxcharts/Asset.bx?target=filename`

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
- **Test**: Uses TestBox framework with specs in `tests/specs/`
- **Dependencies**: Chart.js library managed manually in `/lib/`

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
- Chart types: `pie`, `bar`, `line`, `doughnut`, `radar`, `polarArea`
- Color support: hex colors with `##` prefix (BoxLang escaping)
- Responsive by default, custom dimensions via `chartwidth`/`chartheight`

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