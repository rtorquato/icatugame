const select = (c) => document.querySelector(c);
const selectA = (c) => document.querySelectorAll(c);

select('#jogar').addEventListener('click',startIntro);

let currentStep = 0;
const index = 0;

function introLoading() {
    select('#loading-bar').classList.add('animate-loading');
    setTimeout(()=>{
        select('#intro-area').style.opacity = '0';
        setTimeout(()=>{
            select('#intro-area').remove();
            currentStep++;
            startGame();
        },200);
    },4000);
}

function startIntro() {
    select('#replace-content-intro').style.opacity = '0';
    setTimeout(()=>{
        select('#title-intro').innerHTML = intro[index].title;
        select('#subtitle-intro').innerHTML = intro[index].subtitle;
        select('#icon-intro-1').innerHTML = `<img src="img/${intro[index].icons.a}" alt="">`;
        select('#icon-intro-2').innerHTML = `<img src="img/${intro[index].icons.b}" alt="">`;
        select('#icon-intro-3').innerHTML = `<img src="img/${intro[index].icons.c}" alt="">`;
        select('#loading').innerHTML = intro[index].loading;
        select('#jogar').remove();
        setTimeout(()=>{
            select('#replace-content-intro').style.opacity = '1';
            introLoading();
        },500);
    },500);
}

const board = `
<div id="game" class="tela flex flex-col justify-start items-center bg-[url(../img/bg-game.jpg)] bg-cover relative">
    <div id="life" class="absolute left-10 top-10 w-5/12">
        <div id="lifebar" class="w-full h-24 relative overflow-hidden border-4 border-white rounded-full bg-transparent isolate transition-all duration-500">
            <div id="lifebarcount" class="absolute h-24 -top-1 left-0 bg-[#499f53] transition-all duration-300 -z-10"></div>
        </div>
        <div class="w-11/12 mt-2"><p class="text-[3rem] text-center text-white font-normal italic leading-[3rem] tracking-normal">Jogador Icatu</p></div>
    </div>
    <div id="score">
        <div id="points" class="absolute right-10 top-10 w-4/12">
            <div id="points-count"><p class="text-[18rem] text-right text-white font-black italic leading-[14rem] tracking-normal transition-all duration-500">00</p></div>
            <p class="text-[5rem] text-right text-white font-normal italic leading-[5rem] tracking-normal">Pontos</p>
        </div>
    </div>
    <div id="questions" class="absolute top-[20%] w-[100%] max-w-[75%] border-4 border-[#1c2b5d]/25 rounded-[3rem] bg-white/50 flex flex-col justify-center items-center">
        <div id="current-question" class="w-auto py-4 px-7 mx-auto">
            <p class="text-[2rem] text-center font-bold text-[#1c2b5d]">A Icatu é selo ouro na Insurance Experience 2024 e te dá muito mais vantagens. Você sabia?</p>
        </div>
        <div id="answers" class="w-full flex flex-row justify-center items-center pb-4 px-8 gap-[3rem]">
            <div id="yes" data-option="0" class="w-[20%] border-8 border-[#1c2b5d]/25 bg-white/50 cursor-pointer flex flex-col justify-center items-center rounded-[3rem]"><p class="pointer-events-none text-[2rem] text-center font-bold text-[#1c2b5d]">sim</p></div>
            <div id="no" data-option="1" class="w-[20%] border-8 border-[#1c2b5d]/25 bg-white/50 cursor-pointer flex flex-col justify-center items-center rounded-[3rem]"><p class="pointer-events-none text-[2rem] text-center font-bold text-[#1c2b5d]">não</p></div>
        </div>
    </div>
    <div id="surprise-answer" class="w-[20%] h-[12%] absolute top-[48%] left-[42%]">
        <div id="surprise-box" class="w-[100%] h-[94%] flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0 border-4 border-[#f7cc46] rounded-[3rem] isolate">
            <img id="surprise" class="absolute w-[100%] h-[104%] -top-1 left-0 z-40" src="img/surprise.png" alt="">
            <img id="stars" class="absolute w-[100%] top-0 left-[-6.75px] -z-10 opacity-0" src="img/stars.png" alt="">
            <img id="bomb" class="absolute w-[80%] top-0 left-[8-.375px] -z-10 opacity-0" src="img/bomb.png" alt="">
            <img id="explosion" class="absolute w-[100%] top-0 left-[-37.625px] -z-10 opacity-0" src="img/explosion.png" alt="">
            <p id="surprise-content" class="text-[1.4rem] leading-[1.5rem] px-1 text-white font-bold text-center">Com a Icatu, você tem mais benefícios na Insurance Experience 2024.</p>
        </div>
    </div>
    <div id="character" class="absolute overflow-hidden w-[18.875rem] max-w-[18.875rem] top-[48.4%] left-[10%] scale-[1.3] translate-y-1/4 transition-all duration-150 z-50">
        <div id="boneco" class="bg-[url(../img/character.png)] w-[100%] h-[560px]"></div>
        
    </div>
</div>
`;

