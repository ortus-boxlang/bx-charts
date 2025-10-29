# BoxLang Charts Explorer - Digital Ocean Deployment

This is the **BoxLang Charts Explorer** - an interactive showcase of all chart types and features available in the bx-charts module.

## 🚀 Quick Deploy to Digital Ocean

### Prerequisites

- Docker installed on your Digital Ocean droplet
- Port 8080 available (or configure a different port)

### Build and Run

```bash
# Build the Docker image (from parent directory)
cd /path/to/bx-charts
docker rm -f charts-explorer 2>/dev/null || true
docker build --pull --no-cache -f Dockerfile -t boxlang-charts-explorer .

# Run the container
docker run --name charts-explorer \
  -p 8080:8080 \
  boxlang-charts-explorer

# View logs
docker logs -f charts-explorer
```

### Access the Explorer

Once running, access the Charts Explorer at:

- **Local**: http://localhost:8080
- **Production**: http://your-droplet-ip:8080

## 🎯 What's Inside

The Charts Explorer includes:

- **Interactive Examples**: All 10 chart types with live demos
- **Enhanced Features**: Advanced chart configurations and styling
- **Responsive Design**: Charts that adapt to different screen sizes
- **Copy-to-Clipboard**: Easy code copying with CodeMirror syntax highlighting
- **Documentation**: Complete examples with source code for each chart

### Available Pages

- `/index.bxm` - Main landing page with feature overview
- `/charts.bxm` - All 10 chart types (Pie, Bar, Line, Doughnut, Radar, Polar Area, Area, Horizontal Bar, Scatter, Bubble)
- `/charts-enhanced.bxm` - Advanced features (Grid lines, axis titles, stacked series, etc.)
- `/charts-responsive.bxm` - Responsive chart demonstrations

## 🔧 Configuration

### Environment Variables

The Charts Explorer supports all standard BoxLang MiniServer environment variables:

#### Memory Configuration
- `MAX_MEMORY` - Maximum JVM heap size (default: `512m`)
- `MIN_MEMORY` - Minimum JVM heap size (default: `512m`)

#### Web Server Configuration
- `PORT` - Server port (default: `8080`)
- `HOST` - Server host (default: `0.0.0.0`)
- `REWRITES` - Enable URL rewrites (default: `true`)
- `REWRITE_FILE` - Rewrite target file (default: `index.bxm`)
- `BOXLANG_DEBUG` - Enable debug mode (default: `false`)
- `DEBUG` - Alternate debug flag (default: `false`)

#### Advanced Options
- `JAVA_OPTS` - Additional JVM options (default: `-Djava.awt.headless=true`)
- `BOXLANG_MODULES` - Comma-separated list of modules to install on startup
- `BOXLANG_HOME` - BoxLang home directory (default: `/root/.boxlang`)
- `HEALTHCHECK_URI` - Health check endpoint (default: `http://127.0.0.1:${PORT}/`)

For complete documentation, see: [BoxLang Docker Documentation](https://boxlang.ortusbooks.com/getting-started/running-boxlang/docker)

### Memory Settings

The container is configured with 512MB min/max heap size. To adjust:

```bash
docker run -d \
  --name charts-explorer \
  -p 8080:8080 \
  -e MAX_MEMORY=1g \
  -e MIN_MEMORY=1g \
  --restart unless-stopped \
  boxlang-charts-explorer
```

### Custom Port

To run on a different port:

```bash
docker run -d \
  --name charts-explorer \
  -p 3000:8080 \
  --restart unless-stopped \
  boxlang-charts-explorer
```

Access at: http://localhost:3000

## 🌐 Nginx Reverse Proxy (Optional)

For production deployments with a domain name:

```nginx
server {
    listen 80;
    server_name charts.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🐳 Docker Compose (Alternative)

Create a `docker-compose.yml` in the **project root** directory:

```yaml
version: '3.8'

services:
  charts-explorer:
    build:
      context: .
      dockerfile: explorer/Dockerfile
    container_name: boxlang-charts-explorer
    ports:
      - "8080:8080"
    environment:
      - MAX_MEMORY=512m
      - MIN_MEMORY=512m
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s
```

Run with:
```bash
cd /path/to/bx-charts
docker-compose up -d
```

## 📊 Resource Usage

- **Memory**: 512MB (configurable)
- **CPU**: Minimal - suitable for small droplets
- **Disk**: ~200MB image size
- **Network**: Port 8080 (configurable)

## 🔍 Monitoring

Check container health:
```bash
# Container status
docker ps -a

# Resource usage
docker stats charts-explorer

# Logs
docker logs charts-explorer

# Live logs
docker logs -f charts-explorer
```

## 🛠️ Troubleshooting

### Container won't start
```bash
# Check logs
docker logs charts-explorer

# Verify port availability
netstat -tuln | grep 8080

# Remove and recreate
docker rm -f charts-explorer
docker run -d --name charts-explorer -p 8080:8080 boxlang-charts-explorer
```

### Out of Memory
```bash
# Increase heap size
docker run -d \
  --name charts-explorer \
  -p 8080:8080 \
  -e MAX_MEMORY=1g \
  boxlang-charts-explorer
```

## 📝 Development

To update the explorer:

```bash
# Stop and remove container
docker stop charts-explorer
docker rm charts-explorer

# Rebuild with latest changes (from project root)
cd /path/to/bx-charts
docker build -f explorer/Dockerfile -t boxlang-charts-explorer .

# Run again
docker run -d --name charts-explorer -p 8080:8080 boxlang-charts-explorer
```

## 🔗 Links

- **BoxLang Documentation**: https://boxlang.io
- **BoxLang Docker Images**: https://boxlang.ortusbooks.com/getting-started/running-boxlang/docker
- **bx-charts GitHub**: https://github.com/ortus-boxlang/bx-charts

## 📄 License

Apache License 2.0 - See LICENSE file in the root directory
