import { addProject } from "./projectManager";
import { projects, projectsMap, todosMap, setActiveProject } from "./states";
import { addTodo } from "./todoManager";

const noteWrapper = document.querySelector(".note-wrapper");

// #region Animation Stuff

// Select the toggle button and the sidebar
const toggleBtn = document.getElementById("menu-icon-wrapper");
const sidebar = document.getElementById("sidebar");

// Add a click event listener to toggle the sidebar's "open" class
toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("close");
  toggleBtn.classList.toggle("rotate-y-axis");
});
const scrollIndicator = document.getElementById("scroll-indicator-span");

function updateScrollIndicator() {
  if (noteWrapper.scrollHeight > noteWrapper.clientHeight) {
    scrollIndicator.style.setProperty(
      "--scroll-indicator-content",
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E")`
    );
  } else {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '""');
  }
}

scrollIndicator.addEventListener("click", () => {
  noteWrapper.scrollTo({
    top: noteWrapper.scrollHeight,
    behavior: "smooth", // Smooth scrolling effect
  });
});

// Initial check
updateScrollIndicator();

// Update indicator on window resize (in case of layout changes)
window.addEventListener("resize", updateScrollIndicator);

// Hide the indicator when scrolled to the bottom
noteWrapper.addEventListener("scroll", () => {
  if (
    noteWrapper.scrollTop + noteWrapper.clientHeight >=
    noteWrapper.scrollHeight
  ) {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '""');
  } else {
    scrollIndicator.style.setProperty(
      "--scroll-indicator-content",
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E")`
    );
  }
});
// #endregion
const todoDialog = document.getElementById("todoDialog");

export function closeTodoDialog() {
  todoDialog.close();
}

const projectDialog = document.getElementById("projectDialog");

function openProjectDialog() {
  projectDialog.showModal();
}

export function closeProjectDialog() {
  projectDialog.close();
}

function takeProjectDialogValues() {
  console.log(document.getElementById("projectName").value);
  const projectName = document.getElementById("projectName").value.trim();
  return { projectName };
}

export function clearProjectDialogValues() {
  const projectDialogForm = document.getElementById("projectDialogForm");
  projectDialogForm.reset();
}

function takeTodoDialogValues() {
  const name = document.getElementById("todoName").value.trim();
  const desc = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value.trim();
  const dueDate = document.getElementById("dueDate").value.trim();
  const completed = document.getElementById("completed").value.trim();
  return { name, desc, priority, dueDate, completed };
}

export function clearTodoDialogValues() {
  document.getElementById("todoName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("completed").value = false;
}

const projectsDOM = document.getElementById("projects");
const todosDOM = document.getElementById("todos");

export function renderProjects() {
  projectsDOM.textContent = "";

  projects.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectsMap.set(projectElement, project);
    projectsDOM.appendChild(projectElement);
  });
}

export function renderTodos(project) {
  todosDOM.textContent = "";
  project.todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todosMap.set(todoElement, { project, todo });
    todosDOM.appendChild(todoElement);
  });
}

function createProjectElement(project) {
  // Create the sidebar list item
  const sidebarItem = document.createElement("li");
  sidebarItem.className = "sidebar-item";

  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24px");
  svg.setAttribute("height", "24px");

  // Create the SVG use element
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#project-icon");

  // Create the h2 element
  const h2 = document.createElement("h2");
  h2.title = project.name;
  h2.textContent = project.name;

  const div = document.createElement("div");
  div.classList.add("project-three-dots");

  const threeDotSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  threeDotSvg.setAttribute("width", "24px");
  threeDotSvg.setAttribute("height", "24px");

  const threeDotUse = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "use"
  );
  threeDotUse.setAttribute("href", "#horizontal-dots");

  // Assemble the elements
  svg.appendChild(use);
  sidebarItem.appendChild(svg);
  sidebarItem.appendChild(h2);
  threeDotSvg.appendChild(threeDotUse);
  div.appendChild(threeDotSvg);
  sidebarItem.appendChild(div);

  return sidebarItem;
}

