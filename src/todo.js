export default class Todo {
  constructor(todoParams = { desc, dueDate, priority, note, checkList }) {
    Object.assign(this, todoParams);
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
