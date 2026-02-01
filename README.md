# Task Manager Web Application

## Problem Statement & Idea

Modern productivity requires effective task management. This application provides a simple, accessible solution for organizing daily tasks without complex software installations. Users can quickly add tasks, set due dates, and track completion status through an intuitive web interface.

## Application Features

### Core Features
- **Add Tasks**: Create new tasks with titles and optional due dates
- **View Tasks**: Display all tasks in an organized list
- **Complete Tasks**: Mark tasks as done with checkbox toggle
- **Delete Tasks**: Remove unwanted tasks from the list

### Advanced Features
- **Filter System**: View tasks by category (All, Today, This Week, Overdue, Completed)
- **Local Storage**: Tasks persist between browser sessions
- **Due Date Tracking**: Set and display task deadlines
- **Task Counter**: Shows total and completed task counts
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Frontend Technologies
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive layout
- **JavaScript**: Application logic 

### Storage
- **LocalStorage API**: Client-side data persistence

### Deployment
- **Platform**: Netlify
- **Type**: Static hosting

## Web Infrastructure Overview

### How the Application Works

When a user accesses the task manager:

1. **URL Entry**: User types the application URL in their browser
2. **DNS Resolution**: The browser contacts a DNS server to translate the domain name into an IP address
3. **HTTP Request**: Browser sends an HTTP GET request to the web server at that IP address
4. **Server Response**: Web server locates and sends the index.html file
5. **HTML Parsing**: Browser reads the HTML and discovers linked resources (style.css, script.js)
6. **Asset Loading**: Browser makes additional requests for CSS and JavaScript files
7. **Rendering**: Browser combines HTML structure with CSS styling to display the page
8. **JavaScript Execution**: Browser runs the JavaScript code to enable interactive features
9. **User Interaction**: Application becomes fully functional and responsive

### Infrastructure Components

#### Browser
- Interprets HTML, CSS, and JavaScript
- Renders the user interface
- Executes application logic
- Manages localStorage for data persistence

#### DNS (Domain Name System)
- Converts human-readable domain names into IP addresses
- Example: `lisette-task-manager.netlify.app` → `75.2.60.5`
- Acts as the internet's phone book

#### Web Server
- Hosts static files (HTML, CSS, JS)
- Responds to HTTP requests
- Delivers files to users' browsers
- Handles multiple concurrent connections

#### Static Files
- **index.html**: Application structure and content
- **style.css**: Visual presentation and layout rules
- **script.js**: Interactive functionality and task management logic

### Deployment Architecture

```
User Device
    ↓
Browser (Chrome, edge)
    ↓
Internet
    ↓
DNS Server (resolves domain to IP)
    ↓
Web Server (Netlify)
    ↓
Static Files (HTML, CSS, JS)
    ↓
LocalStorage (user's browser)
```

## Deployment Process

### Platform Choice: Netlify

**Why This Platform:**
- Free hosting for static websites
- Automatic SSL/HTTPS encryption
- Easy deployment from GitHub repository
- Built-in CDN for fast global access
- No server configuration required

### Deployment Steps

####  Netlify:
1. I Created a Netlify account
2. Then Connected to my GitHub account and chose GitHub task-manager repository as the project.
3. Deployed and received a live URL

## Running the Application Locally

### Method 1: Direct File Opening
1. Download or clone the repository
2. Navigate to the project folder
3. Double-click `index.html` to open in your default browser

### Method 2: Live Server (Recommended)
1. Install Visual Studio Code
2. Install the "Live Server" extension
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Application opens at `http://127.0.0.1:5500`

### Method 3: Python HTTP Server
```bash
# Navigate to project directory
cd task-manager

# Python 3
python -m http.server 8000

# Open browser to http://localhost:8000
```

## Code Structure

```
task-manager/
├── index.html          # Main HTML file
├── style.css           # Styling and layout
├── script.js           # Application logic
├── README.md           # Documentation
└── background.jpg      # Documentation
```

### Key Functions (script.js)

- `init()`: Initializes the application on page load
- `addTask()`: Creates new task entries
- `toggleTask()`: Marks tasks as complete/incomplete
- `deleteTask()`: Removes tasks from the list
- `filterTasks()`: Filters tasks based on selected category
- `renderTasks()`: Updates the UI with current task list
- `saveTasksToStorage()`: Persists tasks to localStorage
- `loadTasksFromStorage()`: Retrieves tasks on app start

## Design Choices & Assumptions

### Design Decisions
- **Minimalist Interface**: Clean design for better focus on tasks
- **Client-Side Storage**: No backend needed, faster performance
- **Date-Based Filtering**: Helps users prioritize work
- **Checkbox Toggle**: Intuitive task completion mechanism

### Assumptions
- Users have modern browsers with JavaScript enabled
- LocalStorage is available and not disabled
- Internet connection is required for initial load only
- Users manage tasks on a single device (no cloud sync)

### Future Improvements
- User authentication for multi-device access
- Cloud database integration
- Task categories and tags
- Priority levels
- Recurring tasks
- Export/import functionality

## License

This project is created for educational purposes as part of my web infrastructure course.

## Owner

Lisette Mukiza


**Live Application**: [Task-Manager](https://lisette-task-manager.netlify.app/)
