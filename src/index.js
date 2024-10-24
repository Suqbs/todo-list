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
import { formatISO } from "date-fns";

GetAllProjects();

//#region Test

//#region Create a Project
CreateProject("dsafsdafs");
//#endregion

// //#region Date
const day = formatISO(new Date(), { representation: 'date' });
console.log(day);
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
createTodo(ExampleTodo, GetProject(0));
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

addDueDate(getTodo(0), day);

//#endregion



// Consoleda her şey istendiği gibi çalışıyor bir problem yok.
// Bir dahakinde DOM işlerini halledersin artık.

const menuIcon = document.getElementById("menu-icon-span");
const sidebar = document.getElementById("sidebar");
const sidebarContainer = document.getElementById("sidebar-container");
console.log(sidebar);

let menuOpen = true;

function closeMenu() {
  menuOpen = false;
  sidebarContainer.style.maxWidth = "0px";
  sidebar.style.display = "none";
  menuIcon.classList.add("rotate-y-axis");
}

function openMenu() {
  menuOpen = true;
  sidebar.style.display = "block";
  sidebarContainer.style.maxWidth = "20rem";
  menuIcon.classList.remove("rotate-y-axis");
}

menuIcon.addEventListener('click', function() {
  if(!menuOpen) {
    openMenu();
  }
  else{
    closeMenu();
  }
})

