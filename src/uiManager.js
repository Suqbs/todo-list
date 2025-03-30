import { deleteProject, handleProjectFormSubmit } from "./projectManager";
import {
  projects,
  projectsMap,
  todosMap,
  setActiveProject,
  setCurrentEditingTodo,
  setCurrentEditingProject,
  saveToLocalStorage,
} from "./states";
import {
  deleteTodo,
  getTodaysTodos,
  getUpcomingTodos,
  handleTodoFormSubmit,
} from "./todoManager";

const noteWrapper = document.querySelector(".note-wrapper");

// #region Animation Stuff

const toggleBtn = document.getElementById("menu-icon-wrapper");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("close");
  toggleBtn.classList.toggle("rotate-y-axis");
});

const scrollIndicator = document.getElementById("scroll-indicator-span");

function updateScrollIndicator() {
  const hasOverflow = noteWrapper.scrollHeight > noteWrapper.clientHeight;
  const isScrolledToBottom = 
    noteWrapper.scrollTop + noteWrapper.clientHeight >= 
    noteWrapper.scrollHeight - 10; 
    
  if (hasOverflow && !isScrolledToBottom) {
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
    behavior: "smooth",
  });
});

updateScrollIndicator();

window.addEventListener("resize", updateScrollIndicator);

const resizeObserver = new ResizeObserver(() => {
  updateScrollIndicator();
});

resizeObserver.observe(noteWrapper);

noteWrapper.addEventListener("scroll", updateScrollIndicator);
// #endregion
const todoDialog = document.getElementById("todoDialog");

function openTodoDialog(todo = null) {
  if (todo) {
    document.getElementById("todoName").value = todo.name;
    document.getElementById("description").value = todo.desc;
    document.getElementById("priority").value = todo.priority;
    document.getElementById("dueDate").value = todo.dueDate;
    document.getElementById("completed").checked = todo.completed;
    setCurrentEditingTodo(todo);
  } else {
    document.getElementById("todoName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "MEDIUM";
    document.getElementById("dueDate").value = "";
    document.getElementById("completed").checked = false;
    setCurrentEditingTodo(null);
  }
  todoDialog.showModal();
}

export function closeTodoDialog() {
  todoDialog.close();
  document.getElementById("todoName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "MEDIUM";
  document.getElementById("dueDate").value = "";
  document.getElementById("completed").checked = false;
}

const projectDialog = document.getElementById("projectDialog");

function openProjectDialog(project = null) {
  if (project) {
    document.getElementById("projectName").value = project.name;
    setCurrentEditingProject(project);
  } else {
    document.getElementById("projectName").value = "";
    setCurrentEditingProject(null);
  }
  projectDialog.showModal();
}

export function closeProjectDialog() {
  projectDialog.close();
  document.getElementById("projectName").value = "";
}

export function takeProjectDialogValues() {
  const projectName = document.getElementById("projectName").value.trim();
  return { projectName };
}

export function clearProjectDialogValues() {
  const projectDialogForm = document.getElementById("projectDialogForm");
  projectDialogForm.reset();
}

export function takeTodoDialogValues() {
  const name = document.getElementById("todoName").value.trim();
  const desc = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value.trim();
  const dueDate = document.getElementById("dueDate").value.trim();
  const completed = document.getElementById("completed").checked;
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

export function renderTodaysTodos() {
  const todaysTodos = getTodaysTodos();
  todosDOM.textContent = "";

  if (todaysTodos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No todos due today.";
    todosDOM.appendChild(emptyMessage);
    return;
  }

  todaysTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo, "today");
    todosDOM.appendChild(todoElement);
  });
}

export function renderUpcomingTodos() {
  const upcomingTodos = getUpcomingTodos();
  todosDOM.textContent = "";

  if (upcomingTodos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No upcoming todos.";
    todosDOM.appendChild(emptyMessage);
    return;
  }

  upcomingTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo, "upcoming");
    todosDOM.appendChild(todoElement);
  });
}

function createProjectElement(project) {
  const sidebarItem = document.createElement("li");
  sidebarItem.className = "sidebar-item";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24px");
  svg.setAttribute("height", "24px");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#project-icon");

  const h2 = document.createElement("h2");
  h2.title = project.name;
  h2.textContent = project.name;

  const div = document.createElement("div");
  div.classList.add("three-dots");
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

  const modal = document.createElement("div");
  modal.className = "modal-generic project-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const editButton = document.createElement("button");
  editButton.className = "modal-item";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "modal-item";
  deleteButton.textContent = "Delete";

  modalContent.appendChild(editButton);
  modalContent.appendChild(deleteButton);
  modal.appendChild(modalContent);

  svg.appendChild(use);
  sidebarItem.appendChild(svg);
  sidebarItem.appendChild(h2);
  threeDotSvg.appendChild(threeDotUse);
  div.appendChild(threeDotSvg);
  div.appendChild(modal);
  sidebarItem.appendChild(div);

  return sidebarItem;
}

