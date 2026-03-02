FROM python:3.11-slim AS builder
WORKDIR /app
COPY backend/ backend/
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

FROM node:20-alpine AS nodebuilder
WORKDIR /app
COPY frontend/ frontend/
RUN cd frontend && npm install && npm run build

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY backend/ .
COPY --from=nodebuilder /app/frontend/dist ./frontend/dist
ENV DJANGO_SETTINGS_MODULE=backend.settings
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
