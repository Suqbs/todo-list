import Project from "./project";
import { createTodo } from "./todoManager";

// Hold projects in an array
const projects = [];

export function GetProjects() {
  projects.forEach((project) => console.log(project));
}

export function DeleteProject(index) {
  // const index = projects.indexOf(project);

  if (index > -1) {
    // only splice array when item is found
    projects.splice(index, 1); // 2nd parameter means remove one item only
  }
}

export function CreateProject(title) {
  if (validateProject) {
    const newProject = new Project(title);

    // add project to projects array
    AddProject(newProject);
  }
}

export function addTodo(todoParams, projectIndex) {
  const newTodo = createTodo(todoParams);

  projects[projectIndex].todo.push(newTodo);
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
