// Hold projects in an array
const projects = [];

export function GetProjects() {

  console.log(projects);
}

export function AddProject(project) {
  projects.push(project);
}

export function DeleteProject(project) {
    
  const index = projects.indexOf(project);

  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}

export function validateProject(project) {
    if(!project.title)
    {
        throw new Error("Please give title to the project");
        
    }
}
