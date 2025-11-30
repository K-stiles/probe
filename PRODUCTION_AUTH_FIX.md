# Production Authentication Configuration Guide

## Issue Summary

The login mechanism was not working in production mode due to several configuration issues related to session handling and HTTPS requirements.

## Fixed Issues

### 1. Session Configuration

- **Problem**: Session cookies required HTTPS in production but deployment might not use HTTPS or might be behind a proxy
- **Fix**: Added conditional secure cookie setting and trust proxy configuration

### 2. Cross-Origin Cookies

- **Problem**: SameSite="lax" was causing issues with cross-origin requests in production
- **Fix**: Set SameSite="none" for production to allow cross-origin cookies

### 3. Trust Proxy

- **Problem**: When deployed behind a reverse proxy (like Nginx, CloudFlare, or cloud platforms), Express couldn't detect HTTPS properly
- **Fix**: Added `app.set('trust proxy', 1)` in production

### 4. Error Handling

- **Problem**: Authentication errors weren't properly logged or handled
- **Fix**: Improved error logging and handling in auth controller and axios interceptor

## Environment Variables for Production

Add these to your production environment:

```bash
NODE_ENV=production
SESSION_SECRET=your_long_random_session_secret_here
SESSION_DOMAIN=yourdomain.com  # Optional: set if cookies need specific domain
FRONTEND_ORIGIN=https://yourdomain.com
TRUST_PROXY=true  # Set if behind reverse proxy
```

## Deployment Checklist

1. **HTTPS Configuration**: Ensure your production server uses HTTPS or is behind an HTTPS proxy
2. **Session Secret**: Use a strong, random session secret in production
3. **CORS Origins**: Set correct FRONTEND_ORIGIN for your production domain
4. **Trust Proxy**: Set if deployed behind reverse proxy (Nginx, CloudFlare, AWS ALB, etc.)
5. **Domain Settings**: Set SESSION_DOMAIN if needed for cookie sharing across subdomains

## Testing Production Authentication

1. Build and deploy the backend with production environment variables
2. Test login flow:
   ```bash
   curl -X POST https://your-api-domain.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}' \
     --cookie-jar cookies.txt
   ```
3. Test current user endpoint:
   ```bash
   curl https://your-api-domain.com/api/user/current \
     --cookie cookies.txt
   ```

## Common Production Issues & Solutions

### Issue: "Cannot set headers after they are sent"

- **Cause**: Multiple response sends in error handling
- **Solution**: Ensure single response per request in auth controller

### Issue: Session not persisting

- **Cause**: Cookie settings incompatible with production environment
- **Solution**: Check secure, sameSite, and domain settings

### Issue: CORS errors in production

- **Cause**: Frontend origin not properly configured
- **Solution**: Set correct FRONTEND_ORIGIN environment variable

### Issue: 401 errors on every request

- **Cause**: Session cookies not being sent or received
- **Solution**: Check trust proxy, secure, and sameSite settings

## Files Modified

1. `backend/src/index.ts` - Session configuration and trust proxy
2. `backend/src/config/app.config.ts` - Added production config options
3. `backend/src/controllers/auth.controller.ts` - Improved error handling
4. `backend/src/config/passport.config.ts` - Fixed error handling in local strategy
5. `client/src/lib/axios-client.ts` - Improved error handling
6. `client/src/hooks/api/use-auth.tsx` - Better retry logic for auth failures
