# How to Run the Project

---

## 1. Local Development Setup

To run the project locally in development mode, follow these steps:

### Steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**
    To install all the required dependencies, run the following command:
    ```bash
    npm install
    ```

3. **Run the project in development mode:**
    Execute the command:
    ```bash
    npm run dev
    ```
    This will start the server on **localhost:5173** by default. You can now access the project at [http://localhost:5173](http://localhost:5173).

---

## 2. Production Setup

To run the project in **production mode**, you need to build the project first and then start it. Here’s how:

### Steps:

1. **Build the project:**
    First, you need to create the production build. To do so, use the command:
    ```bash
    npm run build
    ```

2. **Run in production mode:**
    After the build is ready, you can start the production server:
    ```bash
    npm start
    ```
    This will start the server in production mode, accessible at [http://localhost:5173](http://localhost:5173).

    **Note:** In a production environment, you can deploy the app on platforms like Vercel or other hosting services if you prefer.

---

## 3. First-Time Usage

Please note that when using the project for the first time, it may take longer to load the first request. This is because the backend server starts only when the user interacts with the website. Therefore, the first request might experience some delay as the backend initializes.

---

## 4. Troubleshooting

If you face any issues or errors during setup, please make sure:
- You have Node.js and npm installed (preferably the latest stable version).
- Your internet connection is stable for downloading dependencies.
- You have the correct environment variables set up, if applicable.

If the issue persists, feel free to open an issue in the project repository or check the documentation for more detailed troubleshooting steps.

---

Enjoy building with the project!
