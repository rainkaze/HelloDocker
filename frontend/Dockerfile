FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

WORKDIR /usr/share/hellodocker

EXPOSE 80

COPY . ./

CMD ["sh", "-c", "printf 'window.HELLODOCKER_CONFIG = { backendPort: \"%s\" };\\n' \"${BACKEND_PUBLIC_PORT:-8000}\" > /usr/share/hellodocker/config.js && python -m http.server 80 --directory /usr/share/hellodocker"]
