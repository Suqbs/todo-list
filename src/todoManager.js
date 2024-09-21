import Todo from "./todo";

export function createTodo(todoParams) {
  if (validateTodo(todoParams)) {
    return new Todo(todoParams);
  }
}

export function addDueDate(todo, date) {
  todo.dueDate = date;
}

export function editTodo(todo, todoParams) {
  Object.assign(todo, todoParams);
}

export function removeDueDate(todo) {
  todo.dueDate = "";
}

function validateTodo(todoParams) {
  if (!(todoParams.desc && todoParams.priority)) {
    console.log("Please fill out the necessary fields.");
    return false;
  }

  return true;
}
