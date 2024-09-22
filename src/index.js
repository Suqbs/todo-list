import "./styles.css";
import {
  GetAllProjects,
  GetProject,
  CreateProject,
  DeleteProject,
  deleteTodo,
  EditProject,
} from "./projectManager";
import { addDueDate, removeDueDate } from "./todoManager";
import { createTodo, editTodo,getTodo } from "./todoManager";

GetAllProjects();

//#region Test

//#region Create a Project
CreateProject("dsafsdafs");
//#endregion

// //#region Date is Valid?
const day = new Date("20");
// //#endregion

//#region Example Param Objects
const ExampleTodo = {
  desc: "asdfsdaf",
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
//#endregion

//#region create Todo
createTodo(ExampleTodo, GetProject(0));;
//#endregion

 //#region edit Todo
editTodo(getTodo(0), testTodo);
//#endregion

//#region add due date
addDueDate(getTodo(0), day);
removeDueDate(getTodo(0));
//#endregion

//#region Edit Project
EditProject({ title: "Nereyi nereyi keşfetmek" }, 0);
//#endregion

//#endregion

// Consoleda her şey istendiği gibi çalışıyor bir problem yok.
// Bir dahakinde DOM işlerini halledersin artık.

