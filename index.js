
/* ====================================================== */
/* ====================== VARIAVEIS ===================== */
/* ====================================================== */

let sequenciaJogo = [];
let sequenciaJogador1 = [];
let sequenciaJogador2 = [];
let start = 0;                      // Impede que o jogador possa pressionar teclas após o início do jogo
let round = 0; 
let click = 0;          
let recordJogador1 = 0;              
let recordJogador2 = 0;     
let jogador = 1;                    // Jogador da vez.   1 = jogador 1     2 = jogador 2
let qntJogadores;
let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2"; 
let cont = 0;                       // Impede que Game Over seja acionado mais de uma vez
 


/* ====================================================== */
/* ============== SELEÇÃO 1 OU 2 PLAYERS ================ */
/* ====================================================== */

$(".um-player").click(function(){

    qntJogadores = 1;
   
    $(".um-player").css("display", "none"); 
    $(".dois-players").css("display", "none"); 

    $(".tamara").css("display", "none"); 

    $(".qnt-jogadores").css("display", "none"); 

    $(".jogo").css("display", "revert"); 
       
    $("h1").html("Aperte Play"); 
 
    $(".record-jogador-1").html(nomeJogador1);  
    $(".record-jogador-1").css("opacity", "1"); 
    $(".record-jogador-2").css("display", "none"); 
    $(".records").css("justify-content", "center"); 

    setTimeout(() => {
        startGame(); 
    }, 350);
});


$(".dois-players").click(function(){

    qntJogadores = 2;
    $(".um-player").css("display", "none"); 
    $(".dois-players").css("display", "none"); 
 
    if ("ontouchstart" in document.documentElement) {
        
        $(".tamara").css("display", "none"); 
    } 

    nomes();
});



/* ====================================================== */
/* ================ NOMES DOS JOGADORES ================= */
/* ====================================================== */


function nomes() {
   
    if (window.innerWidth < 850) {         
        $(".qnt-jogadores").html('<span style="white-space: nowrap;">Nome do</span> <span style="white-space: nowrap;">Jogador 1</span> <span style="white-space: nowrap;"></span');  
    }
    else {
        $(".qnt-jogadores").html('Digite o nome do <span style="white-space: nowrap;">Jogador 1</span> <span class="pressione-enter">e pressione Enter</span>');
    }
  
    let contador = 0;

    
    if (!("ontouchstart" in document.documentElement)) {
         
        window.addEventListener('resize', function() { 
            if (round === 0 && contador === 0) {      // Impede que a página seja recarregada após Jogador 1 já ter colocado o nome, e após o jogo já ter iniciado
                window.location.reload(); 
                contador++;
            }        
        }); 
    } 

    $("#nome-jogador-1").css("display", "revert"); 

    $("#nome-jogador-1").keypress(function(event) {        

        if (event.key === "Enter") { 
 

            if (document.getElementById("nome-jogador-1").value !== "" && document.getElementById("nome-jogador-1").value !== " ") {
                nomeJogador1 = document.getElementById("nome-jogador-1").value;  
            }

            contador++;

            $(".record-jogador-1").text(nomeJogador1 + ": -"); 
            $(".record-jogador-1").css("opacity", "1"); 

            $("#nome-jogador-1").css("display", "none");     

            if (window.innerWidth < 850) {                 
                $(".qnt-jogadores").html('<span style="white-space: nowrap;">Nome do</span> <span style="white-space: nowrap;">Jogador 2</span> <span style="white-space: nowrap;"></span');  
            }
            else {
                $(".qnt-jogadores").html('Digite o nome do <span style="white-space: nowrap;">Jogador 2</span> <span class="pressione-enter">e pressione Enter</span>');
            }
            
            $("#nome-jogador-2").css("display", "revert");  
        }  
    });


    $("#nome-jogador-2").keypress(function(event) {     

        if (event.key === "Enter") { 

            if (document.getElementById("nome-jogador-2").value !== "" && document.getElementById("nome-jogador-2").value !== " ") {
                nomeJogador2 = document.getElementById("nome-jogador-2").value;  
            }            

            $(".record-jogador-2").text(nomeJogador2 + ": -");  
            $(".record-jogador-2").css("opacity", "1"); 

            $(".qnt-jogadores").css("display", "none"); 

            $("#nome-jogador-2").css("display", "none");    

            $(".tamara").css("display", "none"); 

            $(".jogo").css("display", "revert"); 
             
            $("h1").html("Aperte Play"); 

            vezDeQuem(); 

            setTimeout(() => {
                startGame();
            }, 350);
        }
    });
 
}

  

/* ====================================================== */
/* ========= DEFINE DE QUEM É A VEZ DE JOGAR ============ */
/* ====================================================== */


