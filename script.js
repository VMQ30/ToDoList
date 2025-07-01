class Project{
    constructor(name, todoArray){
        this.name = name;
        this.todoArray = todoArray;
    }

    addTodo(newItem){
        this.todoArray.push(newItem);
    }
    removeTodo(index){
        this.todoArray.splice(index, 1);
    }
    
}

class Todo{
    constructor(title, description, dueDate, priority, haveFinished){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.haveFinished = haveFinished;
    }
}

function createProjectList(projectList, projectName){
    const newProject = new Project(projectName, []);
    projectList.push(newProject);
}

function createTodoList(title, description, dueDate, priority, haveFinished, todoList){
    const newTodo = new Todo(title, description, dueDate, priority, haveFinished);
    todoList.push(newTodo);
}

todoArray = [];
let home = new Project("Home", todoArray);


