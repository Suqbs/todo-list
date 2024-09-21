import "./styles.css";
import { GetProjects, CreateProject, DeleteProject, addTodo, deleteTodo } from "./projectManager";
import { format } from "date-fns";

// const day = format(new Date(2014, 1, 11), "dd/MM/yyyy");
// console.log(day);

CreateProject("dsafsdafs");

const ExampleTodo = {
  desc: "İstanbul'u keşfetmek",
  priority: "Medium",
  note: "Not",
  checkList: true,
};

addTodo(ExampleTodo, 0);
GetProjects();

// Consoleda her şey istendiği gibi çalışıyor bir problem yok.
// Bir dahakinde DOM işlerini halledersin artık.