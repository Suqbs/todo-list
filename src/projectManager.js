import Project from "./project";
import { createTodo } from "./todoCreator";

// Hold projects in an array
const projects = [];

export function GetProjects() {
  // projects.forEach((project) => console.log(project));
  console.log(projects);
}

export function DeleteProject(index) {
  // const index = projects.indexOf(project);

    projects.splice(index, 1); // 2nd parameter means remove one item only
}

export function CreateProject(title) {
  if (validateProject(title)) {
    const newProject = new Project(title);

    // add project to projects array
    AddProject(newProject);
  }
}

export function addTodo(todoParams, projectIndex) {
  const newTodo = createTodo(todoParams);

  projects[projectIndex].todos.push(newTodo);
}

export function deleteTodo(projectIndex, todoIndex) {
    // only splice array when item is found
    projects[projectIndex].todos.splice(todoIndex, 1); // 2nd parameter means remove one item only
}

function validateProject(title) {
  // İleriye ödev buraya string bir değer gönderilmediği zaman çözmen lazım
  if (!title.trim()) {
    console.log("Please give title to the project");
    return false;
  }
  return true;
}

function AddProject(project) {
  projects.push(project);
}
