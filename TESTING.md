# API Testing Guide

## 1. LOGIN (Get Token)
```
POST http://localhost:3000/api/auth/login
Body:
{
  "username": "admin",
  "password": "123456"
}
Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 2. GET ALL TASKS (No auth needed)
```
GET http://localhost:3000/api/tasks
```

## 3. CREATE TASK (Protected - needs token)
```
POST http://localhost:3000/api/tasks
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body:
{
  "title": "Build Login System"
}
```

## 4. UPDATE TASK (Protected)
```
PUT http://localhost:3000/api/tasks/1
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body:
{
  "title": "Build Login System - Updated",
  "completed": true
}
```

## 5. DELETE TASK (Protected)
```
DELETE http://localhost:3000/api/tasks/1
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

---

## How to Test (Using Thunder Client or Postman)
1. Copy token from LOGIN response
2. Add header: `Authorization: Bearer {token}`
3. Test protected endpoints
