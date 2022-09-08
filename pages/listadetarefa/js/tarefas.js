import Link from 'next/link';
const inputarefa = document.querySelector(".tarefas");
const botao = document.querySelector(".buttonaddtarefa");
const tarefa = document.querySelector(".listatarefas");


botao.addEventListener('click', function(){
    if (!inputarefa.value) return;
    criarTarefa(inputarefa.value);
    //console.log(inputarefa.value);
});

function criarTarefa(textoInput){
    //console.log (textoInput);
    const li = criaLista();
    li.innerText = textoInput;
    tarefa.appendChild(li);
    limpaInput();
    deletartarefa(li);
    salvarTarefas();

}

function criaLista (){
    const li = document.createElement('li');
    return li;

}

inputarefa.addEventListener('keypress',function(e){
    if (e.keyCode ===13){
        if (!inputarefa.value) return;
        criarTarefa(inputarefa.value);
    }
});

function limpaInput(){
    inputarefa.value = '';
    inputarefa.focus();
}


function deletartarefa(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar Tarefa';
    botaoApagar.setAttribute('class','apagar')
    li.appendChild(botaoApagar);
}

document.addEventListener('click',function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    } 
});

function salvarTarefas(){
    const liTarefas = tarefa.querySelectorAll('li');
    const listadetarefas = [];
    for (let listatarefas of liTarefas){
        let tarefaTexto = listatarefas.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar Tarefa','' ).trim();
        listadetarefas.push(tarefaTexto);
    }
    const tarefasJSOn = JSON.stringify(listadetarefas);
    localStorage.setItem('tarefas', tarefasJSOn);
    //console.log(tarefasJSOn);
}
function mostrartarefa(){
    const tarefas = localStorage.getItem('tarefas');
    const listasdetarefas = JSON.parse(tarefas);
    for (let tarefa of listasdetarefas){
        criarTarefa(tarefa);
    }
    console.log(tarefas);

}
mostrartarefa();

