import {
  activeProject,
  currentEditingTodo,
  projects,
  saveToLocalStorage,
  setCurrentEditingTodo,
  setCurrentEditingTodoProps,
} from "./states";
import Todo from "./todo";
import {
  closeTodoDialog,
  renderTodos,
  takeTodoDialogValues,
} from "./uiManager";

export function handleTodoFormSubmit() {
  const { name, desc, priority, dueDate, completed } = takeTodoDialogValues();

  if (!name || !priority || !dueDate) {
    alert("Please fill all of the fields first.");
    return;
  }
  if (priority !== "HIGH" && priority !== "MEDIUM" && priority !== "LOW") {
    alert("Please choose a valid priority");
    return;
  }

  if (currentEditingTodo) {
    console.log(currentEditingTodo);
    setCurrentEditingTodoProps(takeTodoDialogValues());
  } else {
    const newTodo = new Todo({ name, desc, priority, completed, dueDate });

    activeProject.todos.push(newTodo);
  }

  saveToLocalStorage();
  renderTodos(activeProject);
  closeTodoDialog();
  setCurrentEditingTodo(null);
}

export function deleteTodo(project, todo) {
  project.todos = project.todos.filter((t) => t !== todo);
  saveToLocalStorage();
  renderTodos(project);
}

export function getTodaysTodos() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todaysTodos = [];

  projects.forEach((project) => {
    if (project.todos) {
        const todosDueToday = project.todos.filter((todo) => {
        const dueDate = new Date(todo.dueDate);
        return !todo.completed && (dueDate >= today && dueDate < tomorrow);
      });

      todaysTodos.push(...todosDueToday);
    }
  });

  console.log(todaysTodos);
  return todaysTodos;
}

export function getUpcomingTodos() 
{
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  console.log("Starts from tomorrow: ", tomorrow);

  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 8); // 7 days later
  console.log("Ends at: ", oneWeekLater);

  const upcomingTodos = [];

  projects.forEach(project => {
    if(project.todos)
    {
      const upcomingTodosInProject = project.todos.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return !todo.completed && (dueDate >= tomorrow && dueDate < oneWeekLater);
      });

      upcomingTodos.push(...upcomingTodosInProject);
    }
  });

  console.log(upcomingTodos);
  return upcomingTodos;
}

