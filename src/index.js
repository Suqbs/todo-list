import "./styles.css";
import { GetProjects, CreateProject, DeleteProject, addTodo } from "./projectManager";

CreateProject("dsafsdafs");
GetProjects();

const ExampleTodo = {
  desc: "İstanbul'u keşfetmek",
  dueDate: "10-02-2024",
  priority: "Medium",
  note: "Not",
  checkList: true,
};

addTodo(ExampleTodo, 0);
