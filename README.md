# SimpleRead

SimpleRead is an Express.js web application that simplifies English articles using AI. It provides user authentication and integrates with the OpenRouter API to rewrite articles at a grade 6 reading level, making them easier for English beginners to understand.

## Project Structure

```
simpleread/
├── app.js                  # Express application entry point
├── bin/www                 # Server startup script
├── routes/                 # API route definitions
│   ├── auth.js             # Authentication routes (register, login)
│   ├── simplify.js         # Article simplification routes
│   └── article.js          # Article storage routes
├── controllers/            # Request handlers with business logic
│   ├── authController.js   # User registration and login logic
│   ├── simplifyController.js # Text simplification logic
│   └── articleController.js # Article CRUD logic
├── models/                 # Database models
│   ├── user.js             # User model with MySQL operations
│   └── article.js          # Article model with MySQL operations
├── services/               # External service integrations
│   └── openrouter.js       # OpenRouter AI API client
├── libs/                   # Utility libraries
│   ├── database.js         # MySQL connection pool
│   └── jwt.js              # JWT token generation and verification
├── middleware/             # Express middleware
│   └── authMiddleware.js   # JWT authentication middleware
├── views/                  # Jade templates
│   ├── layout.jade         # Base layout template
│   ├── index.jade          # Home page
│   └── error.jade          # Error page
├── public/                 # Static files (CSS, JS, images)
├── package.json            # Project dependencies and scripts
└── .env                    # Environment configuration (not committed)
```

## Business Logic

### User Authentication
- **Registration**: Users can register with email and password. Passwords are hashed using bcrypt before storage. The system validates that the email is not already registered.
- **Login**: Users authenticate with email and password. Upon successful authentication, a JWT token is issued for subsequent API requests.

### Article Simplification
- Authenticated users can submit English articles for simplification.
- The application uses the OpenRouter API to rewrite articles at a grade 6 reading level.
- Simplified articles use simpler vocabulary and shorter sentences while preserving the main ideas.

### Article Storage
- Authenticated users can save original and simplified articles to the database.
- Users can view all their saved articles in a list.
- Users can retrieve a specific article by ID with full details.
- Users can delete their articles.

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js 4.x |
| Template Engine | Jade |
| Database | MySQL (mysql2/promise with connection pooling) |
| Authentication | JWT (jsonwebtoken), bcryptjs |
| AI Integration | OpenRouter API |
| Configuration | dotenv |
| Development | nodemon (auto-restart on file changes) |

## Prerequisites

- Node.js (v14 or higher recommended)
- npm
- MySQL database
- OpenRouter API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd simpleread
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   # MySQL Database Configuration
   MYSQL_HOST=your_mysql_host
   MYSQL_PORT=3306
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE_NAME=your_database_name

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h

   # OpenRouter API Configuration
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=openai/gpt-4o-mini
   SITE_URL=http://localhost:3000
   ```

4. Create the database tables in your MySQL database:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password_hash VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE articles (
       id INT PRIMARY KEY AUTO_INCREMENT,
       user_id INT NOT NULL,
       original_text LONGTEXT NOT NULL,
       simplified_text LONGTEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

## Running the Application

### Development Mode
Runs with nodemon for automatic restart on file changes:
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server runs on port 3000 by default.

## API Endpoints

### Authentication

#### Register User
- **URL**: `POST /auth/register`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "message": "User created",
    "userId": 1
  }
  ```
- **Error Responses**:
  - `400` - Email and password are required
  - `409` - Email already registered
  - `500` - Internal server error

#### Login
- **URL**: `POST /auth/login`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
  ```
- **Error Responses**:
  - `400` - Email and password are required
  - `401` - Invalid email or password
  - `500` - Internal server error

### Article Simplification

#### Simplify Article
- **URL**: `POST /api/simplify`
- **Auth Required**: Yes (Bearer token in Authorization header)
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "text": "Your English article text here..."
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Article simplified successfully",
    "originalLength": 500,
    "simplifiedLength": 450,
    "result": "Simplified version of your article..."
  }
  ```
- **Error Responses**:
  - `400` - Text is required
  - `401` - No token provided / Invalid or expired token
  - `500` - Failed to simplify article

### Article Storage

#### Save Article
- **URL**: `POST /api/articles/save`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "originalText": "Original article text...",
    "simplifiedText": "Simplified version..."
  }
  ```
- **Success Response** (201):
  ```json
  {
    "message": "Article saved successfully",
    "articleId": 1
  }
  ```
- **Error Responses**:
  - `400` - Original text and simplified text are required
  - `401` - No token provided / Invalid or expired token
  - `500` - Internal server error

#### Get Articles List
- **URL**: `GET /api/articles/list`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success Response** (200):
  ```json
  {
    "articles": [
      {
        "id": 1,
        "original_text": "Original article text...",
        "created_at": "2026-02-25T10:00:00.000Z",
        "updated_at": "2026-02-25T10:00:00.000Z"
      }
    ]
  }
  ```
- **Error Responses**:
  - `401` - No token provided / Invalid or expired token
  - `500` - Internal server error

#### Get Article Details
- **URL**: `GET /api/articles/:id`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success Response** (200):
  ```json
  {
    "article": {
      "id": 1,
      "user_id": 1,
      "original_text": "Original article text...",
      "simplified_text": "Simplified version...",
      "created_at": "2026-02-25T10:00:00.000Z",
      "updated_at": "2026-02-25T10:00:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `401` - No token provided / Invalid or expired token
  - `404` - Article not found
  - `500` - Internal server error

#### Delete Article
- **URL**: `DELETE /api/articles/:id`
- **Auth Required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Article deleted successfully"
  }
  ```
- **Error Responses**:
  - `401` - No token provided / Invalid or expired token
  - `404` - Article not found
  - `500` - Internal server error

## License

ISC
