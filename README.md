# LoveLiberia Dating App

A dating platform connecting Liberians locally and in the diaspora through shared cultural values.

## Tech Stack
- Frontend: React Native
- Backend: Node.js/Express
- Database: MongoDB
- Authentication: JWT
- Real-time: Socket.io

## Project Structure
```
LoveLiberia/
├── client/            # React Native app
│   ├── assets/        # Cultural theme assets
│   ├── components/    # UI components
│   ├── screens/       # Main app screens
│   └── App.js         # Main app entry
├── server/            # Node.js backend
│   ├── controllers/   # Business logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   └── server.js      # Server entry
└── README.md          # Project documentation
```

## Deployment Instructions

### Frontend Deployment (Netlify)

1. **Prerequisites**
   - Ensure you have a Netlify account
   - Make sure your React Native web build is working locally

2. **Environment Setup**
   - The project uses `.env` for development and `.env.production` for production
   - Key environment variables:
     - `API_BASE_URL`: Points to your Render backend (e.g., `https://loveliberia-server.onrender.com`)
     - `REACT_APP_API_URL`: Alternative API URL reference used by some components
   - The `api.js` file is configured to use these environment variables with fallback options

3. **Netlify Configuration**
   - The project includes a `netlify.toml` file with the following settings:
     - Build command: `npm install && npm run build`
     - Publish directory: `web-build`
     - Base directory: `client`

4. **Deployment Steps**
   - Connect your GitHub repository to Netlify
   - Configure build settings as specified in `netlify.toml`
   - Deploy the site

5. **Troubleshooting Blank Screen Issues**
   - If you encounter a blank screen after deployment:
     - Check browser console for errors
     - Verify API endpoints are correctly configured in environment variables
     - Ensure CORS is properly configured on the backend
     - Confirm the redirect rule in `netlify.toml` is working correctly

### Backend Deployment (Render)

1. **Prerequisites**
   - Create a Render account
   - Set up a MongoDB Atlas database

2. **Using render.yaml Configuration**
   - The project includes a `render.yaml` file with predefined configuration
   - This file automatically sets up:
     - Web service name: `loveliberia-server`
     - Environment: Node.js
     - Build commands: `cd server && npm install && npm run build`
     - Start command: `node server.js`
     - Environment variables (MongoDB URI, JWT Secret, etc.)
     - Database configuration

3. **Deployment Steps**
   - Push your code to GitHub
   - In Render dashboard, select "Blueprint" deployment option
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file and configure the service

4. **CORS Configuration**
   - Ensure CORS is properly configured in `server.js` to allow requests from your Netlify domain:
     ```javascript
     app.use(cors({
       origin: 'https://loveliberia.netlify.app'
     }));
     ```

5. **Redeployment Process**
   - For code changes: Push to your connected GitHub repository
   - For environment variable changes: Update them in the Render dashboard
   - Manual redeployment: Use the "Manual Deploy" button in the Render dashboard

## Connecting Frontend and Backend

1. Update API endpoint URLs in the frontend code to point to your Render backend URL
2. Verify the connection by testing authentication and data retrieval
3. Monitor application logs on both platforms for any connection issues

## Security Considerations

1. **Environment Variables**
   - Store sensitive information (API keys, database credentials, JWT secrets) as environment variables
   - Never commit `.env` files to your repository (ensure they're in `.gitignore`)
   - For Render: Use the environment variables section in the dashboard instead of hardcoding in `render.yaml`
   - For Netlify: Configure environment variables in the Netlify dashboard

2. **API Security**
   - Implement proper authentication for all API endpoints
   - Use HTTPS for all communications
   - Set up appropriate CORS policies to restrict access to your API

3. **Database Security**
   - Use strong, unique passwords for database access
   - Restrict database access to only necessary IP addresses
   - Regularly rotate credentials and audit access logs
