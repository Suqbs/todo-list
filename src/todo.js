export default class Todo {
  constructor(todoParams = { desc, priority, note, checkList }) {
    Object.assign(this, todoParams);
    this.dueDate = "";
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
