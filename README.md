# Student-Company Portal

A web portal that connects international companies with college students, allowing companies to track students' progress in programming courses.

## Features

- User authentication (Students and Companies)
- Programming course progress tracking
- File submission system
- Student performance monitoring
- Interactive dashboards

## Prerequisites

Before you begin, ensure you have the following installed on your Ubuntu system:

```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Install Python (for alternative server option)
sudo apt install python3

# Install Git
sudo apt install git
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/student-company-portal.git
cd student-company-portal
```

2. Install dependencies:
```bash
# Install http-server globally
npm install -g http-server
```

## Running the Application

You have three options to run the application locally:

### Option 1: Using Node.js http-server (Recommended)

```bash
# Navigate to project directory
cd student-company-portal

# Start the server
http-server

# The application will be available at:
# http://localhost:8080
```

### Option 2: Using Python's built-in HTTP server

```bash
# Navigate to project directory
cd student-company-portal

# For Python 3.x
python3 -m http.server 8000

# The application will be available at:
# http://localhost:8000
```

### Option 3: Using Visual Studio Code Live Server

1. Install Visual Studio Code:
```bash
# Install VS Code
sudo apt install code

# Or download from https://code.visualstudio.com/
```

2. Install Live Server extension:
   - Open VS Code
   - Press Ctrl+P
   - Type: `ext install ritwickdey.LiveServer`
   - Or install from Extensions marketplace

3. Launch the application:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The application will open in your default browser

## Project Structure 