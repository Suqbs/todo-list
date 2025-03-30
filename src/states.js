export const projectsMap = new WeakMap();
export const todosMap = new WeakMap();
export let activeProject = null;
export let projects = JSON.parse(localStorage.getItem("projects")) || [];
export let currentEditingTodo = null; // Track todo being edited
export let currentEditingProject = null; // Track project being edited

export function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(projects);
}

export function setActiveProject(value) {
  activeProject = value;
}

export function setCurrentEditingTodo(value) {
  currentEditingTodo = value;
}

export function setCurrentEditingTodoProps({
  name,
  desc,
  priority,
  dueDate,
  completed,
}) {
  currentEditingTodo.name = name;
  currentEditingTodo.desc = desc;
  currentEditingTodo.priority = priority;
  currentEditingTodo.dueDate = dueDate;
  currentEditingTodo.completed = completed;
}

export function setCurrentEditingProject(value) {
  currentEditingProject = value;
}

export function setCurrentEditingProjectProps({ projectName }) {
  currentEditingProject.name = projectName;
}

export function updateProjectsState(value) {
  projects = value;
}
