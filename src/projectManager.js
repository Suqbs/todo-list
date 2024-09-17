import Project from "./project";
import { createTodo } from "./todoManager";

// Hold projects in an array
const projects = [];

export function GetProjects() {
  console.log(projects);
}

export function DeleteProject(project) {
  const index = projects.indexOf(project);

  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}

export function CreateProject(title) {
  if (validateProject) {
    const newProject = new Project(title);

    // add project to projects array
    AddProject(newProject);
  }
}

export function addTodoToProject(todo) {

}

function validateProject(project) {
  if (!project.title) {
    console.log("Please give title to the project");
    return false;
  }
  return true;
}

function AddProject(project) {
  projects.push(project);
}
