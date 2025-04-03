# TO-DO-List-app-learning-web-dev-
<!DOCTYPE html>
<html>
<head>
  <title>README - Enhanced To-Do List</title>
</head>
<body>
  <h1>Enhanced To-Do List</h1>
  <p>A feature-rich to-do list application with task management, calendar view, and filtering options.</p>

  <h2>Features</h2>
  <ul>
    <li>Add tasks with optional due dates.</li>
    <li>View tasks in a calendar format for better organization.</li>
    <li>Filter tasks by status: All, Active, or Completed.</li>
    <li>Mark tasks as completed or delete them as needed.</li>
    <li>Responsive design for a seamless experience across devices.</li>
  </ul>

  <h2>Project Structure</h2>
  <ul>
    <li><strong>index.html:</strong> The main HTML file containing the structure of the application.</li>
    <li><strong>style.css:</strong> The CSS file for styling the application.</li>
    <li><strong>script.js:</strong> The JavaScript file for handling task management and calendar functionality.</li>
    <li><strong>server.js:</strong> The Node.js server file for backend API endpoints.</li>
  </ul>

  <h2>How to Run</h2>
  <ol>
    <li>Clone the repository: <code>git clone [repository-url]</code></li>
    <li>Navigate to the project directory: <code>cd enhanced-to-do-list</code></li>
    <li>Install dependencies: <code>npm install</code></li>
    <li>Start the server: <code>node server.js</code></li>
    <li>Open your browser and visit: <code>http://localhost:3000</code></li>
  </ol>

  <h2>Screenshots</h2>
  <!-- Add screenshots of your application here -->
  <p>(Include relevant screenshots of the app interface)</p>

  <h2>API Endpoints</h2>
  <ul>
    <li><code>GET /api/tasks</code>: Fetch all tasks.</li>
    <li><code>POST /api/tasks</code>: Add a new task (requires a JSON body with "task" and optional "dueDate").</li>
    <li><code>PUT /api/tasks/:id</code>: Toggle the completion status of a task by ID.</li>
    <li><code>DELETE /api/tasks/:id</code>: Delete a task by ID.</li>
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript (Vanilla JS)</li>
    <li><strong>Backend:</strong> Node.js with Express.js</li>
  </ul>

  <h2>Acknowledgments</h2>
  <p>This project was built to demonstrate task management functionalities with a clean interface and robust backend support.</p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.</p>

</body>
</html>
