# Subly

Subly is your online tool for adding captions to your videos. This project consists of two main parts: the frontend and the backend. The frontend is built using Vite, React, Tailwind CSS, and TypeScript, while the backend is powered by Express, Mongoose, and MongoDB.

## Features

- Upload videos and add captions
- Responsive design with Tailwind CSS
- Fast performance with Vite
- Type safety with TypeScript
- Backend API with Express
- MongoDB for data storage

## Installation

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (v4.x or later)

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/subly.git
   cd subly/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Usage

1. Ensure MongoDB is running on your local machine or accessible through the provided `MONGODB_URI`.
2. Run both frontend and backend servers.
3. Open your browser and navigate to `http://localhost:3000` to start using Subly.
