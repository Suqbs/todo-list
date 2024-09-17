import Todo from "./todo";

export function createTodo(todoParams, projectIndex) {
  if (validateTodo(todoParams)) {
    const newTodo = new Todo();

    // add todo to project -- how to make a relationship between array index and a dom element?  this question is for the future reference
    
  }
}

function validateTodo(todoParams) {
  if (!(todoParams.desc || priority)) {
    console.log("Please fill out the necessary fields.");
    return false;
  }

  return true;
}
