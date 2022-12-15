
/* ====================================================== */
/* ====================== VARIAVEIS ===================== */
/* ====================================================== */
 
let tarefasHoje = [];  
let todasTarefas = [];
let horarioInicial;
let inicioTarefa = "0";
let finalTarefa = "0";
let duracaoString; 
let dropAcionado = false;           // impede que o drop seja acionado mais de uma vez seguida
let dropAcionadoTodasTarefas = false;
let posicaoInicialItemMovimentado;
let posicaoFinalItemMovimentado;  
let enderecoLixeira = "images/delete_transparente.png";  
let idNovaTarefa;
let drop = false;
let containerInicial; 
let idItemMovimentado;
let classeItemMovimentado;

/* ====================================================== */
/* ===================== WINDOW ONLOAD ================== */
/* ====================================================== */
 

window.onload = function() { 
       
    // downloadLocalStorage();
    dragAndDrop();  
    // deletar();
    // tarefaSelecionada();
    
}


 
/* ====================================================== */
/* ================ COLETA VALORES INICIAIS ============= */
/* ====================================================== */
 

document.querySelector(".btn-enviar").addEventListener("click", function(e) { 

    e.preventDefault();
    
    if (document.getElementById("horario-inicial").value !== "") {
        if (horarioInicial != document.getElementById("horario-inicial").value){ 
            horarioInicial = document.getElementById("horario-inicial").value; 
            if (tarefasHoje.length > 0) {
                // atualizaHorarios (); 
            }
        }
        
        document.getElementById("nome-tarefa").focus(); 
    }
    
    if (document.getElementById("nome-tarefa").value !== "" && document.getElementById("duracao").value !== "") { 
           
        let tarefa = {
            posicao: todasTarefas.length, 
            nome: document.getElementById("nome-tarefa").value, 
            duracao: document.getElementById("duracao").value, 
            inicio: inicioTarefa, 
            final: finalTarefa
        };
        
        idNovaTarefa = todasTarefas.length;
        todasTarefas.push(tarefa);    

        formatacaoDuracao(Number(tarefa.duracao.split(":")[0]), Number(tarefa.duracao.split(":")[1]));
  
        document.querySelector(".todas-tarefas-container").insertAdjacentHTML("beforeend", `
            <p 
                class= "tarefas-arrastaveis todas-tarefas-item animacao-sobe"  
                id="todas-tarefas-item-${idNovaTarefa}" 
                draggable="true" 
            >
                    <img 
                        class="todas-tarefas-lixeiras" 
                        id="todas-tarefas-lixeira-${idNovaTarefa}" 
                        src=${enderecoLixeira} 
                    > 
                    <span   
                        id="todas-tarefas-span-${idNovaTarefa}"
                    > 
                        ${tarefa.nome} (${duracaoString})
                    </span>            
            </p>
        `);
         

        document.getElementById("nome-tarefa").value = "";
        document.getElementById("duracao").value = "";
        document.getElementById("nome-tarefa").focus(); 
 
        // deletar();

        dragAndDrop();  
         
        // atualizaLocalStorage();
        
    }
    
    if (document.querySelector(".tarefa-atual")) {
        document.querySelector(".tarefa-atual").classList.remove("tarefa-atual");
    }
});

  

/* ====================================================== */
/* ===================== DRAG AND DROP ================== */
/* ====================================================== */

let localDoDrop;
let idInicial;  
let cardBeingDragged;
  