function createTodoElement(todo, viewType = "project") {
  const completedCheckboxId = crypto.randomUUID();

  const todoWrapper = document.createElement("div");
  todoWrapper.className = "todo-wrapper todo";

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

  const todoTitle = document.createElement("div");
  todoTitle.className = "todo-title";

  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "completed-todo-checkbox-wrapper";

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = completedCheckboxId;
  checkboxInput.checked = todo.completed;

  checkboxInput.addEventListener("change", (e) => {
    todo.completed = e.target.checked;

    saveToLocalStorage();
  });

  const checkboxLabel = document.createElement("label");
  checkboxLabel.htmlFor = completedCheckboxId;
  checkboxLabel.className = "completed-todo-checkbox-label";
  checkboxLabel.style.setProperty("--size", "1.875rem");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "1.875rem");
  svg.setAttribute("height", "1.875rem");
  svg.setAttribute("viewBox", "0 0 50 50");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M5 30 L 20 45 L 45 5");

  svg.appendChild(path);
  checkboxLabel.appendChild(svg);

  const titleText = document.createElement("p");
  titleText.textContent = todo.name;

  checkboxWrapper.appendChild(checkboxInput);
  checkboxWrapper.appendChild(checkboxLabel);
  checkboxWrapper.appendChild(titleText);

  const dueDateInfo = document.createElement("p");
  dueDateInfo.className = "due-date-info";
  dueDateInfo.textContent = todo.dueDate;

  const threeDotsDiv = document.createElement("div");
  if (viewType === "project") {
    threeDotsDiv.classList.add("three-dots");
    threeDotsDiv.classList.add("todo-three-dots");

    const threeDotsSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    threeDotsSvg.setAttribute("width", "24px");
    threeDotsSvg.setAttribute("height", "24px");

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#horizontal-dots");

    const modal = document.createElement("div");
    modal.className = "modal-generic todo-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const editButton = document.createElement("button");
    editButton.className = "modal-item";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "modal-item";
    deleteButton.textContent = "Delete";

    modalContent.appendChild(editButton);
    modalContent.appendChild(deleteButton);
    modal.appendChild(modalContent);

    threeDotsSvg.appendChild(use);
    threeDotsDiv.appendChild(threeDotsSvg);
    threeDotsDiv.appendChild(modal);
  }

  const collapsibleContent = document.createElement("div");
  collapsibleContent.className = "collapsible-content";

  const description = document.createElement("p");
  description.textContent = todo.desc;

  collapsibleContent.appendChild(description);

  todoTitle.appendChild(checkboxWrapper);
  todoTitleWrapper.appendChild(todoTitle);
  todoTitleWrapper.appendChild(dueDateInfo);
  if(viewType === "project") {
    todoTitleWrapper.appendChild(threeDotsDiv);
  }

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
  const todaysTodosBtn = document.getElementById("todays-todos");
  const upcomingTodosBtn = document.getElementById("upcoming-todos");

  projectsDOM.addEventListener("click", handleProjectClick);
  openProjectDialogBtn.addEventListener("click", () => openProjectDialog(null));
  closeTodoDialogBtn.addEventListener("click", closeTodoDialog);
  closeProjectDialogBtn.addEventListener("click", closeProjectDialog);
  submitProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleProjectFormSubmit();
  });

  todosDOM.addEventListener("click", handleTodoClick);

  submitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleTodoFormSubmit();
  });

  document.addEventListener("click", () => {
    const openModals = document.querySelectorAll(".show");
    if (openModals.length <= 0) return;

    openModals.forEach((modal) => modal.classList.remove("show"));
  });

  todaysTodosBtn.addEventListener("click", () => {
    projectsDOM
      .querySelectorAll(".sidebar-item")
      .forEach((sidebarItem) => sidebarItem.classList.remove("active"));
    upcomingTodosBtn.classList.remove("active");

    todaysTodosBtn.classList.add("active");
    removeTodoButton();
    renderTodaysTodos();
  });

  upcomingTodosBtn.addEventListener("click", () => {
    projectsDOM
      .querySelectorAll(".sidebar-item")
      .forEach((sidebarItem) => sidebarItem.classList.remove("active"));
    todaysTodosBtn.classList.remove("active");

    upcomingTodosBtn.classList.add("active");
    removeTodoButton();
    renderUpcomingTodos();
  });
}

