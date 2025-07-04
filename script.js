class Project{
    constructor(name){
        this.name = name;
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

function createProjectList(projectName, projectList){
    const newProject = new Project(projectName);
    projectList.push(newProject);
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

function createTodoList(title, description, dueDate, priority, haveFinished, project, todoList){
    const newTodo = new Todo(title, description, dueDate, priority, haveFinished, project);
    todoList.push(newTodo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodoItem(todoList, getPriorityValue){
    const {title, description, dueDate, project} = getNewTodoValues();
    const priority = getPriorityValue();

    if(priority == null){
        alert("Set a priority for your to-do item");
    }
    else{
        createTodoList(title, description, dueDate, priority, "false", project, todoList);
    }
}

function getPriority(){
    let priority;
    const low = document.getElementById('low');
    const high = document.getElementById('high');
    const med = document.getElementById('med');

    low.addEventListener("click", () =>{
        priority = "low";
    })
    med.addEventListener("click", () =>{
        priority = 'medium';
    })
    high.addEventListener("click", () =>{
        priority = "high";
    })

    return () => priority;
}

function saveTodoItem(todoList, projectList){
    const getPriorityValue = getPriority();
    const saveButton = document.querySelector(".save-todo");
    saveButton.addEventListener("click", (event) =>{
        event.preventDefault();
        addTodoItem(todoList, getPriorityValue);
        clearModal();
        alert("Successfully added to-do item in your list!");
        showAllTask(todoList, projectList);
    })
}

function getNewTodoValues(){
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-due").value;
    const project = document.getElementById("todo-project").value;

    return{title, description, dueDate, project};
}

function deleteTask(index, todoList){
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function showTask(title, description, dueDate, priority, project, todoList, projectList){
    const modal = document.querySelector(".modal-background");
    const modalBody = document.querySelector(".modal");
    
    modalBody.innerHTML = 
    `<div class = "modal-header">
        <h1>${title}</h1>
        <button class = "modal-exit">X</button>
    </div>

    <form>
        <div class = "modal-body">
            <div class = "modal-column1">
                <div class = "modal-container">
                    <label for="todo-title">Title:</label>
                    <input type="text" required name="todo-title" id="todo-title" value = "${title}" readonly>
                </div>

                <div class = "modal-container">
                    <label for="todo-description">Description:</label>
                    <textarea name="todo-description" required class = "todo-description" id="todo-description" readonly>${description}</textarea>
                </div>
            </div>

            <div class = "modal-column2">
                <div class = "modal-container">
                    <label for="todo-due">Due Date:</label>
                    <input type="date" required name="todo-due" id="todo-due" readonly value = "${new Date(dueDate).toISOString().split('T')[0]}">
                </div>

                <div class = "modal-container">
                    <label for="todo-title">Priority:</label>
                    <input type = "text" readonly value = ${priority}>
                </div>

                <div class = "modal-container">
                    <label for="todo-title">Project:</label>
                    <input type = "text" readonly value = ${project}>
                </div>
            </div>
        </div>

    </form>`;
    
    modal.style.transform = "translateY(0)";
    modalBody.style.transform = "translateY(0)";

    closeModal();
    stylePriorityButton();
    saveTodoItem(todoList, projectList);
}

function deleteProject(projectList){
    const deleteProjButton = document.querySelector(".delete-project");
    deleteProjButton.addEventListener("click", () =>{
        let projectName = prompt("Which Project do you wish to remove?");
        let projectFound = false;

        if(projectName != null){
            projectList.forEach((proj, index) =>{
                if(proj.name == projectName){
                    const userChoice = confirm(`Are you sure you want to remove Project ${projectName}?`);
                    if(userChoice){
                        projectList.splice(index, 1);
                        localStorage.setItem("projectList", JSON.stringify(projectList));
                    }
                    projectFound = true;
                    return;
                }
            })
        }

        if(!projectFound){
            alert(`Project ${projectName} not found`);
        }
    })
}

//DOM

function addProject(projectList){
    const addProjectButton = document.querySelector('.add-projects');
    addProjectButton.addEventListener("click", () =>{
        let projectName = prompt("Enter Project Name");
        if(projectName != null){
            createProjectList(projectName, projectList);
        }
    })
}

function taskButtons(todoList, projectList){
    const allButton = document.querySelector(".all");
    allButton.addEventListener("click", () =>{
        showAllTask(todoList, projectList);
    })

    const todayButton = document.querySelector(".today");
    todayButton.addEventListener("click", () =>{
        showTodayTask(todoList, projectList);
    })

    const importantButton = document.querySelector(".important");
    importantButton.addEventListener("click", () =>{
        showImportantTask(todoList, projectList);
    })

    const overdueButton = document.querySelector(".overdue");
    overdueButton.addEventListener("click", () =>{
        showOverdueTask(todoList, projectList);
    })

    const completeButton = document.querySelector(".completed");
    completeButton.addEventListener("click", () =>{
        showCompleteTask(todoList, projectList);
    })

}

function showAllTask(todoList, projectList){
    
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    taskList.innerHTML = "";

    todoList.forEach((item, index) =>{
        if(item.haveFinished == 'false'){
            if(index == 0){
                numberOfTask = 0;
            }

            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const div1 = document.createElement("div");
            const div2 = document.createElement("div");

            const completeCheckbox = document.createElement("input");
            completeCheckbox.type = "checkbox";
            completeCheckbox.classList.add("complete");

            const title = item.title;
            const todoItem = document.createElement("p");
            todoItem.textContent = title;

            div1.appendChild(completeCheckbox);
            div1.appendChild(todoItem);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "Delete"

            const showButton = document.createElement("button");
            showButton.classList.add("edit");
            showButton.textContent = "More";

            div2.appendChild(deleteButton);
            div2.appendChild(showButton);

            taskItem.appendChild(div1);
            taskItem.appendChild(div2);

            taskList.appendChild(taskItem);
            numberOfTask++;

            dueDate = new Date(item.dueDate)
            showButton.addEventListener("click", () =>{
                showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
            })

            deleteButton.addEventListener("click", () => {
                if(confirm("Are you sure you wish to delete this to-do task?")){
                    deleteTask(index, todoList);
                    showAllTask(todoList);
                }
            });

            completeCheckbox.addEventListener("change", () =>{
                if(completeCheckbox.checked == true){
                    item.haveFinished = 'true';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
                if(completeCheckbox.checked == false){
                    item.haveFinished = 'false';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
            })
        }

        mainPanelHeader("All Tasks", numberOfTask, todoList, projectList);
    })
}

function showTodayTask(todoList, projectList){
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    const dateToday = new Date();
    
    taskList.innerHTML = "";
    todoList.forEach((item, index) =>{

        if(item.haveFinished == 'false'){
            if(index == 0){
                numberOfTask = 0;
            }

            let dueDate = new Date(item.dueDate)
            dueDate = dueDate.toDateString();

            if (dateToday.toDateString() == dueDate){
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");

                const div1 = document.createElement("div");
                const div2 = document.createElement("div");

                const completeCheckbox = document.createElement("input");
                completeCheckbox.type = "checkbox";
                completeCheckbox.classList.add("complete");

                const title = item.title;
                const todoItem = document.createElement("p");
                todoItem.textContent = title;

                div1.appendChild(completeCheckbox);
                div1.appendChild(todoItem);

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                deleteButton.textContent = "Delete"

                const showButton = document.createElement("button");
                showButton.classList.add("edit");
                showButton.textContent = "More";

                div2.appendChild(deleteButton);
                div2.appendChild(showButton);

                taskItem.appendChild(div1);
                taskItem.appendChild(div2);

                taskList.appendChild(taskItem);
                numberOfTask++;

                showButton.addEventListener("click", () =>{
                    showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
                })

                deleteButton.addEventListener("click", () => {
                    if(confirm("Are you sure you wish to delete this to-do task?")){
                        deleteTask(index, todoList);
                        showTodayTask(todoList);
                    }
                });

                completeCheckbox.addEventListener("change", () =>{
                    if(completeCheckbox.checked == true){
                        item.haveFinished = 'true';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                    if(completeCheckbox.checked == false){
                        item.haveFinished = 'false';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                })
            }
        }
    })
    mainPanelHeader("Today's Tasks", numberOfTask, todoList, projectList);
}

function showOverdueTask(todoList, projectList){
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    const dateToday = new Date();
    
    taskList.innerHTML = "";
    todoList.forEach((item, index) =>{
        if(item.haveFinished == 'false'){
            if(index == 0){
                numberOfTask = 0;
            }

            let dueDate = new Date(item.dueDate)
            dueDate = dueDate.toDateString();

            if (new Date(item.dueDate).setHours(0,0,0,0) < dateToday.setHours(0,0,0,0)){
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");

                const div1 = document.createElement("div");
                const div2 = document.createElement("div");

                const completeCheckbox = document.createElement("input");
                completeCheckbox.type = "checkbox";
                completeCheckbox.classList.add("complete");

                const title = item.title;
                const todoItem = document.createElement("p");
                todoItem.textContent = title;

                div1.appendChild(completeCheckbox);
                div1.appendChild(todoItem);

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                deleteButton.textContent = "Delete"

                const showButton = document.createElement("button");
                showButton.classList.add("edit");
                showButton.textContent = "More";

                div2.appendChild(deleteButton);
                div2.appendChild(showButton);

                taskItem.appendChild(div1);
                taskItem.appendChild(div2);

                taskList.appendChild(taskItem);
                numberOfTask++;

                showButton.addEventListener("click", () =>{
                    showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
                })

                deleteButton.addEventListener("click", () => {
                    if(confirm("Are you sure you wish to delete this to-do task?")){
                        deleteTask(index, todoList);
                        showTodayTask(todoList);
                    }
                });

                completeCheckbox.addEventListener("change", () =>{
                    if(completeCheckbox.checked == true){
                        item.haveFinished = 'true';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                    if(completeCheckbox.checked == false){
                        item.haveFinished = 'false';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                })
            }
        }
    })
    mainPanelHeader("Overdue Tasks", numberOfTask, todoList, projectList);
}

function showImportantTask(todoList, projectList){
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    taskList.innerHTML = "";
    todoList.forEach((item, index) =>{
        if(item.haveFinished == 'false'){
            if(index == 0){
                numberOfTask = 0;
            }

            if(item.priority == 'high'){
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");

                const div1 = document.createElement("div");
                const div2 = document.createElement("div");

                const completeCheckbox = document.createElement("input");
                completeCheckbox.type = "checkbox";
                completeCheckbox.classList.add("complete");

                const title = item.title;
                const todoItem = document.createElement("p");
                todoItem.textContent = title;

                div1.appendChild(completeCheckbox);
                div1.appendChild(todoItem);

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                deleteButton.textContent = "Delete"

                const showButton = document.createElement("button");
                showButton.classList.add("edit");
                showButton.textContent = "More";

                div2.appendChild(deleteButton);
                div2.appendChild(showButton);

                taskItem.appendChild(div1);
                taskItem.appendChild(div2);

                taskList.appendChild(taskItem);
                numberOfTask++;

                showButton.addEventListener("click", () =>{
                    showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
                })

                deleteButton.addEventListener("click", () => {
                    if(confirm("Are you sure you wish to delete this to-do task?")){
                        deleteTask(index, todoList);
                        showImportantTask(todoList);
                    }
                });

                completeCheckbox.addEventListener("change", () =>{
                    if(completeCheckbox.checked == true){
                        item.haveFinished = 'true';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                    if(completeCheckbox.checked == false){
                        item.haveFinished = 'false';
                        localStorage.setItem("todoList", JSON.stringify(todoList));
                    }
                })
            }
        }
    })
    mainPanelHeader("Important Tasks", numberOfTask, todoList, projectList);
}

function showCompleteTask(todoList, projectList){
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    taskList.innerHTML = "";
    todoList.forEach((item, index) =>{
        if(index == 0){
            numberOfTask = 0;
        }

        if(item.haveFinished == 'true'){
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const div1 = document.createElement("div");
            const div2 = document.createElement("div");

            const completeCheckbox = document.createElement("input");
            completeCheckbox.type = "checkbox";
            completeCheckbox.classList.add("complete");
            completeCheckbox.checked = true;

            const title = item.title;
            const todoItem = document.createElement("p");
            todoItem.textContent = title;

            div1.appendChild(completeCheckbox);
            div1.appendChild(todoItem);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "Delete"

            const showButton = document.createElement("button");
            showButton.classList.add("edit");
            showButton.textContent = "More";

            div2.appendChild(deleteButton);
            div2.appendChild(showButton);

            taskItem.appendChild(div1);
            taskItem.appendChild(div2);

            taskList.appendChild(taskItem);
            numberOfTask++;

            showButton.addEventListener("click", () =>{
                showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
            })

            deleteButton.addEventListener("click", () => {
                if(confirm("Are you sure you wish to delete this to-do task?")){
                    deleteTask(index, todoList);
                    showImportantTask(todoList);
                }
            });

            completeCheckbox.addEventListener("change", () =>{
                if(completeCheckbox.checked == true){
                    item.haveFinished = 'true';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
                if(completeCheckbox.checked == false){
                    item.haveFinished = 'false';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
            })
        }
    })
    mainPanelHeader("Completed Tasks", numberOfTask, todoList, projectList);
}

function showProjectTask(projectList, projectName, todoList){
    const taskList = document.querySelector(".task-content");
    let numberOfTask = 0;

    taskList.innerHTML = "";
    todoList.forEach((item, index) =>{
        if(index == 0){
            numberOfTask = 0;
        }

        if(item.project == projectName){
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const div1 = document.createElement("div");
            const div2 = document.createElement("div");

            const completeCheckbox = document.createElement("input");
            completeCheckbox.type = "checkbox";
            completeCheckbox.classList.add("complete");

            const title = item.title;
            const todoItem = document.createElement("p");
            todoItem.textContent = title;

            div1.appendChild(completeCheckbox);
            div1.appendChild(todoItem);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "Delete"

            const showButton = document.createElement("button");
            showButton.classList.add("edit");
            showButton.textContent = "More";

            div2.appendChild(deleteButton);
            div2.appendChild(showButton);

            taskItem.appendChild(div1);
            taskItem.appendChild(div2);

            taskList.appendChild(taskItem);
            numberOfTask++;

            showButton.addEventListener("click", () =>{
                showTask(item.title, item.description, dueDate, item.priority, item.project, todoList, projectList);
            })

            deleteButton.addEventListener("click", () => {
                if(confirm("Are you sure you wish to delete this to-do task?")){
                    deleteTask(index, todoList);
                    showImportantTask(todoList);
                }
            });

            completeCheckbox.addEventListener("change", () =>{
                if(completeCheckbox.checked == true){
                    item.haveFinished = 'true';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
                if(completeCheckbox.checked == false){
                    item.haveFinished = 'false';
                    localStorage.setItem("todoList", JSON.stringify(todoList));
                }
            })
        }
    })
    mainPanelHeader(`${projectName} Tasks`, numberOfTask, todoList, projectList, projectList);
}

function mainPanelHeader(title, numberOfTask, todoList, projectList){
    const number = numberOfTask.toString();
    const headers = document.querySelector('.headers');
    headers.innerHTML = 
    `<div class = "header">
        <h1>${title}</h1>
    </div>

    <div class = "task-header">
        <h2>Tasks(${number})</h2>
        <button class = "add-task">+</button>
    </div>`

    openAddTaskModal(todoList, projectList);
}

function stylePriorityButton(){
    const low = document.getElementById('low');
    const high = document.getElementById('high');
    const med = document.getElementById('med');

    low.addEventListener("click", () =>{
        med.classList.remove("button-selected");
        high.classList.remove("button-selected");
        low.classList.add("button-selected");
    })

    med.addEventListener("click", () =>{
        low.classList.remove("button-selected");
        high.classList.remove("button-selected");
        med.classList.add("button-selected");
    })

    high.addEventListener("click", () =>{
        low.classList.remove("button-selected");
        med.classList.remove("button-selected");
        high.classList.add("button-selected");
    })
}

function openCloseSidebar(projectList, todoList){
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

    addProjectButtons(projectList, todoList);
    deleteProject(projectList);
}

function addProjectButtons(projectList, todoList){
    const buttonList = document.querySelector(".project-list");
    projectList.forEach((project) =>{
        const button = document.createElement("button");
        button.textContent = project.name;
        buttonList.appendChild(button);

        const projectName = project.name;
        button.addEventListener("click", () =>{
            showProjectTask(projectList, projectName, todoList)
        })
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

function openAddTaskModal(todoList, projectList){
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
                        <input type="date" required name="todo-due" id="todo-due">
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
                            <option value = "inbox">Inbox</option>
                            <option>Inbox</option>
                        </select>
                    </div>
                </div>
            </div>
        
            <div class = "modal-footer">
                <button class = 'save-todo' type="submit">Save</button>
            </div>
        </form>`;
        
        const selectOption = document.querySelector('.todo-project');

        projectList.forEach((project) =>{
            selectOption.add(new Option(`${project.name}`, `${project.name}`));
        })
        modal.style.transform = "translateY(0)";
        modalBody.style.transform = "translateY(0)";

        closeModal();
        stylePriorityButton();
        saveTodoItem(todoList, projectList);
    })
}

function clearModal(){
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-due").value = "";
    document.getElementById("todo-project").value = "inbox";

    const low = document.getElementById('low');
    const high = document.getElementById('high');
    const med = document.getElementById('med');

    med.classList.remove("button-selected");
    high.classList.remove("button-selected");
    low.classList.remove("button-selected");
}

(function(){
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let projectList = JSON.parse(localStorage.getItem("projectList")) || [];

    taskButtons(todoList, projectList);
    showTodayTask(todoList, projectList);
    addProject(projectList);

    openCloseSidebar(projectList, todoList);
})();


