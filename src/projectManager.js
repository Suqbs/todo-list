import Project from "./project";

// Hold projects in an array
const projects = [];

export function GetAllProjects() {
  // projects.forEach((project) => console.log(project));
  console.log(projects);
}

export function GetProject(projectIndex) {
  return projects[projectIndex];
}

export function EditProject(projectParams, projectIndex) {
  const project = projects[projectIndex];
  Object.assign(project, projectParams);
}

export function DeleteProject(index) {
    projects.splice(index, 1); // 2nd parameter means remove one item only
}

export function CreateProject(title) {
  if (validateProject(title)) {
    const newProject = new Project(title);

    // add project to projects array
    AddProject(newProject);
  }
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