let wrongAnswers = 0;
let correctAnswers = 0;
let currentQuestion = 0;
let pointscounter = 0;
let lifepercentage = 100;
select('#game-over').style.opacity = '0';

const endboard = `
<div id="end-area" class="tela bg-[url(../img/bg.jpg)] bg-cover bg-center transition-all duration-500">
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-full py-20 flex flex-col justify-center items-center">
            <img class="mx-auto w-[70%]" src="img/game-over.png" alt="Game Over">
        </div>
        <div id="replace-content-intro" class="transition-all duration-500 h-3/5">
            <div class="w-[90%] mx-auto flex flex-col justify-center">
                <p id="intro-gameover" class="text-[3.25rem] text-white font-extralight italic leading-[3.40rem] py-14"></p>
                <p id="subtitle-gameover" class="text-[3.25rem] text-white font-extralight italic leading-[3.40rem] pb-6"></p>
            </div>
            <div id="icons-gameover" class="w-[90%] mx-auto flex justify-center flex-row items-center gap-5 pt-20 pb-6">
                <div id="icon-gameover-1" class="flex-1 flex justify-center"></div>
                <div id="icon-gameover-2" class="flex-1 flex justify-center"></div>
                <div id="icon-gameover-3" class="flex-1 flex justify-center"></div>
            </div>
            <div class="w-[90%] mx-auto flex justify-center">
                <p id="after-gameover" class="text-[3.25rem] text-white font-extralight italic leading-[3.40rem] pt-6"></p>
            </div>
            <div id="jogar" class="w-[80%] mx-auto py-8 cursor-pointer">
                <img class="pointer-events-none mx-auto" src="img/novojogo.png" alt="Jogar">
            </div>
        </div>
    </div>
</div>
`;

function gameOver() {
    select('#game-area').style.opacity = '0';
    setTimeout(()=>{
        select('#game-area').remove();
        select('#game-over').innerHTML = endboard;
        setTimeout(()=>{
            select('#intro-gameover').innerHTML = end[index].title;
            select('#subtitle-gameover').innerHTML = end[index].subtitle;
            select('#after-gameover').innerHTML = end[index].after;
            select('#icon-gameover-1').innerHTML = `<img src="img/${intro[index].icons.a}" alt="">`;
            select('#icon-gameover-2').innerHTML = `<img src="img/${intro[index].icons.b}" alt="">`;
            select('#icon-gameover-3').innerHTML = `<img src="img/${intro[index].icons.c}" alt="">`;
            setTimeout(()=>{
                select('#game-over').style.opacity = '1';
                select('#end-area #jogar').addEventListener('click',()=>{
                    location.reload();
                });
            },500);
        },500);
    },500);
}

const finnishboard = `
<div id="finnish-area" class="tela bg-[url(../img/bg.jpg)] bg-cover bg-center transition-all duration-500">
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-full py-20 h-2/5 flex flex-col justify-center items-center">
            <div class="w-[90%] mx-auto">
                <p id="intro-finnish" class="text-[4rem] text-center text-white font-bold italic leading-[4.2rem] pt-20 pb-14">Parabéns por completar o</p>
            </div>
            <img class="w-[100%] max-w-[90%]" src="img/logo.png" alt="Icatu Game">
        </div>
        <div id="replace-content-intro" class="w-[100%] transition-all duration-500 ">
            <div class="w-[90%] mx-auto flex justify-center">
                <p id="subtitle-finnish" class="text-[4rem] text-white font-extralight italic leading-[4.25rem] py-14"><span class="font-bold">Você</span> mostrou um excelente<br> entendimento dos <span class="font-bold">benefícios exclusivos oferecidos a você pela Icatu na Insurance Experience 2024!</span></p>
            </div>
            <div class="w-[90%] mx-auto flex justify-center">
                <p id="after-finnish" class="text-[4rem] text-white font-extralight italic leading-[4.25rem]"><span class="font-bold">Retire seu brinde*</span> e continue<br> <span class="font-bold">ampliando seu Horizonte</span> com a parceria da Icatu!</p>
            </div>
            <div id="jogar" class="w-full py-8 cursor-pointer">
                <img class="pointer-events-none mx-auto" src="img/novojogo.png" alt="Novo jogo">
            </div>
        </div>
    </div>
</div>
`;