function selectProject(projectElement) {
  const project = projectsMap.get(projectElement);
  setActiveProject(project);

  projectsDOM
    .querySelectorAll(".sidebar-item")
    .forEach((sidebarItem) => sidebarItem.classList.remove("active"));

  const todaysTodos = document.getElementById("todays-todos");
  const upcomingTodos = document.getElementById("upcoming-todos");
  todaysTodos.classList.remove("active");
  upcomingTodos.classList.remove("active");

  projectElement.classList.add("active");
  addOpenTodoDialogButton();
  renderTodos(project);
}

function addOpenTodoDialogButton() {

  if (document.querySelector(".add-todo-wrapper")) return;

  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

  wrapper.className = "add-todo-wrapper";
  button.className = "add-todo-button";
  button.id = "add-todo-button";
  button.setAttribute("aria-label", "Add New Todo");
  svg.setAttribute("width", "24px");
  svg.setAttribute("height", "24px");
  use.setAttribute("href", "#add-icon");

  svg.appendChild(use);
  button.appendChild(svg);
  wrapper.appendChild(button);

  button.addEventListener("click", () => openTodoDialog(null));

  const main = document.getElementById("main");
  main.appendChild(wrapper);
}

export function removeTodoButton() {
  const wrapper = document.querySelector(".add-todo-wrapper");
  if (wrapper) {
    const button = document.getElementById("add-todo-button");
    button.removeEventListener("click", () => openTodoDialog);
    wrapper.remove();
  }
}

export function clearTodos() {
  todosDOM.textContent = "";
}

function handleProjectClick(e) {
  if (e.target.closest(".project-three-dots")) {
    e.stopPropagation();

    const allOpenModals = document.querySelectorAll(".modal-generic.show");
    allOpenModals.forEach((openModal) => {
      if (
        openModal !==
        e.target.closest(".project-three-dots").querySelector(".modal-generic")
      ) {
        openModal.classList.remove("show");
      }
    });

    const projectThreeDots = e.target.closest(".project-three-dots");
    const modal = projectThreeDots.querySelector(".project-modal");
    const modalContent = projectThreeDots.querySelector(".modal-content");
    modal.classList.toggle("show");

    const projectElement = e.target.closest(".sidebar-item");
    const project = projectsMap.get(projectElement);
    console.log("Edited or deleted project", project);

    if (e.target === modalContent.firstChild) {
      // editing
      openProjectDialog(project);
    }
    if (e.target === modalContent.lastChild) {
      // removing
      deleteProject(project);
    }

    return;
  }

  const openModals = document.querySelectorAll(".modal-generic.show");

  if (openModals.length > 0) {
    openModals.forEach((modal) => modal.classList.remove("show"));
  }

  const projectElement = e.target.closest(".sidebar-item");
  if (!projectElement) return;

  console.log("Clicked project:", projectsMap.get(projectElement));

  selectProject(projectElement);
}

function handleTodoClick(e) {
  if (e.target.closest(".todo-three-dots")) {
    e.stopPropagation();

    const allOpenModals = document.querySelectorAll(".modal-generic.show");
    allOpenModals.forEach((openModal) => {
      if (
        openModal !==
        e.target.closest(".todo-three-dots").querySelector(".modal-generic")
      ) {
        openModal.classList.remove("show");
      }
    });

    const todoThreeDots = e.target.closest(".todo-three-dots");
    const modal = todoThreeDots.querySelector(".todo-modal");
    modal.classList.toggle("show");

    const modalContent = todoThreeDots.querySelector(".modal-content");

    const todoElement = e.target.closest(".todo");
    const { todo } = todosMap.get(todoElement);

    if (e.target === modalContent.firstChild) {
      // editing
      openTodoDialog(todo);
    }
    if (e.target === modalContent.lastChild) {
      // removing
      const { project, todo } = todosMap.get(todoElement);
      deleteTodo(project, todo);
    }

    return;
  }

  const openModals = document.querySelectorAll("modal-generic.show");

  if (openModals.length > 0) {
    openModals.forEach((modal) => modal.classList.remove("show"));
  }

  const todoElement = e.target.closest(".todo");
  if (!todoElement) return;

  const collapsible = todoElement.querySelector(".collapsible-content");

  if (collapsible.classList.contains("active")) {
    collapsible.classList.remove("active");
    todoElement.classList.remove("flat-bottom-borders");
  } else {
    collapsible.classList.add("active");
    todoElement.classList.add("flat-bottom-borders");
  }
}
