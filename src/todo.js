export default class Todo {
  constructor({
    desc = "",
    priority = "",
    note = "",
    checkBox = false,
    dueDate = "",
  }) {
    this.desc = desc;
    this.priority = priority;
    this.note = note;
    this.checkBox = checkBox;
    this.dueDate = dueDate;
  }
}
