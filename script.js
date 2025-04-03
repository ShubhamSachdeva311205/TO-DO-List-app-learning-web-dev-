// Get elements
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskListTitle = document.getElementById('taskListTitle');
const allTasksBtn = document.getElementById('allTasksBtn');
const activeTasksBtn = document.getElementById('activeTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');
const calendarEl = document.getElementById('calendar');

// Current filter mode
let currentFilter = 'all';

// Function to fetch tasks from backend
async function getTasks() {
  try {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
    renderCalendar(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Function to add a new task
async function addTask(taskText, dueDate) {
  console.log('Adding task:', taskText, 'Due date:', dueDate);
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText, dueDate }),
    });
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    renderTasks(data.tasks);
    renderCalendar(data.tasks);
  } catch (error) {
    console.error('Error adding task:', error);
  }
}


// Function to toggle task completion status
async function toggleTaskStatus(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data.message);
    renderTasks(data.tasks);
    renderCalendar(data.tasks);
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

// Function to delete a task
async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data.message);
    renderTasks(data.tasks);
    renderCalendar(data.tasks);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Function to filter tasks
function filterTasks(tasks) {
  switch (currentFilter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}

// Function to render tasks
function renderTasks(tasks) {
  const filteredTasks = filterTasks(tasks);
  taskList.innerHTML = '';
  
  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'No tasks to display';
    emptyMessage.className = 'empty-message';
    taskList.appendChild(emptyMessage);
    return;
  }
  
  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
    
    // Create task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // Create date display
    const taskDate = document.createElement('span');
    taskDate.className = 'task-date';
    taskDate.textContent = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Append all elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
  });
}

// Function to render calendar
function renderCalendar(tasks) {
  calendarEl.innerHTML = '';
  
  // Get current date
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Create day headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'calendar-day-header';
    dayHeader.textContent = day;
    calendarEl.appendChild(dayHeader);
  });
  
  // Create empty cells for days before first day of month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day';
    calendarEl.appendChild(emptyDay);
  }
  
  // Create cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    
    // Add date number
    const dateDiv = document.createElement('div');
    dateDiv.className = 'calendar-date';
    dateDiv.textContent = day;
    dayCell.appendChild(dateDiv);
    
    // Add tasks for this day
    const currentDate = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    const dayTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === currentDate;
    });
    
    dayTasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `calendar-task ${task.completed ? 'completed' : ''}`;
      taskDiv.textContent = task.text;
      dayCell.appendChild(taskDiv);
    });
    
    calendarEl.appendChild(dayCell);
  }
}

// Event listener for adding tasks
// Event listener for adding tasks
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = dateInput.value || null;
  
  if (taskText) {
    addTask(taskText, dueDate);
    taskInput.value = ''; // Clear input field
    dateInput.value = ''; // Clear date input
  }
});


// Event listeners for filter buttons
allTasksBtn.addEventListener('click', () => {
  currentFilter = 'all';
  taskListTitle.textContent = 'All Tasks';
  setActiveFilterButton(allTasksBtn);
  getTasks();
});

activeTasksBtn.addEventListener('click', () => {
  currentFilter = 'active';
  taskListTitle.textContent = 'Active Tasks';
  setActiveFilterButton(activeTasksBtn);
  getTasks();
});

completedTasksBtn.addEventListener('click', () => {
  currentFilter = 'completed';
  taskListTitle.textContent = 'Completed Tasks';
  setActiveFilterButton(completedTasksBtn);
  getTasks();
});

// Helper function to set active filter button
function setActiveFilterButton(button) {
  [allTasksBtn, activeTasksBtn, completedTasksBtn].forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

// Also allow adding tasks with Enter key
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const taskText = taskInput.value.trim();
    const dueDate = dateInput.value || null;
    
    if (taskText) {
      addTask(taskText, dueDate);
      taskInput.value = ''; // Clear input field
    }
  }
});

// Initialize the app
getTasks();
