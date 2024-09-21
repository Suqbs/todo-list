export default class Todo {
  constructor({ desc = "", priority = "", note = "", checkBox = false, dueDate = "" }) {
    this.desc = desc;
    this.priority = priority;
    this.note = note;
    this.checkBox = checkBox;
    this.dueDate = dueDate;
  }
}

// const ExampleTodo = {
//   desc: "İstanbul'u keşfetmek",
//   dueDate: "10-02-2024",
//   priority: "Medium",
//   note: "Not",
//   checkList: true,
// };

// const ExampleTodoo = new Todo(ExampleTodo);
// console.log(ExampleTodoo);