function createTodoElement(todo) {
  // Generate proper UUIDs
  const completedCheckboxId = crypto.randomUUID();

  // Create main container
  const todoWrapper = document.createElement("div");
  todoWrapper.className = "todo-wrapper todo";

  // Create title wrapper
  const todoTitleWrapper = document.createElement("div");
  todoTitleWrapper.className = "todo-title-wrapper";

  if (todo.priority === "HIGH") {
    todoTitleWrapper.style.background =
      "linear-gradient(to right, #b90505, #b90505) left / 5px 100% no-repeat, var(--note-header-bg-color)";
  } else if (todo.priority === "MEDIUM") {
    todoTitleWrapper.style.background =
      "linear-gradient(to right, #f0b429, #f0b429) left / 5px 100% no-repeat, var(--note-header-bg-color)";
  } else if (todo.priority === "LOW") {
    todoTitleWrapper.style.background =
      "linear-gradient(to right, #14b106, #14b106) left / 5px 100% no-repeat, var(--note-header-bg-color)";
  }

  // Create title section
  const todoTitle = document.createElement("div");
  todoTitle.className = "todo-title";

  // Create checkbox wrapper
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "completed-todo-checkbox-wrapper";

  // Create checkbox input
  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = completedCheckboxId;
  checkboxInput.checked = todo.completed;

  // Create checkbox label
  const checkboxLabel = document.createElement("label");
  checkboxLabel.htmlFor = completedCheckboxId;
  checkboxLabel.className = "completed-todo-checkbox-label";
  checkboxLabel.style.setProperty("--size", "1.875rem");

  // Create checkmark SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "1.875rem");
  svg.setAttribute("height", "1.875rem");
  svg.setAttribute("viewBox", "0 0 50 50");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M5 30 L 20 45 L 45 5");

  svg.appendChild(path);
  checkboxLabel.appendChild(svg);

  // Create title text
  const titleText = document.createElement("p");
  titleText.textContent = todo.name;

  // Assemble checkbox components
  checkboxWrapper.appendChild(checkboxInput);
  checkboxWrapper.appendChild(checkboxLabel);
  checkboxWrapper.appendChild(titleText);

  // Create due date info
  const dueDateInfo = document.createElement("p");
  dueDateInfo.className = "due-date-info";
  dueDateInfo.textContent = todo.dueDate;

  // Create three dots menu
  const threeDotsDiv = document.createElement("div");
  threeDotsDiv.className = "todo-three-dots";

  const threeDotsSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  threeDotsSvg.setAttribute("width", "24px");
  threeDotsSvg.setAttribute("height", "24px");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#horizontal-dots");

  threeDotsSvg.appendChild(use);
  threeDotsDiv.appendChild(threeDotsSvg);

  // Create collapsible content
  const collapsibleContent = document.createElement("div");
  collapsibleContent.className = "collapsible-content";

  const description = document.createElement("p");
  description.textContent = todo.desc;

  collapsibleContent.appendChild(description);

  // Assemble all components
  todoTitle.appendChild(checkboxWrapper);
  todoTitleWrapper.appendChild(todoTitle);
  todoTitleWrapper.appendChild(dueDateInfo);
  todoTitleWrapper.appendChild(threeDotsDiv);

  todoWrapper.appendChild(todoTitleWrapper);
  todoWrapper.appendChild(collapsibleContent);

  return todoWrapper;
}

export function setupEventListeners() {
  const submitProjectBtn = document.getElementById("submitProject");
  const submitTodoBtn = document.getElementById("submitTodo");
  const openProjectDialogBtn = document.getElementById("add-project-button");
  const closeTodoDialogBtn = document.getElementById("closeTodoDialog");
  const closeProjectDialogBtn = document.getElementById("closeProjectDialog");

  projectsDOM.addEventListener("click", handleProjectClick);
  openProjectDialogBtn.addEventListener("click", openProjectDialog);
  closeTodoDialogBtn.addEventListener("click", closeTodoDialog);
  closeProjectDialogBtn.addEventListener("click", closeProjectDialog);
  submitProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProject(takeProjectDialogValues());
  });

  todosDOM.addEventListener("click", handleTodoClick);

  submitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo(takeTodoDialogValues());
  });
}

function selectProject(projectElement) {
  const project = projectsMap.get(projectElement);
  setActiveProject(project);

  projectsDOM
    .querySelectorAll(".sidebar-item")
    .forEach((sidebarItem) => sidebarItem.classList.remove("active"));

  projectElement.classList.add("active");
  addOpenTodoDialogButton();
  renderTodos(project);
}

// Function to create and add the todo button
function addOpenTodoDialogButton() {
  // Check if button already exists
  if (document.querySelector(".add-todo-wrapper")) return;

  // Create elements
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

  // Set attributes
  wrapper.className = "add-todo-wrapper";
  button.className = "add-todo-button";
  button.id = "add-todo-button";
  button.setAttribute("aria-label", "Add New Todo");
  svg.setAttribute("width", "24px");
  svg.setAttribute("height", "24px");
  use.setAttribute("href", "#add-icon");

  // Build structure
  svg.appendChild(use);
  button.appendChild(svg);
  wrapper.appendChild(button);

  // Add event listener
  const todoButtonHandler = () => todoDialog.showModal();

  button.addEventListener("click", todoButtonHandler);

  const main = document.getElementById("main");
  // Add to DOM (adjust parent selector as needed)
  main.appendChild(wrapper);
}

// Function to remove the todo button
function removeTodoButton() {
  const wrapper = document.querySelector(".add-todo-wrapper");
  if (wrapper) {
    const button = document.getElementById("add-todo-button");
    button.removeEventListener("click", todoButtonHandler);
    wrapper.remove();
  }
}

function handleProjectClick(e) {
  if (e.target.classList.contains("project-three-dots")) return;
  const projectElement = e.target.closest(".sidebar-item");
  if (!projectElement) return;

  console.log("Clicked project:", projectElement);

  selectProject(projectElement);
}

function handleTodoClick(e) {
  if (e.target.classList.contains("todo-three-dots")) return;
  const todoElement = e.target.closest(".todo");
  if (!todoElement) return;
  console.log(todoElement);

  const collapsible = todoElement.querySelector(".collapsible-content");

  if (collapsible.classList.contains("active")) {
    collapsible.classList.remove("active");
    todoElement.classList.remove("flat-bottom-borders");
  } else {
    collapsible.classList.add("active");
    todoElement.classList.add("flat-bottom-borders");
  }
}
