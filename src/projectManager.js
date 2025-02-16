import Project from "./project";
import { projects, projectsMap } from "./states";
import { saveToLocalStorage } from "./states";
import {
  clearProjectDialogValues,
  closeProjectDialog,
  renderProjects,
} from "./uiManager";

export function addProject(projectDialogValues) {
  const { projectName } = projectDialogValues;

  if (!projectName) {
    alert("Please enter a project name");
    return;
  }

  const project = new Project(projectName);
  projects.push(project);
  console.log(projects);
  saveToLocalStorage();
  renderProjects();
  closeProjectDialog();
  clearProjectDialogValues();
}

// todo bitir bunu
function editProject(projectElement, projectDialogValues) {
  const project = projectsMap.get(projectElement);
  const { newName } = projectDialogValues;
  if (!newName) return;

  project.name = newName;
}
