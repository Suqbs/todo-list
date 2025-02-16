import { activeProject, saveToLocalStorage } from "./states";
import Todo from "./todo";
import { clearTodoDialogValues, closeTodoDialog, renderTodos } from "./uiManager";

export function addTodo(takeTodoDialogValues) {
  //todo buradan devam et basit tut
  if (!activeProject) return;
  const { name, desc, priority, dueDate, completed } = takeTodoDialogValues;

  console.log("Completed value:", completed);
  console.log("dueDate", dueDate);

  if (!name || !priority || !dueDate) {
    alert("Please fill all of the fields first.");
    return;
  }
  if (priority !== "HIGH" && priority !== "MEDIUM" && priority !== "LOW") {
    alert("Please choose a valid priority");
    return;
  }

  const newTodo = new Todo({name, desc, priority, completed, dueDate});

  activeProject.todos.push(newTodo);
  console.log("Pushed Todo", newTodo);
  saveToLocalStorage();
  renderTodos(activeProject);
  closeTodoDialog();
  clearTodoDialogValues();
}
