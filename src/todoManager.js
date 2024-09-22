import Todo from "./todo";
import { isValid } from "date-fns";

const todos = [];

export function createTodo(todoParams, project) {
  if (validateTodo(todoParams)) {
    // Assign params and project to todo
    const newTodo = new Todo(todoParams);
    newTodo.project = project;
    project.todos.push(newTodo);
    // Push to todos array
    todos.push(newTodo);
  }
}

export function getTodos() {
  console.log((todo) => console.log(todo))
}

export function getTodo(todoIndex) {
  return todos[todoIndex];
} 

export function deleteTodo(todo) {
  todos.splice(todos.indexOf(todo), 1);
}

export function editTodo(todo, todoParams) {
  Object.assign(todo, todoParams);
}

export function addDueDate(todo, date) {
  if(isValid)
  {
    todo.dueDate = date;
  }
  else {
    console.log("The day is not valid.")
  }
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
