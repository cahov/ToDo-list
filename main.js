const task = document.getElementById("input_task");
const btnAdd = document.getElementById("btn_add");
const btnRemoveAll = document.getElementById("btn_remove_all");
const listTask = document.getElementById("list_task");
const areaList= document.querySelector(".area-list");
let tareas = [];
let cosas = JSON.parse(localStorage.getItem("tarea"));
task.value="";
mueveReloj();
document.addEventListener("DOMContentLoaded", function(){
    for(let i=0; i<cosas.length;i++){
        if(cosas[i].estado=="check"){
            createList(cosas[i].contenido,cosas[i].estado);
        }else{
            createList(cosas[i].contenido);
        }
    }
})




function createList(text, status="uncheck"){
    if(text!=""){
        tareas.push({contenido: `${text}`, estado: `${status}`});
        let li = document.createElement("li");
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        let texto = document.createTextNode(text);
        li.appendChild(texto);
        span.className = "close";
        span.appendChild(txt);
        let indice = tareas.length-1;
        span.addEventListener("click", function(){
            closeTask(this,indice);
        });
        if(tareas[indice].estado=="check"){
            li.classList.add("check");
        }
        li.appendChild(span);
        li.addEventListener("click", function(){
            togleCheck(this, indice,span);
        });
        listTask.appendChild(li);
        localStorage.tarea = JSON.stringify(tareas);
        task.value="";
    }else{
        alert("La tarea no debe estar vacia");
    }
    
}

btnAdd.addEventListener("click", function(){
    event.preventDefault();
    createList(task.value);
})


btnRemoveAll.addEventListener("click", function(){
    while (listTask.firstChild) {
        listTask.removeChild(listTask.lastChild);
    }
    localStorage.clear();
})

function closeTask(span, x){
    span.parentElement.remove();
    tareas.splice(x,1);
    localStorage.tarea = JSON.stringify(tareas);
    
}



function togleCheck(li,indice, span){
    if(document.body.contains(span)){
        if(tareas[indice].estado=="check"){
            tareas[indice].estado="uncheck";
        }else{
            tareas[indice].estado="check";
        }
        localStorage.tarea = JSON.stringify(tareas);
        li.classList.toggle("check");
    }
    
}


function mueveReloj(){
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date()
    let hoy = dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
    let hora = fecha.getHours() + " :"+fecha.getMinutes() + " :"+ fecha.getSeconds();
    document.querySelector(".fecha").innerText=hoy;
    //document.querySelector(".hora").innerText=hora;
    setTimeout("mueveReloj()",1000)
}