# BoxLang Charts Explorer - Digital Ocean Deployment
# Uses BoxLang MiniServer for lightweight web serving
#
# Build from parent directory: docker build -f explorer/Dockerfile -t boxlang-charts-explorer .

FROM ortussolutions/boxlang:miniserver-1.6.0

# Set memory limits (512MB min/max)
# Official BoxLang Docker image uses MAX_MEMORY and MIN_MEMORY
ENV MAX_MEMORY=512m \
	MIN_MEMORY=512m

# Enable rewrites to support clean URLs (default behavior)
# REWRITE_FILE defaults to index.bxm which is what we use
ENV REWRITES=true

# Copy the Charts Explorer application files from the tests directory
# The base image already sets WORKDIR to /app and uses nobody:root ownership
COPY tests/ /app/

# Create bx-charts module structure and copy module files
RUN mkdir -p /app/boxlang_modules/bx-charts

# Copy module components, public assets, and config from project root
COPY components /app/boxlang_modules/bx-charts/components
COPY public /app/boxlang_modules/bx-charts/public
COPY ModuleConfig.bx /app/boxlang_modules/bx-charts/ModuleConfig.bx

# Port 8080 is exposed by base image but we declare it here for clarity
EXPOSE 8080

# Health check is already configured in base image (interval=20s, timeout=30s, retries=15)
# Using the base image's default health check against http://127.0.0.1:8080/

# The base image CMD is already configured to run $BUILD_DIR/run.sh
# which starts the BoxLang MiniServer with all configured environment variables
