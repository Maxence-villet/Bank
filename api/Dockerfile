FROM python:3.12-slim

WORKDIR /app

COPY requirement.txt .

RUN pip install --no-cache-dir -r requirement.txt

COPY . .

CMD ["sh", "-c", "fastapi run main.py --host 0.0.0.0 --port ${PORT:-8000}"]