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
    constructor(title, description, dueDate, priority, haveFinished, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.haveFinished = haveFinished;
        this.project = project;
    }   
}

function createProjectList(projectList, projectName){
    const newProject = new Project(projectName, []);
    projectList.push(newProject);
    
}

function createTodoList(title, description, dueDate, priority, haveFinished, project, todoList){
    const newTodo = new Todo(title, description, dueDate, priority, haveFinished, project);
    todoList.push(newTodo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodoItem(todoList){
    let priority;

    const low = document.getElementById('low');
    const high = document.getElementById('high');
    const med = document.getElementById('med');

    const saveButton = document.querySelector(".save-todo");

    low.addEventListener("click", () =>{
        priority = "low";
        med.classList.remove("button-selected");
        high.classList.remove("button-selected");
        low.classList.add("button-selected");
        
    })

    med.addEventListener("click", () =>{
        priority = 'medium';
        low.classList.remove("button-selected");
        high.classList.remove("button-selected");
        med.classList.add("button-selected");
    })

    high.addEventListener("click", () =>{
        priority = "high";
        low.classList.remove("button-selected");
        med.classList.remove("button-selected");
        high.classList.add("button-selected");
    })

    saveButton.addEventListener("click", () =>{
        event.preventDefault();
        const title = document.getElementById("todo-title").value;
        const description = document.getElementById("todo-description").value;
        const dueDate = document.getElementById("todo-due").value;
        const project = document.getElementById("todo-project").value;

        if(priority == null){
            alert("Set a priority for your to-do item");
        }

        else{
            createTodoList(title, description, dueDate, priority, "false", project, todoList);
            console.log(`todolist ${todoList}`);
        }
    })
}

//purely DOM related
function openCloseSidebar(){
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
            mainPanel.classList.remove("visible-sidebar");
        }
    })
}

function closeModal(){
    const modal = document.querySelector(".modal-background");
    const closeButton = document.querySelector(".modal-exit");
    const modalBody = document.querySelector(".modal");

    closeButton.addEventListener("click", () =>{
        modal.style.transform = "translateY(-100%)";
        modalBody.style.transform = "translateY(-100%)";
    })

    modal.addEventListener("click", () =>{
        modal.style.transform = "translateY(-100%)";
        modalBody.style.transform = "translateY(-100%)";
    })

    modalBody.addEventListener("click", (event) =>{
        event.stopPropagation();
    })
}

function openAddTaskModal(todoList){
    const addButton = document.querySelector('.add-task');
    const modal = document.querySelector(".modal-background");
    const modalBody = document.querySelector(".modal");
    
    addButton.addEventListener("click", () =>{
        modalBody.innerHTML = 
        `<div class = "modal-header">
            <h1>New Task</h1>
            <button class = "modal-exit">X</button>
        </div>

        <form>
            <div class = "modal-body">
                <div class = "modal-column1">
                    <div class = "modal-container">
                        <label for="todo-title">*Title:</label>
                        <input type="text" required name="todo-title" id="todo-title">
                    </div>

                    <div class = "modal-container">
                        <label for="todo-description">*Description:</label>
                        <textarea name="todo-description" required class = "todo-description" id="todo-description"></textarea>
                    </div>
                </div>

                <div class = "modal-column2">
                    <div class = "modal-container">
                        <label for="todo-due">*Due Date:</label>
                        <input type="datetime-local" required name="todo-due" id="todo-due">
                    </div>

                    <div class = "modal-container-button">
                        <legend>*Priority:</legend>
                        <div class = "todo-priority" name = "todo-priority">
                            <button type="button" class = "priority-button low" id = 'low'>Low</button>
                            <button type="button" class = "priority-button med" id = 'med'>Medium</button>
                            <button type="button"class = "priority-button high" id = 'high'>High</button>
                        </div>
                    </div>

                    <div class = "modal-container">
                        <legend>*Project:</legend>
                        <select class = 'todo-project' required id = 'todo-project'>
                            <option>Inbox</option>
                            <option>Inbox</option>
                        </select>
                    </div>
                </div>
            </div>
        
            <div class = "modal-footer">
                <button class = 'save-todo' type="submit">Save</button>
            </div>
        </form>`;
        
        modal.style.transform = "translateY(0)";
        modalBody.style.transform = "translateY(0)";

        closeModal();
        addTodoItem(todoList);
    })
}

(function(){
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    openCloseSidebar();
    openAddTaskModal(todoList);
})();


