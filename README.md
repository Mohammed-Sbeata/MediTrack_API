# MediTrack_API.

## Auth API – Backend
### Overview
This API provides authentication endpoints (signup, login, logout, password reset) for the backend service. Built with Node.js, Express, MongoDB, and JWT.

### Setup
```
git clone <https://github.com/Mohammed-Sbeata/MediTrack_API.git>
npm install
```

### Create .env file:
```
PORT=5000
JWT_SECRET=
JWT_EXPIRE_TIME=1d
DB_URL=mongodb://localhost:27017/mediTrack
NODE_ENV=production
 ```

### Run server:
```
npm start 
```
### User Model
```
{
  name: String,        // required
  email: String,       // unique, required
  password: String,    // hashed
  birth: Date,         // required
  gender: "Male" | "Female",
  phone: String
}
```
### Security
- Passwords hashed with bcrypt

- JWT-based authentication

- Input validation with express-validator

- Tokens stored in HttpOnly cookies


