❌ Session Issue in Production:

Session cookies are not being set properly
This is likely due to the production session configuration
The issue is probably related to the session sameSite/secure property value setting requiring secure cookies, while testing locally without HTTPS.

```js
app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: false,
    // secure: config.NODE_ENV !== "development",
    // secure: config.NODE_ENV === "production",
    sameSite: "lax",
  })
);
```

**I Would have to:**

- Test the login flow in the browser interface?
- Or check the browser developer tools to see what's happening with the session cookies?
