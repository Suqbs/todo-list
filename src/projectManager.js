import Project from "./project";
import { activeProject, currentEditingProject, projects, setActiveProject, setCurrentEditingProject, setCurrentEditingProjectProps, updateProjectsState } from "./states";
import { saveToLocalStorage } from "./states";
import {
  clearProjectDialogValues,
  clearTodos,
  closeProjectDialog,
  removeTodoButton,
  renderProjects,
  takeProjectDialogValues,
} from "./uiManager";

export function handleProjectFormSubmit() {
  const { projectName } = takeProjectDialogValues();

  if (!projectName) {
    alert("Please enter a project name");
    return;
  }

  if (currentEditingProject) {
    setCurrentEditingProjectProps(takeProjectDialogValues());
  } else {
    const newProject = new Project(projectName);
    projects.push(newProject);
  }

  saveToLocalStorage();
  renderProjects();
  closeProjectDialog();
  clearProjectDialogValues();
  setCurrentEditingProject(null);
}

export function deleteProject(project) {
  const updatedProjects = projects.filter(p => p !== project);
  updateProjectsState(updatedProjects);
  if (activeProject === project) {
    setActiveProject(null);
    removeTodoButton();
    clearTodos();
  }
  
  saveToLocalStorage();
  renderProjects();
}