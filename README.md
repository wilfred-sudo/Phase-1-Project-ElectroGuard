# Phase-1-Project-ElectroGuard
# ElectroGuard - Power Issue Reporting System

## Overview
ElectroGuard is a web-based application designed to help users report power issues and locate available technicians to resolve them. Users can submit reports with images, location details, and descriptions of power failures. The system retrieves available technicians from a backend JSON database.

## Features
- **Report Power Issues**: Users can submit details about electrical issues, including images and location.
- **Technician Lookup**: Users can check for available technicians in their area.
- **Live Location Input**: Allows users to pin their location for precise reporting.
- **User-friendly Interface**: Intuitive UI for seamless user interaction.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: JSON Server (hosted on Render)
- **Database**: `db.json` (JSON-based storage)
- **Hosting**: Render

## API Endpoints
- `GET /technicians` - Fetch the list of available technicians
- `POST /reports` - Submit a power issue report

## Setup Instructions
### Prerequisites
- Node.js installed
- JSON Server installed (`npm install -g json-server`)

### Local Development
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/electroguard.git
   cd electroguard
   ```
2. Start JSON Server:
   ```sh
   json-server --watch db.json --port 5000
   ```
3. Open `index.html` in a browser.

## Deployment
The project is deployed on Render. The API URL is:
https://phase-1-project-electroguard.onrender.com

## Troubleshooting
Issue: Technicians not loading
  - Check API endpoint availability: Open `https://phase-1-project-electroguard.onrender.com/technicians` in a browser.
  - Inspect console error


## Contributors
- Mr. Albert - Project Lead
- Wilfred Kiprop - Developer


