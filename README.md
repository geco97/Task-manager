
# Task Manager

A simple Task Manager application built with Node.js, Express, MongoDB, and React, allowing users to create, update, delete, and mark tasks as complete. The app is structured with a REST API backend and a React frontend, designed for easy deployment with Docker and Kubernetes.

## Features

- **User Authentication**: Each user can register, log in, and access their tasks only.
- **Task Management**: Create, update, delete, and mark tasks as complete.
- **Task Details**: Each task has a title, description, and completion status.
- **API Security**: Protected routes with JWT-based authentication.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Material-UI
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Docker, Kubernetes

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [MongoDB](https://www.mongodb.com/) (v4 or later)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Kubernetes](https://kubernetes.io/) (for deployment)

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/geco97/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory with the following variables:

   ```plaintext
   DB_URI=mongodb://mongo:27017/taskmanager
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the backend server**:

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `frontend` directory with the following variables:

   ```plaintext
   REACT_APP_AUTH_API_URL=http://localhost:5000/auth
   REACT_APP_TASK_API_URL=http://localhost:5000/tasks
   ```

4. **Run the frontend server**:

   ```bash
   npm start
   ```

   The application should now be accessible at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in to get an authentication token.

### Tasks

- `GET /tasks`: Get all tasks for the logged-in user.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update a task by ID (title and completion status).
- `DELETE /tasks/:id`: Delete a task by ID.

---

## Docker and Kubernetes Deployment

### Building and Pushing Docker Images

1. **Navigate to the backend and frontend directories to build images:**

   - For `auth-service`:

     ```bash
     docker build -t your-dockerhub-username/auth-service:latest .
     ```

   - For `task-service`:

     ```bash
     docker build -t your-dockerhub-username/task-service:latest .
     ```

   - For `frontend`:

     ```bash
     docker build -t your-dockerhub-username/frontend:latest .
     ```

2. **Push the images to Docker Hub:**

   - For `auth-service`:

     ```bash
     docker push your-dockerhub-username/auth-service:latest
     ```

   - For `task-service`:

     ```bash
     docker push your-dockerhub-username/task-service:latest
     ```

   - For `frontend`:

     ```bash
     docker push your-dockerhub-username/frontend:latest
     ```

### Docker Compose

1. **Build and run the services using Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   The backend will be accessible at [http://localhost:5000](http://localhost:5000) and the frontend at [http://localhost:3000](http://localhost:3000).

### Kubernetes Deployment

1. **Create Kubernetes manifests** for `auth-service`, `task-service`, MongoDB, and frontend services.

2. **Apply the configurations:**

   ```bash
   kubectl apply -f kubernetes/auth-service-deployment.yaml
   kubectl apply -f kubernetes/task-service-deployment.yaml
   kubectl apply -f kubernetes/mongo-deployment.yaml
   kubectl apply -f kubernetes/frontend-deployment.yaml
   ```

3. **Access the application** via the external IP or NodePort, depending on your Kubernetes setup.

---

## Usage

- **Register**: Create an account to manage tasks.
- **Login**: Access your tasks by logging in.
- **Manage Tasks**: Add new tasks, edit task details, mark tasks as complete, and delete tasks.

---

## Project Structure

```plaintext
task-manager/
├── backend/
│   ├── controllers/       # API controllers for handling requests
│   ├── models/            # Mongoose models (e.g., Task, User)
│   ├── routes/            # Express route handlers
│   ├── middleware/        # Authentication middleware
│   ├── app.js             # Express app setup
│   └── server.js          # Server setup
├── frontend/
│   ├── src/
│   │   ├── components/     # React componentthe s (TaskManager, Login, Register)
│   │   ├── api/            # API functions for task and auth
│   │   ├── App.js          # Main React component
│   │   └── index.js        # ReactDOM entry point
├── kubernetes/            # Kubernetes deployment files
├── docker-compose.yml      # Docker Compose setup for local deployment
└── README.md               # Project documentation
```

---

## License

This project is licensed under the MIT License.

---
