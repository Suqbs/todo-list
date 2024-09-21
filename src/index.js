import "./styles.css";
import {
  GetProjects,
  CreateProject,
  DeleteProject,
  addTodo,
  deleteTodo,
} from "./projectManager";
import { addDueDate, removeDueDate } from "./todoManager";
import { createTodo, editTodo } from "./todoManager";
// import { formatISO } from "date-fns";

// const day = format(new Date(2014, 1, 11), "dd/MM/yyyy");
// console.log(day);

CreateProject("dsafsdafs");

// const day = formatISO(new Date("2024-11-11"), {representation: 'date'});
const day = new Date("2024-11-11");
console.log(day);

const ExampleTodo = {
  desc: "İstanbul'u keşfetmek",
  priority: "Medium",
  note: "Not",
  checkBox: true,
};

const testTodo = {
  desc: "Selam",
  priority: "Medium",
  note: "...",
  checkBox: false,
};

const newTodo = createTodo(ExampleTodo);
console.log(newTodo);

addDueDate(newTodo, day);
removeDueDate(newTodo);

addTodo(newTodo, 0);
editTodo(newTodo, testTodo);

GetProjects();

// Consoleda her şey istendiği gibi çalışıyor bir problem yok.
// Bir dahakinde DOM işlerini halledersin artık.
