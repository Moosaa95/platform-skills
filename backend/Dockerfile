FROM python:3.11-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY requirements.txt  requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]