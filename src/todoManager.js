import Todo from "./todo";

export function createTodo(todoParams) {
  if (validateTodo(todoParams)) {
    return new Todo(todoParams);
  }
}

function validateTodo(todoParams) {
  if (!(todoParams.desc && priority)) {
    console.log("Please fill out the necessary fields.");
    return false;
  }

  return true;
}
