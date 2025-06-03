FROM python:3.11-slim

WORKDIR /app

# Install system updates and dependencies
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Run the app
CMD ["python", "server.py"]
