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
    constructor(title, description, dueDate, important, haveFinished){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.important = important;
        this.haveFinished = haveFinished;
    }
}

function createProjectList(projectList, projectName){
    const newProject = new Project(projectName, []);
    projectList.push(newProject);
}

function createTodoList(title, description, dueDate, important, haveFinished, todoList){
    const newTodo = new Todo(title, description, dueDate, important, haveFinished);
    todoList.push(newTodo);
}

document.addEventListener("DOMContentLoaded", () =>{
    
    const menuButton = document.querySelector(".menu-button");
    const mainPanel = document.querySelector(".main-panel");
    let sidebar = document.querySelector(".sidebar");

    menuButton.addEventListener("click", ()=>{
        sidebar.classList.toggle("visible");
        mainPanel.classList.toggle("visible-sidebar");
    })
    
    mainPanel.addEventListener("click", ()=>{
        if(sidebar.classList.contains("visible")){
            sidebar.classList.remove("visible");
             console.log("Sidebar hidden");
        }
    })
})

console.log("hello");


