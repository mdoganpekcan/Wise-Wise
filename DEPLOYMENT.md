# Deployment Guide

## Quick Start for Development

### Prerequisites
- Node.js v14 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/mdoganpekcan/Wise-Wise.git
cd Wise-Wise
```

### Step 2: Set Up Backend

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Configure .env file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wise-wise
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

**Start the backend server:**
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Step 3: Set Up Frontend

Open a new terminal:

```bash
cd frontend
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

**Configure .env file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start the frontend development server:**
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### Step 4: Create Test Users

You can register users through the UI at `http://localhost:3000/register` or use these API endpoints:

**Register a Driver:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "driver1",
    "email": "driver1@example.com",
    "password": "password123",
    "fullName": "Ali Yılmaz",
    "role": "driver"
  }'
```

**Register a Manager:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "manager1",
    "email": "manager1@example.com",
    "password": "password123",
    "fullName": "Ayşe Demir",
    "role": "manager"
  }'
```

## Production Deployment

### Backend Deployment (Node.js)

**Recommended platforms:**
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

**Environment Variables for Production:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wise-wise
JWT_SECRET=your-very-secure-random-secret-key
NODE_ENV=production
```

### Frontend Deployment (React)

**Build the frontend:**
```bash
cd frontend
npm run build
```

**Recommended platforms:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

**Environment Variables for Production:**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Database Deployment (MongoDB)

**Recommended:**
- MongoDB Atlas (cloud-hosted, free tier available)

**Steps:**
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your application's IP addresses
5. Get the connection string
6. Update `MONGODB_URI` in your backend `.env`

## Docker Deployment (Optional)

### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
Create `docker-compose.yml` in the root:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/wise-wise
      - JWT_SECRET=your-secret-key
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

**Run with Docker:**
```bash
docker-compose up -d
```

## Testing the Application

### 1. Test as Driver
- Register as driver
- Login
- Create an expense
- Report a breakdown
- View dashboard

### 2. Test as Manager
- Register as manager
- Login
- View all expenses and breakdowns
- Approve/reject expenses
- Acknowledge breakdowns
- Update breakdown status

## Monitoring and Maintenance

### Health Check
Backend health check endpoint: `GET /health`

```bash
curl http://localhost:5000/health
```

### Logs
Monitor application logs for errors and issues.

### Database Backups
Set up regular MongoDB backups:
- MongoDB Atlas: Automatic backups available
- Self-hosted: Use `mongodump` command

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file configuration
- Check if port 5000 is available

### Frontend won't connect to backend
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check CORS configuration in backend
- Ensure backend is running

### Authentication issues
- Clear browser localStorage
- Check JWT_SECRET is set correctly
- Verify token expiration settings

## Support

For issues and questions:
- Open an issue on GitHub
- Check SECURITY.md for security considerations
- Review README.md for feature documentation
