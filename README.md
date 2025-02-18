# Node.js Application with PostgreSQL

This guide walks you through setting up and running a Node.js application that connects to a PostgreSQL database.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18.20.5)
- [PostgreSQL](https://www.postgresql.org/download/) (we will use a cloud managed database)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation Steps

### 1. Clone the Repository
```sh
git clone git@github.com:amisdun/elite-task-1.git
cd elite-task-1
```

### 2. Install the right node version
```sh
nvm install
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following configuration:

```
DB_HOST=""
DB_PORT=""
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE="items-db"
PORT=4002
```

Replace `your_username`, `your_password`, and `your_database` with your actual PostgreSQL credentials.

### 4. Set Up the Database
Login to PostgreSQL and create the database if it doesn’t exist:
```sql
CREATE DATABASE your_database;
```
Then, run migrations (if applicable):
```sh
npm run migrate
```

### 5. Start the Application
Run the development server:
```sh
npm run start:dev
```

### 6. Verify the Connection
Visit `http://localhost:4002/` to check if the app is running correctly.

## Available Scripts

- `npm run start:dev` – Starts the application in development mode with hot reloading.
- `npm run migrate` – Applies database migrations.
- `npm test` – Runs integration tests.

## Troubleshooting

- If PostgreSQL connection fails, verify that your credentials in `.env` are correct.

