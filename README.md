# Loan Management System (Node.js + Express + Sequelize + MySQL)

## Quickstart

1. Copy `.env.example` to `.env` and fill values.
2. Ensure MySQL is running and create database & user:
   ```sql
   CREATE DATABASE loan_db;
   CREATE USER 'loan_user'@'%' IDENTIFIED BY 'loan_pass';
   GRANT ALL PRIVILEGES ON loan_db.* TO 'loan_user'@'%';
   FLUSH PRIVILEGES;
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start server:
   ```
   npm run dev
   ```
   or
   ```
   npm start
   ```

## Endpoints

- `POST /api/auth/register`  - { username, password, role? }
- `POST /api/auth/login`     - { username, password } -> { token }
- `POST /api/loans/apply`    - Auth required. { principal, annualInterestRate, tenureMonths }
- `GET  /api/loans/my`       - Auth required.
- `GET  /api/loans/all`      - Admin only.
- `POST /api/loans/:id/approve` - Admin only.

Use the `.env.example` as a template for `.env`. Do NOT commit your real `.env` to source control.
