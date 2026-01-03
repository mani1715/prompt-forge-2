# 🚀 Render Deployment Troubleshooting Guide

## ⚠️ Common Issues and Solutions

### Issue 1: API Timeout Errors (15 seconds timeout exceeded)

**Symptoms:**
```
API Error: timeout of 15000ms exceeded
Home content fetch failed, using defaults
About content fetch failed, will use defaults for stats
```

**Root Causes:**
1. **Backend Service is Sleeping** (Render free tier)
2. **Missing Environment Variables**
3. **MongoDB Connection Failed**
4. **Backend Build/Start Failed**

---

## 🔧 Solutions

### Solution 1: Fix Sleeping Backend (Render Free Tier)

Render free tier puts services to sleep after **15 minutes of inactivity**. When a request comes in, it takes **30-50 seconds** to wake up.

**Quick Fix Applied:**
- ✅ Increased frontend API timeout from 15s to 60s in production
- ✅ Added retry logic for failed requests (max 2 retries)
- ✅ Better error messages in console

**Long-term Solutions:**
- Upgrade to Render paid tier ($7/month) - keeps service always active
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your backend every 5-10 minutes
- Add a cron job to keep the service warm

---

### Solution 2: Verify Environment Variables on Render

**Required Environment Variables for Backend:**

Go to Render Dashboard → Your Backend Service → Environment

```bash
# REQUIRED
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
DB_NAME=mspn_dev_db
JWT_SECRET_KEY=your-super-secret-key-minimum-32-characters-long
CORS_ORIGINS=https://new-159.vercel.app,https://your-custom-domain.com

# OPTIONAL
TRUST_PROXY=true
PORT=10000  # Render auto-sets this, usually don't need to override
```

**Required Environment Variables for Frontend (Vercel):**

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

```bash
REACT_APP_BACKEND_URL=https://mspn-dev.onrender.com/api
WDS_SOCKET_PORT=443
```

---

### Solution 3: Check Backend Logs on Render

1. Go to Render Dashboard
2. Select your backend service
3. Click "Logs" tab
4. Look for these **GOOD** signs:
   ```
   ✅ MongoDB connected | DB: mspn_dev_db
   ✅ Super admin created successfully!
   INFO: Uvicorn running on http://0.0.0.0:10000
   INFO: Application startup complete
   ```

5. Look for these **BAD** signs:
   ```
   ❌ MONGODB_URI is missing!
   ValueError: MONGODB_URI environment variable is required
   ModuleNotFoundError: No module named 'fastapi'
   ```

**If you see errors:**
- Check environment variables are set
- Make sure MongoDB URI is correct
- Verify all dependencies are in requirements.txt

---

### Solution 4: MongoDB Connection Issues

**Symptoms:**
```
ERROR:database:❌ MONGODB_URI is missing!
pymongo.errors.ServerSelectionTimeoutError
```

**Fix:**
1. Make sure `MONGODB_URI` is set in Render environment variables
2. If using MongoDB Atlas:
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to IP whitelist (allow from anywhere)
   - Or add your Render service's outbound IP addresses
3. Verify connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
4. Make sure username/password don't have special characters (or URL encode them)

---

### Solution 5: CORS Errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
Update `CORS_ORIGINS` environment variable on Render to include your frontend URL:
```bash
CORS_ORIGINS=http://localhost:3000,https://new-159.vercel.app,https://www.your-domain.com
```

Then restart the backend service on Render.

---

## 🧪 Testing Your Deployment

### 1. Test Backend Health

Open in browser or use curl:
```bash
curl https://mspn-dev.onrender.com/api/
```

**Expected response:**
```json
{"message": "MSPN DEV API is running"}
```

### 2. Test Specific Endpoints

```bash
# Test content endpoint
curl https://mspn-dev.onrender.com/api/content/

# Test about endpoint
curl https://mspn-dev.onrender.com/api/about/

# Test projects endpoint
curl https://mspn-dev.onrender.com/api/projects/
```

### 3. Check Frontend Console

Open browser console (F12) and look for:
```
🔗 API Base URL: https://mspn-dev.onrender.com/api
[API Request] GET https://mspn-dev.onrender.com/api/content/
```

---

## 📝 Deployment Checklist

### Backend (Render):
- [ ] Service is created and deployed
- [ ] Environment variables are set (MONGODB_URI, DB_NAME, JWT_SECRET_KEY, CORS_ORIGINS)
- [ ] MongoDB connection is working
- [ ] Service is running (check logs for "Application startup complete")
- [ ] Health endpoint responds: `https://your-backend.onrender.com/api/`

### Frontend (Vercel):
- [ ] Project is deployed
- [ ] Environment variable `REACT_APP_BACKEND_URL` is set
- [ ] Build completed successfully
- [ ] Frontend loads without errors
- [ ] API calls reach the backend (check Network tab in browser)

### MongoDB Atlas:
- [ ] Database cluster is created
- [ ] Network access allows connections from anywhere (0.0.0.0/0) or specific IPs
- [ ] Database user has read/write permissions
- [ ] Connection string is correct

---

## 🐛 Still Having Issues?

### Enable Detailed Logging

**Backend:** Check full logs on Render
**Frontend:** Open browser console (F12) → Console tab

Look for:
- Connection errors
- Timeout errors
- CORS errors
- 401/403 authentication errors
- 404 endpoint not found errors
- 500 server errors

### Common Error Messages and Fixes:

| Error | Solution |
|-------|----------|
| `timeout of 15000ms exceeded` | Backend is sleeping, wait 30-50 seconds and refresh |
| `MONGODB_URI is missing` | Set environment variable on Render |
| `Network Error` | Check backend is running, verify URL is correct |
| `CORS policy` | Add frontend URL to CORS_ORIGINS on backend |
| `401 Unauthorized` | Check if admin/user is logged in |
| `404 Not Found` | Verify API endpoint exists and URL is correct |

---

## 💡 Pro Tips

1. **Use Render's "Manual Deploy"** instead of auto-deploy while debugging
2. **Check logs immediately** after deployment to catch errors early
3. **Test endpoints with curl** before testing from frontend
4. **Keep a copy of working environment variables** in a secure location
5. **Use health check utilities** provided in the codebase to diagnose issues
6. **Monitor your MongoDB Atlas** usage to avoid quota limits

---

## 🔄 Quick Restart Steps

If things break, try this sequence:

1. **Restart Backend on Render:**
   - Go to Render Dashboard → Service → Manual Deploy → "Clear build cache & deploy"

2. **Redeploy Frontend on Vercel:**
   - Go to Vercel Dashboard → Project → Deployments → "Redeploy"

3. **Wait for Services to Start:**
   - Backend: 2-3 minutes
   - Frontend: 1-2 minutes

4. **Test Health Endpoint:**
   - `curl https://your-backend.onrender.com/api/`

5. **Load Frontend and Check Console:**
   - Open browser console (F12)
   - Look for API request logs

---

## 📞 Need Help?

If you're still experiencing issues:
1. Check the backend logs on Render thoroughly
2. Check the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure MongoDB Atlas network access is configured
5. Test backend endpoints directly with curl

---

**Last Updated:** 2025-01-03
**Code Version:** Compatible with current codebase
