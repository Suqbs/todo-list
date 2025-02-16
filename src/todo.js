export default class Todo {
  constructor({
    name = "",
    desc = "",
    priority = "",
    completed = false,
    dueDate = "",
  }) {
    this.name = name;
    if(!desc)
    {
      this.desc = "No description added for this todo.";
    }
    else
    {
      this.desc = desc;
    }
    this.priority = priority;
    this.completed = completed;
    this.dueDate = dueDate;
  }
}
