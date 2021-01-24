const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos"; //localStorage key
let toDos =[]; //toDoList 저장

//화면에서 삭제, toDos배열에서 삭제
function deleteToDo(event){
    console.log(event.target.parentNode);
    const deleteNode = event.target.parentNode;
    toDoList.removeChild(deleteNode);
    
    const newToDos = toDos.filter(function (toDo){
        return toDo.ID !== parseInt(deleteNode.ID);
    });
    toDos = newToDos;
    saveToDos();
}

//toDos배열 localStorage에 저장(string형태)
function saveToDos(){
    currentStorageValue = JSON.stringify(toDos); 
    localStorage.setItem(TODO_LS, currentStorageValue);
}

//화면에 todo리스트 출력, 입력받은 것 toDos에 저장 
function paintToDo(text){

    const li = document.createElement("li");
    const delBtn = document.createElement("BUTTON");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.ID = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        ID: newId
    };
    toDos.push(toDoObj);
    saveToDos();

    
}

//submit발생시 paintToDo호출
function handleSubmit(event){  
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//localStorage에 값이 존재할 경우, 호출
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(each){
            paintToDo(each.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();