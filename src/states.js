export const projectsMap = new WeakMap();
export const todosMap = new WeakMap();
export let activeProject = null;
export let projects = JSON.parse(localStorage.getItem('projects')) || [];

export function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(projects);
}

export function setActiveProject(value) {
    activeProject = value;
}
