# How to Send JWT Token in Postman

## Overview
This guide walks you through using a JSON Web Token (JWT) with Postman to access protected routes in your API.

---

## Step 1 – Log In to Obtain the Token

**Request**
```http
POST http://localhost:5002/api/auth/login
Content-Type: application/json
```

**Body** (raw → JSON)
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response** (example)
```json
{
  "success": true,
  "user": {
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
}
```

Copy **only** the token value (the string after `token": `), e.g.
```
eyJhbGciOiJIUzI1Ni...
```

---

## Step 2 – Use the Token with a Protected Route

### Option A – Authorization Tab (Bearer Token)
1. Open a new request, e.g.
```http
GET http://localhost:5002/api/users/me
```
2. Switch to the **Authorization** tab.
3. Set **Type** to **Bearer Token**.
4. Paste the copied token into the **Token** field.
5. Click **Send** – the request will be authenticated.

### Option B – Manually Set the Header
If you prefer to work directly with headers:
1. In the same request, go to the **Headers** tab.
2. Add a new header:
   - **Key**: `Authorization`
   - **Value**: `Bearer eyJhbGciOiJIUzI1Ni...`
   > **Important:** Include a single space after `Bearer`.
3. Press **Send**.

---

## Visual Flow
```
Login → Copy Token → Authorization Tab →
Bearer Token → Paste Token → Send
```

---

## Usage Across the API
The same token works for any endpoint that requires authentication, such as:
- Logout (`POST /api/auth/logout`)
- Get Profile (`GET /api/users/me`)
- Update Profile (`PUT /api/users/me`)
- Admin routes (`GET /api/admin/...`)
- Cart management, Orders, Wishlist, etc.

---

## Common Pitfalls
- **Incorrect format:** `BearereyJhbGci...` (missing space) → request is rejected.
- **Expired token:** After the token expires, repeat **Step 1** to get a fresh token.

---

## Recap
1. **Log in** and copy the JWT.
2. **Authorize** the request via the Authorization tab **or** add an `Authorization` header.
3. **Send** – the protected endpoint should now respond successfully.

Happy testing! 🎉
