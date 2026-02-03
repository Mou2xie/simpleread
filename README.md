# SimpleRead

SimpleRead is a basic Express.js application using Jade templates.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

Ensure you have a `.env` file in the root directory with the following variables:

- `MYSQL_HOST`: The hostname of your MySQL database.
- `MYSQL_PORT`: The port of your MySQL database.
- `MYSQL_USER`: The username for database access.
- `MYSQL_PASSWORD`: The password for database access.
- `MYSQL_DATABASE_NAME`: The name of the database to connect to.

## API Endpoints

### Get All Users

- **URL**: `/get-all-users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users from the database.
- **Success Response**: JSON array of user objects.
- **Error Response**: JSON object with error details.

## Running the Application

### Development

To run the application in development mode with nodemon:

```bash
npm run dev
```

### Production

To run the application in production mode:

```bash
npm start
```

The application will typically start on port 3000 (default for Express generator apps) or the port specified in your environment variables.
