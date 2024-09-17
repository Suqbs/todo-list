import { validateTodo } from "./todoManager";

export default class todo {
  constructor(todoParams = { desc, dueDate, priority, note, checkList }) {
    Object.assign(this, params);
  }  
}


const ExampleTodo = {
  desc: "İstanbul'u keşfetmek",
  dueDate: "10-02-2024",
  priority: "Medium",
  note: "Not",
  checkList: true,
};

const ExampleTodoo = new todo(ExampleTodo);
console.log(ExampleTodoo);