function vezDeQuem () {
    
    if (qntJogadores === 1) { 
        $(".go").css("opacity", "0"); 
    }

    if (qntJogadores === 2) {
        $(".vez").css("display", "revert");  
        
        if (jogador === 1) {            
            $(".vez").text(nomeJogador1 + ", sua vez!"); 
        }
        if (jogador === 2) {            
            $(".vez").text(nomeJogador2 + ", sua vez!"); 
        } 
  
    }
}



/* ====================================================== */
/* =================== INÍCIO DO JOGO =================== */
/* ====================================================== */

function startGame () {  

    audioSemDelay();

    $(".play-btn").click(function(){
        if (start === 0) {
            primeiroRound();
        }
    });

}



/* ====================================================== */
/* =================== PRIMEIRO ROUND =================== */
/* ====================================================== */


function primeiroRound() { 
 
    cont = 0;
     
    $(".go").css("opacity", "0"); 

    $(".vez").css("display", "none");   
     
    $(".play-btn").css("display", "none");   

    start++;
    round++; 

    $("h1").text("Round " + round);
  
    $(".go").css("opacity", "1"); 

    let number = Math.floor((Math.random() * 4) + 1);

    sequenciaJogo.push(number);  

    animation(number);  
  
    clickedButton(); 
}    
  


/* ====================================================== */
/* ======================== BOTÕES ====================== */
/* ====================================================== */


function clickedButton () {   

    $(".green").click(function() {  
 
        if (jogador === 1 ) {

            if (sequenciaJogador1.length === 0) {
                click = 0;
            }

            if (click < round) {  // Impede que o jogador possa clicar e acionar a animação a qualquer momento 
    
                sequenciaJogador1.push(1);    

                comparador(sequenciaJogo, sequenciaJogador1, click, 1);  

                click++;   
            }  
        }

        if (jogador === 2 ) {

            if (sequenciaJogador2.length === 0) {
                click = 0;
            }

            if (click < round) {   
    
                sequenciaJogador2.push(1);    

                comparador(sequenciaJogo, sequenciaJogador2, click, 1);  

                click++;   
            }  
        }

    });
 
    
    $(".red").click(function() {  

        if (jogador === 1 ) {

            if (sequenciaJogador1.length === 0) {
                click = 0;
            }

            if (click < round) {  
    
                sequenciaJogador1.push(2);  
    
                comparador(sequenciaJogo, sequenciaJogador1, click, 2);  

                click++;   
            }
        }


        if (jogador === 2 ) {

            if (sequenciaJogador2.length === 0) {
                click = 0;
            }

            if (click < round) {  
    
                sequenciaJogador2.push(2);  
    
                comparador(sequenciaJogo, sequenciaJogador2, click, 2);  

                click++;   
            }
        }



    });


    $(".yellow").click(function() { 

        if (jogador === 1) {
            
            if (sequenciaJogador1.length === 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador1.push(3);  

                comparador(sequenciaJogo, sequenciaJogador1, click, 3);  

                click++;  
            }
        }

        if (jogador === 2) {
            
            if (sequenciaJogador2.length === 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador2.push(3);  

                comparador(sequenciaJogo, sequenciaJogador2, click, 3);  

                click++;  
            }
        }
    });


    $(".blue").click(function() { 

        if (jogador === 1) {

            if (sequenciaJogador1.length === 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador1.push(4);    
            
                comparador(sequenciaJogo, sequenciaJogador1, click, 4);  

                click++;  
            }
        }

        if (jogador === 2) {
            
            if (sequenciaJogador2.length === 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador2.push(4);    
            
                comparador(sequenciaJogo, sequenciaJogador2, click, 4);  

                click++;  
            }
        }
    }); 
}
   


/* ====================================================== */
/* === COMPARA SEQUÊNCIA DO JOGO X SEQUÊNCIA JOGADOR ==== */
/* ====================================================== */


function comparador (jogo, jogador, click, cor) {    

        if (jogo[click] === jogador[click]) {

            animation(cor);

            if (click === jogo.length-1) { 

                setTimeout(() => {            
                    $(".go").css("opacity", "0"); 
                }, 600 );  
                

                setTimeout(() => {            
                    proximosRounds(); 
                }, 1000 );  
            }  
        } 

        else {
            animation(5); 
        } 
} 
 
 

/* ====================================================== */
/* ====================== ANIMAÇÕES ===================== */
/* ====================================================== */


