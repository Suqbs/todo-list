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
import { createTodo, editTodo, getTodo } from "./todoManager";
import { formatISO } from "date-fns";
import "./uiManager";

GetAllProjects();

//#region Test

//#region Create a Project
CreateProject("dsafsdafs");
//#endregion

// //#region Date
const day = formatISO(new Date(), { representation: "date" });
console.log(day);
// //#endregion


