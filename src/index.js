import "./styles.css";
import { addDueDate, removeDueDate } from "./todoManager";
import { createTodo, editTodo, getTodo } from "./todoManager";
import { formatISO } from "date-fns";
import "./uiManager";
import { renderProjects, setupEventListeners } from "./uiManager";
import { activeProject } from "./states";

//#region Test

//#region Create a Project
//#endregion

setupEventListeners();
renderProjects();

const submitTodo = document.getElementById("submitTodo");
submitTodo.addEventListener("click", () => {
  const dueDate = document.getElementById("dueDate");
  console.log(dueDate.value);
});

// //#region Date
const day = formatISO(new Date(), { representation: "date" });
console.log(day);
// //#endregion