function animation (number) { 
    
    if (number === 5 && cont === 1) {
        number = 6;
    }

    if (number === 5 && cont === 0) {
        cont = 1;
    }

    switch (number) {

        case 1: 
            let green = new Audio('sounds/green.mp3');
            green.play();     
 
            $(".green").css("background-color", "#198d19");  

            setTimeout(() => { 
                $(".green").css("background-color", "#093109");  
            }, 350);

            break;

        case 2: 
            let red = new Audio('sounds/red.mp3');
            red.play();    
 
            $(".red").css("background-color", "#ff0000"); 

            setTimeout(() => { 
                $(".red").css("background-color", "#590000"); 
            }, 350);

            break;

        case 3: 
            let yellow = new Audio('sounds/yellow.mp3');
            yellow.play();    
              
            $(".yellow").css("background-color", "#d9d915"); 
            
            setTimeout(() => { 
                $(".yellow").css("background-color", "#80800d"); 
            }, 350);

            break;
 
        case 4: 
            let blue = new Audio('sounds/blue.mp3');
            blue.play();  
              
            $(".blue").css("background-color", "#1919ff"); 

            setTimeout(() => { 
                $(".blue").css("background-color", "#0d0d80"); 
            }, 350);
            break;

        case 5: 
         
            $(".go").css("opacity", "0"); 
            
            sequenciaJogo.length = 0;  
            sequenciaJogador1.length = 0; 
            sequenciaJogador2.length = 0; 

            let wrong = new Audio('sounds/wrong.mp3'); 

            $("body").css("background-color", "red");

            setTimeout(() => {
                $("body").css("background-color", "#011F3F");
            }, 350);

            wrong.play();   
             
            $(".green").off();
            $(".red").off();
            $(".yellow").off();
            $(".blue").off();
            
            $(".go").css("opacity", "0");    // Garante que o X não sobreponha o GO
            $("h1").text("Game Over");  
            $(".x").css("opacity", "1"); 

            setTimeout(() => { 

                switch (jogador) {

                    case 1:  

                        if (round-1 > recordJogador1) {
                            recordJogador1 = round-1;
                        }
                            
                        if (recordJogador1 === 0 || recordJogador1 === 1) { 
                            $(".record-jogador-1").html(nomeJogador1 + ': <span style="white-space: nowrap;">' + recordJogador1 + ' round</span>'); 
                        }
                        else { 
                            $(".record-jogador-1").html(nomeJogador1 + ': <span style="white-space: nowrap;">' + recordJogador1 + ' rounds</span>'); 
                        }
                        
                        $(".record-jogador-1").css("opacity", "1");  
                        
                        $(".play-btn").css("display", "revert"); 
                        
                        if (qntJogadores === 1) { 
                            $(".records").css("justify-content", "center"); 
                            $(".records").css("gap", "0"); 
                        }

                        if (qntJogadores === 2) {
                            jogador = 2;
                        }

                        break;
                    

                    case 2:

                        if (round-1 > recordJogador2) { 
                            recordJogador2 = round-1; 
                        }  
                        
                        if (recordJogador2 === 0 || recordJogador2 === 1) { 
                            $(".record-jogador-2").html(nomeJogador2 + ': <span style="white-space: nowrap;">' + recordJogador2 + ' round</span>'); 
                        }
                        else { 
                            $(".record-jogador-2").html(nomeJogador2 + ': <span style="white-space: nowrap;">' + recordJogador2 + ' rounds</span>'); 
                        } 
                        
                        
                        $(".record-jogador-2").css("opacity", "1"); 
                        
                        $(".play-btn").css("display", "revert"); 

                        if (qntJogadores === 2) {
                            jogador = 1;
                        }
                        
                        break;

                        default: 
                          console.log("default1");
                        break;
                }
  
                start = 0;       
                round = 0; 
                click = 0;  
 
                $(".go").css("opacity", "0"); 
                $(".x").css("opacity", "0");  
                $("h1").html("Aperte Play");

                vezDeQuem(); 

            }, 1500);  
   
            break;
            
            default: 
                console.log("default2");
            break;
    }
}



/* ====================================================== */
/* ======================= ROUNDS ======================= */
/* ====================================================== */


function proximosRounds() {    
 
    $(".go").css("opacity", "0"); 
 
    round++; 
    click = 0;
    
    $("h1").text("Round " + round);   

    let number = Math.floor((Math.random() * 4) + 1); 

    sequenciaJogo.push(number);  

    sequenciaJogador1.length = 0; 
    sequenciaJogador2.length = 0; 

    for (let i = 0; i < sequenciaJogo.length; i++) {

        setTimeout(() => {
            animation(sequenciaJogo[i]);  

            if (i === sequenciaJogo.length-1) { 

                setTimeout(() => {  
                    $(".go").css("opacity", "1"); 
                }, 600);  
            }

        }, 650 * (i+1));  
    }
      
}
 


/* ====================================================== */
/* ========= REMOVE AUDIO DELAY NO DESKTOP ============== */
/* ====================================================== */


function audioSemDelay() {
    
    let yellow = new Audio('sounds/yellow.mp3');
    yellow.volume = 0.0001;
    yellow.play() 
    
    let green = new Audio('sounds/yellow.mp3');
    green.volume = 0.0001;
    green.play()
    
    let blue = new Audio('sounds/yellow.mp3');
    blue.volume = 0.0001;
    blue.play()
    
    let red = new Audio('sounds/yellow.mp3');
    red.volume = 0.0001;
    red.play()
}