function finnishGame() {
    select('#game-area').style.opacity = '0';
    setTimeout(()=>{
        select('#game-area').remove();
        select('#finnish').innerHTML = finnishboard;
        setTimeout(()=>{
            select('#intro-finnish').innerHTML = win[index].title;
            select('#subtitle-finnish').innerHTML = win[index].subtitle;
            select('#after-finnish').innerHTML = win[index].after;
            setTimeout(()=>{
                select('#finnish').style.opacity = '1';
                select('#finnish-area #jogar').addEventListener('click',()=>{
                    location.reload();
                });
            },500);
        },500);
    },500);
}

function startGame() {
    if(questions[currentQuestion]) {
        select('#game-area').innerHTML = board;
        select('#game').style.backgroundPosition = 'left 0px top 0px';
        setTimeout(()=>{
            select('#game-area').style.opacity = '1';
        },500);
        let yes = select('#yes');
        let no = select('#no');
        select('#lifebarcount').style.width = '100%';
        if(lifepercentage<100) {
            select('#lifebarcount').style.width = `${lifepercentage}%`;
            if(lifepercentage<43) {
                select('#lifebarcount').classList.remove('bg-[#499f53]');
                select('#lifebarcount').style.backgroundColor = '#d78c8e';
            }
        }
        if(pointscounter<=60) {
            select('#points-count').style.opacity = '0';
            setTimeout(()=>{
                select('#points-count p').innerHTML = pointscounter < 10 ? `0${pointscounter}` : pointscounter;
                select('#points-count').style.opacity = '1';
            },500);
        }
        if(wrongAnswers>=3) {
            select('#lifebarcount').style.width = '0%';
            setTimeout(()=>{
                gameOver();
            },500);
        }
        switch(currentQuestion) {
            case 0:
            select('#game').style.backgroundPosition = 'left 0px top 0px';
            break;
            case 1:
            select('#game').classList.add('animate-background-1');
            break;
            case 2:
            select('#game').classList.add('animate-background-2');
            break;
            case 3:
            select('#game').classList.add('animate-background-3');
            break;
            case 4:
            select('#game').classList.add('animate-background-4');
            break;
            case 5:
            select('#game').classList.add('animate-background-5');
            break;
        };
        let question = select('#current-question p');
        question.innerHTML = questions[currentQuestion].question;
        for(let i in questions[currentQuestion].options) {
            if(i==='sim') {yes.innerHTML = questions[currentQuestion].options[i]} else if(i==='Icatu') {yes.innerHTML = questions[currentQuestion].options[i]}
            if(i==='não') {no.innerHTML = questions[currentQuestion].options[i]} else if(i==='não sei') {no.innerHTML = questions[currentQuestion].options[i]}
        }
        yes.addEventListener('click',(e)=>{
            select('#surprise').style.opacity = '0';
            select('#surprise-content').style.opacity = '1';
            select('#stars').classList.add('animate-stars');
            select('#boneco').classList.add('animate-character');
            select('#no').classList.add('blockEvent');
            
            e.target.classList.add('animate-yes');
            select()
            setTimeout(()=>{
                answer(e);
                e.target.classList.remove('animete-yes');
                setTimeout(()=>{
                    select('#surprise').style.opacity = '1';
                    select('#stars').classList.remove('animate-stars');
                },1000);
            },5000);
        });
        no.addEventListener('click',(e)=>{
            select('#yes').classList.add('blockEvent');
            select('#surprise-content').style.opacity = '0';
            select('#surprise').style.opacity = '0';
            select('#bomb').classList.add('animate-bomb');
            select('#boneco').classList.add('animate-character');
            select('#explosion').classList.add('animate-explosion');
            e.target.classList.add('animate-no');
            setTimeout(()=>{
                answer(e);
                e.target.classList.remove('animete-no');
                setTimeout(()=>{
                    select('#surprise').style.opacity = '1';
                    select('#bomb').classList.remove('animate-bomb');
                    select('#explosion').classList.remove('animate-explosion');
                },1000);
            },5000);
        });
    } else {
        finnishGame();
    }
}

function answer(e) {
    let dataoption = Number(e.target.getAttribute('data-option'));
    if(questions[currentQuestion].answer===dataoption) {
        correctAnswers++;
        pointscounter += 10;
    }
    if(questions[currentQuestion].answer!==dataoption) {
        wrongAnswers++;
        lifepercentage -= Math.ceil(100/3);
    }
    currentQuestion++;
    startGame();
}