function dragAndDrop() {
       
    document.querySelectorAll(".tarefas-arrastaveis").forEach(tarefa => {

        tarefa.addEventListener('dragstart', function (event) {   
                   
            dropAcionado = false;   
            dropAcionadoTodasTarefas = false;
            
            this.classList.add("tarefa-selecionada");
            this.classList.remove("animacao-sobe"); 

            cardBeingDragged = document.querySelector(".tarefa-selecionada");  
            containerInicial = event.target.parentElement.parentElement.outerHTML.slice(12, 17);
            idInicial = event.target.id;
    
        });
 
        tarefa.addEventListener('dragend', function () {     
            this.classList.remove('tarefa-selecionada'); 
        });
    }); 
 
 

    document.querySelectorAll(".container").forEach(container => {
          
        container.addEventListener("dragover", function (event) {   
            event.preventDefault();  
            event.stopImmediatePropagation();
        });

        container.addEventListener("dragenter", function (event) {  

            event.preventDefault(); 
          
            container.style.backgroundColor = "rgba(251, 204, 208, 0.400)"; 
            document.querySelector(".titulos").style.backgroundColor = "rgba(255,235,233,255)";
        });


        container.addEventListener("dragleave", function () {   
            container.style.backgroundColor = "rgba(255,235,233,255)"; 
        });
 
    });  


    function calculaLocalDrop(container, y) {

        console.log("calculaLocalDrop");

        let listaTarefas = [...container.querySelectorAll(".tarefas-arrastaveis:not(.tarefa-selecionada)")];

        return listaTarefas.reduce((valorInicial, child) => {
            let retangulo = child.getBoundingClientRect();
            let metadeRetangulo = y - retangulo.top - retangulo.height / 2;
  
            if (metadeRetangulo < 0 && metadeRetangulo > valorInicial.offset) { 
                return { offset: valorInicial, element: child}                
            }
            else {
                return valorInicial
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element

    }

 
 
    /* ===================== DROP TAREFAS DE HOJE ================== */
 

    document.querySelector(".tarefas-hoje-container").addEventListener("drop", function (event) {

        event.preventDefault();     
        
        if (dropAcionado === false) {       // impede que o evento seja acionado mais de uma vez seguida

            // console.log("********* DROP **********");     
            
            document.querySelectorAll(".container")[1].style.backgroundColor = "rgba(255,235,233,255)";            
 

   


            let container = document.querySelector(".tarefas-hoje-container");

            localDoDrop = calculaLocalDrop(container, event.clientY); 
                
            if (localDoDrop) {  
            container.insertBefore(cardBeingDragged, localDoDrop);  
            } 
            else {    
                container.appendChild(cardBeingDragged);   
            } 
            
            
            if (tarefasHoje.length === 0) {
                posicaoFinalItemMovimentado = 0; 
            }                  
            else if (document.querySelector(".tarefa-selecionada").previousElementSibling) {
                posicaoFinalItemMovimentado = Number(document.querySelector(".tarefa-selecionada").previousElementSibling.id.split("-")[3]); 
                posicaoFinalItemMovimentado = posicaoFinalItemMovimentado + 1;    
            }

































 
            /* ======================================================================== */ 
            /* ===================== TODAS TAREFAS > TAREFAS DE HOJE ================== */ 
            /* ======================================================================== */ 
  
            if (containerInicial == "todas") { 
     
                /* ======== REMOVI ITEM DO TODAS TAREFAS [] ======== */
  
                let posicaoInicialItemMovimentado = idInicial.split("-")[3];                 
                let itemMovimentado;
                
                if (todasTarefas.length > 0 ) {
                    itemMovimentado = todasTarefas.splice(posicaoInicialItemMovimentado, 1);
                }
  

                /* ======== ATUALIZAÇÃO POSIÇÕES DO TODAS TAREFAS [] ======== */
   
                for (let i = 0; i < todasTarefas.length; i++) {  
                    todasTarefas[i].posicao = i; 
                };


                /* ======== ZEREI TODAS-TAREFAS ======== */

                while (document.querySelectorAll(".todas-tarefas-item").length != 0) {
                    document.querySelector(".todas-tarefas-item").remove();
                }

                if (!document.querySelector(".todas-tarefas-container")) {

                    let divTodasTarefasContainer = document.createElement('div');
                    divTodasTarefasContainer.classList.add("todas-tarefas-container");
                    divTodasTarefasContainer.classList.add("container");

                    document.querySelector(".todas-tarefas").appendChild(divTodasTarefasContainer);
                }
  
  
                /* ======== RECOLOCAÇÃO ITENS TODAS-TAREFAS ======== */
 
                for (let i = 0; i < todasTarefas.length; i++) {
        
                    formatacaoDuracao(Number(todasTarefas[i].duracao.split(":")[0]), Number(todasTarefas[i].duracao.split(":")[1]));
                          
                    let textoTarefa = `
                        <img class="todas-tarefas-lixeiras" id="todas-tarefas-lixeira-${i}" src=${enderecoLixeira}> 
                        <span id="todas-tarefas-span-${i}">${todasTarefas[i].nome} (${duracaoString})</span>   
                    `; 
 
                    let p = document.createElement('p'); 
                    p.classList.add("tarefas-arrastaveis");
                    p.classList.add("todas-tarefas-item");
                    p.draggable = true;
                    p.id = `todas-tarefas-item-${i}`;
                    p.innerHTML = textoTarefa;
    
                    document.querySelector(".todas-tarefas-container").appendChild(p);
                }
                            
  

                /* ======== ADICIONEI ITEM NO TAREFAS HOJE [] ======== */
                 
                tarefasHoje.splice(posicaoFinalItemMovimentado, 0, itemMovimentado[0]);  
 
                 
                /* ======== ATUALIZAÇÃO POSIÇÕES DO TAREFAS HOJE [] ======== */
   
                for (let i = 0; i < tarefasHoje.length; i++) {  
                    tarefasHoje[i].posicao = i; 
                };
   

                /* ======== ZEREI TAREFAS-HOJE ======== */
                 
                while (document.querySelectorAll(".tarefas-hoje-item").length != 0) {
                    document.querySelector(".tarefas-hoje-item").remove();
                }

                if (!document.querySelector(".tarefas-hoje-container")) {
                    let divTarefasHojeContainer = document.createElement('div');
                    divTarefasHojeContainer.classList.add("tarefas-hoje-container");
                    divTarefasHojeContainer.classList.add("container");

                    document.querySelector(".tarefas-hoje").appendChild(divTarefasHojeContainer);
                } 


                /* ======== RECOLOCAÇÃO ITENS TAREFAS-HOJE ======== */

                for (let i = 0; i < tarefasHoje.length; i++) {
                     
                    calculaHorarios (2, i);
                      
                    tarefasHoje[i].inicio = inicioTarefa;
                    tarefasHoje[i].final = finalTarefa;
                         
                    let textoTarefa = `
                        <img class="tarefas-hoje-lixeiras" id="tarefas-hoje-lixeira-${i}" src=${enderecoLixeira}>
                        <span class="espacamento">${tarefasHoje[i].inicio}</span>
                        <span class="espacamento">${tarefasHoje[i].nome}</span>
                        <span class="espacamento">${duracaoString}</span>
                    `;


                    let p = document.createElement('p');
                    p.classList.add("tarefas-arrastaveis");
                    p.classList.add("tarefas-hoje-item");
                    p.draggable = true;
                    p.id = `tarefas-hoje-item-${i}`;
                    p.innerHTML = textoTarefa;
  
                    document.querySelector(".tarefas-hoje-container").appendChild(p);
  
                } 
 
            }

            
            /* ======================================================================== */ 
            /* ===================== TAREFAS DE HOJE > TAREFAS DE HOJE ================== */ 
            /* ======================================================================== */ 

            if (containerInicial == "taref") { 
                
                // console.log(`"entrou no if (containerInicial == "taref")"`); 
  
                let posicaoInicialItemMovimentado = idInicial.split("-")[3];  
                
                for (let i = 0; i < document.querySelectorAll(".tarefas-hoje-item").length; i++) {
    
                    let idNumber = document.querySelectorAll(".tarefas-hoje-item")[i].id.split("-")[3]; 
    
                    if (posicaoInicialItemMovimentado == idNumber) {
                        posicaoFinalItemMovimentado = i;
                    } 
                }
                
                
                if (posicaoFinalItemMovimentado != posicaoInicialItemMovimentado) {
                     
                    let itemMovimentado = tarefasHoje.splice(posicaoInicialItemMovimentado, 1);  
  
                    tarefasHoje.splice(posicaoFinalItemMovimentado, 0, itemMovimentado[0]);
         
  
                    /* ======== ATUALIZAÇÃO POSIÇÕES DO TAREFAS HOJE [] ======== */
    
                    for (let i = 0; i < tarefasHoje.length; i++) {  
                        tarefasHoje[i].posicao = i; 
                    };
    

                    /* ======== ZEREI TAREFAS-HOJE ======== */
                    
                    while (document.querySelectorAll(".tarefas-hoje-item").length != 0) {
                        document.querySelector(".tarefas-hoje-item").remove();
                    }

                    if (!document.querySelector(".tarefas-hoje-container")) {
                        let divTarefasHojeContainer = document.createElement('div');
                        divTarefasHojeContainer.classList.add("tarefas-hoje-container");
                        divTarefasHojeContainer.classList.add("container");

                        document.querySelector(".tarefas-hoje").appendChild(divTarefasHojeContainer);
                    } 


                    /* ======== RECOLOCAÇÃO ITENS TAREFAS-HOJE ======== */

                    for (let i = 0; i < tarefasHoje.length; i++) {
                        
                        calculaHorarios (2, i);
                        
                        tarefasHoje[i].inicio = inicioTarefa;
                        tarefasHoje[i].final = finalTarefa;
                            
                        let textoTarefa = `
                            <img class="tarefas-hoje-lixeiras" id="tarefas-hoje-lixeira-${i}" src=${enderecoLixeira}>
                            <span class="espacamento">${tarefasHoje[i].inicio}</span>
                            <span class="espacamento">${tarefasHoje[i].nome}</span>
                            <span class="espacamento">${duracaoString}</span>
                        `;


                        let p = document.createElement('p');
                        p.classList.add("tarefas-arrastaveis");
                        p.classList.add("tarefas-hoje-item");
                        p.draggable = true;
                        p.id = `tarefas-hoje-item-${i}`;
                        p.innerHTML = textoTarefa;
    
                        document.querySelector(".tarefas-hoje-container").appendChild(p);
    
                    } 

                }

            }

            dragAndDrop();
        }
        
        dropAcionado = true;

    });




// USAR DRAG ENTER !!!!!!!!!!!






    /* ===================== DROP TODAS TAREFAS ================== */
 

    document.querySelector(".todas-tarefas-container").addEventListener("drop", function (event) {

        event.preventDefault();     

        if (dropAcionadoTodasTarefas === false) {       // impede que o evento seja acionado mais de uma vez seguida

   

            let container = document.querySelector(".todas-tarefas-container");

            localDoDrop = calculaLocalDrop(container, event.clientY); 
                
            if (localDoDrop) {  
            container.insertBefore(cardBeingDragged, localDoDrop);  
            } 
            else {    
                container.appendChild(cardBeingDragged);   
            } 
            
            
            if (tarefasHoje.length === 0) {
                posicaoFinalItemMovimentado = 0; 
            }                  
            else if (document.querySelector(".tarefa-selecionada").previousElementSibling) {
                posicaoFinalItemMovimentado = Number(document.querySelector(".tarefa-selecionada").previousElementSibling.id.split("-")[3]); 
                posicaoFinalItemMovimentado = posicaoFinalItemMovimentado + 1;    
            }















            /* ======================================================================== */ 
            /* ===================== TAREFAS DE HOJE > TODAS TAREFAS ================== */ 
            /* ======================================================================== */ 
  
            if (containerInicial == "taref") { 
     
                /* ======== REMOVI ITEM DO TAREFAS DE HOJE [] ======== */
  
                let posicaoInicialItemMovimentado = idInicial.split("-")[3];                 
                let itemMovimentado;
                
                if (tarefasHoje.length > 0 ) {
                    itemMovimentado = tarefasHoje.splice(posicaoInicialItemMovimentado, 1);
                }
  

                /* ======== ATUALIZAÇÃO POSIÇÕES DO TAREFAS DE HOJE [] ======== */
   
                for (let i = 0; i < tarefasHoje.length; i++) {  
                    tarefasHoje[i].posicao = i; 
                };


                /* ======== ZEREI TAREFAS-HOJE ======== */

                while (document.querySelectorAll(".tarefas-hoje-item").length != 0) {
                    document.querySelector(".tarefas-hoje-item").remove();
                }

                // document.querySelector(".tarefas-hoje-container").remove();

                if (!document.querySelector(".tarefas-hoje-container")) {

                    let divTodasTarefasContainer = document.createElement('div');
                    divTodasTarefasContainer.classList.add("tarefas-hoje-container");
                    divTodasTarefasContainer.classList.add("container");

                    document.querySelector(".tarefas-hoje").appendChild(divTodasTarefasContainer);
                }
  
  
                /* ======== RECOLOCAÇÃO ITENS TAREFAS-HOJE ======== */
 

                for (let i = 0; i < tarefasHoje.length; i++) {
                     
                    calculaHorarios (2, i);
                      
                    tarefasHoje[i].inicio = inicioTarefa;
                    tarefasHoje[i].final = finalTarefa;
                         
                    let textoTarefa = `
                        <img class="tarefas-hoje-lixeiras" id="tarefas-hoje-lixeira-${i}" src=${enderecoLixeira}>
                        <span class="espacamento">${tarefasHoje[i].inicio}</span>
                        <span class="espacamento">${tarefasHoje[i].nome}</span>
                        <span class="espacamento">${duracaoString}</span>
                    `;


                    let p = document.createElement('p');
                    p.classList.add("tarefas-arrastaveis");
                    p.classList.add("tarefas-hoje-item");
                    p.draggable = true;
                    p.id = `tarefas-hoje-item-${i}`;
                    p.innerHTML = textoTarefa;
  
                    document.querySelector(".tarefas-hoje-container").appendChild(p);
  
                } 
 

                /* ======== ADICIONEI ITEM NO TODAS TAREFAS [] ======== */
                 
                todasTarefas.splice(posicaoFinalItemMovimentado, 0, itemMovimentado[0]);  
 
                 
                /* ======== ATUALIZAÇÃO POSIÇÕES DO TODAS TAREFAS [] ======== */
   
                for (let i = 0; i < todasTarefas.length; i++) {  
                    todasTarefas[i].posicao = i; 
                };
   

                /* ======== ZEREI TODAS-TAREFAS ======== */
                 
                while (document.querySelectorAll(".todas-tarefas-item").length != 0) {
                    document.querySelector(".todas-tarefas-item").remove();
                }

                if (!document.querySelector(".todas-tarefas-container")) {
                    let divTodasTarefasContainer = document.createElement('div');
                    divTodasTarefasContainer.classList.add("todas-tarefas-container");
                    divTodasTarefasContainer.classList.add("container");

                    document.querySelector(".todas-tarefas").appendChild(divTodasTarefasContainer);
                } 


                /* ======== RECOLOCAÇÃO ITENS TODAS-TAREFAS ======== */


                for (let i = 0; i < todasTarefas.length; i++) {
        
                    formatacaoDuracao(Number(todasTarefas[i].duracao.split(":")[0]), Number(todasTarefas[i].duracao.split(":")[1]));
                          
                    let textoTarefa = `
                        <img class="todas-tarefas-lixeiras" id="todas-tarefas-lixeira-${i}" src=${enderecoLixeira}> 
                        <span id="todas-tarefas-span-${i}">${todasTarefas[i].nome} (${duracaoString})</span>   
                    `; 
 
                    let p = document.createElement('p'); 
                    p.classList.add("tarefas-arrastaveis");
                    p.classList.add("todas-tarefas-item");
                    p.draggable = true;
                    p.id = `todas-tarefas-item-${i}`;
                    p.innerHTML = textoTarefa;
    
                    document.querySelector(".todas-tarefas-container").appendChild(p);
                }
                    
            }

              
        }

        dragAndDrop(); 

        dropAcionadoTodasTarefas = true;
    });

 

};
  
  


/* ====================================================== */
/* =================== CALCULA HORÁRIOS ================= */
/* ====================================================== */


function calculaHorarios (num, index) {  
      
//   console.log(`calculaHorarios (${num}, ${index})`);

    index === 0 ? inicioTarefa = horarioInicial : inicioTarefa = tarefasHoje[index-1].final;
  
    let inicioTarefaTotal = inicioTarefa.split(":");
    let inicioTarefaHoras = Number(inicioTarefaTotal[0]);
    let inicioTarefaMinutos = Number(inicioTarefaTotal[1]);

    let duracaoTotal;
    
    if (num === 1) {
        duracaoTotal = document.getElementById("duracao").value.split(":");
    } else if (num === 2) {
        duracaoTotal = tarefasHoje[index].duracao.split(":"); 
    }
 
    let duracaoHoras = Number(duracaoTotal[0]);
    let duracaoMinutos = Number(duracaoTotal[1]);
        
    formatacaoDuracao(duracaoHoras, duracaoMinutos);

    let horaExtra = 0;

    let somaMinutos = inicioTarefaMinutos + duracaoMinutos;

    if (somaMinutos > 59) {        
        somaMinutos = somaMinutos - 60;
        horaExtra++; 
    }

    let somaHoras = inicioTarefaHoras + duracaoHoras + horaExtra;
    
    if (somaHoras > 23) {
        somaHoras = somaHoras - 24;
    }

    let finalTarefaParcial = [somaHoras.toString().padStart(2, "0"), ":", somaMinutos.toString().padStart(2, "0")];

    finalTarefa = finalTarefaParcial.join("");
  
}


function formatacaoDuracao(duracaoHoras, duracaoMinutos) {
 
    if (duracaoHoras === 0) {
        duracaoString = duracaoMinutos.toString() + "min";
    }
    else {
        if (duracaoMinutos === 0) {
            duracaoString = duracaoHoras.toString() + "h";  
        }
        else {
            duracaoString = duracaoHoras.toString() + "h" + duracaoMinutos.toString() + "min";  
        }
    } 
}
   


/* ====================================================== */
/* ================== ATUALIZA HORÁRIOS ================= */
/* ====================================================== */

function atualizaHorarios () {

//   console.log("atualizaHorarios");

    for (let i = 0; i < tarefasHoje.length; i++) {
        
        // console.log("entrou no for (let i = 0; i < tarefasHoje.length; i++)");

        calculaHorarios (2, i);
        
        tarefasHoje[i].posicao = i; 
        tarefasHoje[i].inicio = inicioTarefa;
        tarefasHoje[i].final = finalTarefa;
          
        document.querySelectorAll(".tarefas-hoje-item")[i].id = `tarefas-hoje-item-${i}`;
 
        let novoTexto = `
            <img class="tarefas-hoje-lixeiras" id="tarefas-hoje-lixeira-${i}" src=${enderecoLixeira}>
            <span class="espacamento">${tarefasHoje[i].inicio}</span>
            <span class="espacamento">${tarefasHoje[i].nome}</span>
            <span class="espacamento">${duracaoString}</span>
        `;

        document.getElementById(`tarefas-hoje-item-${i}`).innerHTML = novoTexto;
 
    }

    document.querySelector(".console").insertAdjacentHTML("beforeend", `${JSON.stringify(tarefasHoje)} <br>`);
    // atualizaLocalStorage(); 
}
 
   
    
/* ====================================================== */
/* ======================= DELETAR ====================== */
/* ====================================================== */


function deletar() {  

    /* ======================= TODAS AS TAREFAS ====================== */
    
    document.querySelectorAll(".todas-tarefas-lixeiras").forEach((lixeira, index) => {
        document.getElementById(`todas-tarefas-lixeira-${index}`).src = "images/delete_transparente.png";
        enderecoLixeira = "images/delete_transparente.png";  
    });
 
    document.querySelectorAll(".todas-tarefas-item").forEach(tarefa => { 
  
        tarefa.addEventListener('mouseenter', function(event) {
            document.getElementById(`todas-tarefas-lixeira-${event.target.id.split("-")[3]}`).src = "images/delete.png";
            enderecoLixeira = "images/delete.png"; 
        });

        tarefa.addEventListener('mouseleave', function(event) {
            document.getElementById(`todas-tarefas-lixeira-${event.target.id.split("-")[3]}`).src = "images/delete_transparente.png";
            enderecoLixeira = "images/delete_transparente.png";  
        });
    });
 
    document.querySelectorAll(".todas-tarefas-lixeiras").forEach(lixeira => {  
        if (!lixeira.classList.contains("click")) {
            lixeira.addEventListener('click', lixeiraClick); 
            lixeira.classList.add("click");
        }
    });
 
    function lixeiraClick (event) {
    
        event.stopPropagation();  

        document.getElementById(`todas-tarefas-item-${event.target.id.split("-")[3]}`).remove();     
 
        document.querySelectorAll(".todas-tarefas-lixeiras").forEach(lixeira => {  
            if (lixeira.classList.contains("click")) { 
                lixeira.removeEventListener('click', lixeiraClick2);
                lixeira.classList.remove("click"); 
                idNovaTarefa = 0;
            }
        });
   
        // deletar();
    }


    /* ======================= TAREFAS DE HOJE ====================== */ 

    document.querySelectorAll(".tarefas-hoje-lixeiras").forEach((lixeira, index) => {
        document.getElementById(`tarefas-hoje-lixeira-${index}`).src = "images/delete_transparente.png";
        enderecoLixeira = "images/delete_transparente.png";  
    });

    document.querySelectorAll(".tarefas-hoje-item").forEach(tarefa => { 
  
        tarefa.addEventListener('mouseenter', function(event) {
            document.getElementById(`tarefas-hoje-lixeira-${event.target.id.split("-")[3]}`).src = "images/delete.png";
            enderecoLixeira = "images/delete.png"; 
        });

        tarefa.addEventListener('mouseleave', function(event) {
            document.getElementById(`tarefas-hoje-lixeira-${event.target.id.split("-")[3]}`).src = "images/delete_transparente.png";
            enderecoLixeira = "images/delete_transparente.png";  
        });
    });
 
    document.querySelectorAll(".tarefas-hoje-lixeiras").forEach(lixeira => {  
        if (!lixeira.classList.contains("click")) {
            lixeira.addEventListener('click', lixeiraClick2); 
            lixeira.classList.add("click");
        }
    });
 
    function lixeiraClick2 (event) {
    
        event.stopPropagation();  

        document.getElementById(`tarefas-hoje-item-${event.target.id.split("-")[3]}`).remove();               
        tarefasHoje.splice(event.target.id.split("-")[3], 1);   
 
        document.querySelectorAll(".tarefas-hoje-lixeiras").forEach(lixeira => {  
            if (lixeira.classList.contains("click")) { 
                lixeira.removeEventListener('click', lixeiraClick2);
                lixeira.classList.remove("click"); 
            }
        });
  
        if (document.querySelector(".tarefa-atual")) {
            document.querySelector(".tarefa-atual").classList.remove("tarefa-atual");
        }

        atualizaHorarios ();
        
        // deletar();
    }
  
} 



/* ====================================================== */
/* ===================== LOCAL STORAGE ================== */
/* ====================================================== */
 

function atualizaLocalStorage () {
          
    window.localStorage.clear();
    window.localStorage.setItem('tarefasLS', JSON.stringify(tarefasHoje));
    window.localStorage.setItem('horarioInicial', JSON.stringify(horarioInicial));
}

 
function downloadLocalStorage() {
 
    if (localStorage.getItem('horarioInicial') != undefined) {   
        document.getElementById("horario-inicial").value = JSON.parse(localStorage.getItem("horarioInicial"));
    }

    if (document.querySelector(".tarefas-hoje-container").childNodes.length === 3 && localStorage.getItem('tarefasLS')) { 
        
        let tarefasLS = JSON.parse(localStorage.getItem('tarefasLS'));
        horarioInicial = JSON.parse(localStorage.getItem("horarioInicial"));
  
        for (let i = 0; i < tarefasLS.length; i++) { 

            tarefasHoje[i] = tarefasLS[i]; 

            let duracaoHoras = Number(tarefasHoje[i].duracao.split(":")[0]);
            let duracaoMinutos = Number(tarefasHoje[i].duracao.split(":")[1]);

            formatacaoDuracao(duracaoHoras, duracaoMinutos);

            let novoTexto = `
            <img class="tarefas-hoje-lixeiras" id="tarefas-hoje-lixeira-${i}" src=${enderecoLixeira}>
            <span class="espacamento">${tarefasHoje[i].inicio}</span>
            <span class="espacamento">${tarefasHoje[i].nome}</span>
            <span class="espacamento">${duracaoString}</span>
            `;
  
            document.querySelector(".tarefas-hoje-container").insertAdjacentHTML("beforeend", `
                <p 
                    class="tarefas-hoje-item animacao-sobe" 
                    draggable="true" 
                    id="tarefas-hoje-item-${i}">
                    ${novoTexto}
                </p>
            `);
        }  
    } 
}



/* ====================================================== */
/* ====================== TAREFA ATUAL ================== */
/* ====================================================== */
 

// function tarefaSelecionada() {
 
//     let alarmeTocou = false;
//     let indexTarefaAtual = -1;
//     setInterval(hora, 1000); 

//     function hora () {  
   
//         tarefasHoje.forEach((tarefa, index) => {
  
//             let horaInicioTarefa = tarefa.inicio.split(":")[0];
//             let minutoInicioTarefa = tarefa.inicio.split(":")[1];
//             let horaFinalTarefa = tarefa.final.split(":")[0];
//             let minutoFinalTarefa = tarefa.final.split(":")[1];
 
//             let horaAtual = new Date().toLocaleTimeString(navigator.language, {hourCycle: 'h23', hour: "numeric", minute: "numeric"});        
//             let hora = horaAtual.split(":")[0];
//             let minutos = horaAtual.split(":")[1]; 
         
//             let horarioAtual = Date.UTC(2022, 10, 15, hora, minutos);
//             let começoTarefa = Date.UTC(2022, 10, 15, horaInicioTarefa, minutoInicioTarefa);
//             let fimTarefa = Date.UTC(2022, 10, 15, horaFinalTarefa, minutoFinalTarefa);
 

//             if (horarioAtual >= começoTarefa && horarioAtual < fimTarefa) {

//                 document.getElementById(`tarefas-hoje-item-${index}`).classList.add("tarefa-atual");
 
//                 indexTarefaAtual = index;

//                 if (alarmeTocou === false) {
                    
//                     let alarme = new Audio('sounds/alarme.mp3');
//                     alarme.volume = 0.05;
//                     alarme.play(); 
                    
//                     alarmeTocou = true;    
//                     // deletar();                    
//                 } 
//             }

//             if (horarioAtual == fimTarefa && index === indexTarefaAtual) {

//                 if (document.querySelector(".tarefa-atual")) {
//                     document.querySelector(".tarefa-atual").classList.remove("tarefa-atual"); 
//                     alarmeTocou = false; 
//                 }
//             } 
        
//         }); 
//     }  
// } 