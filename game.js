const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: null,
    aiHand: null
}
const btn = document.querySelector('.start');
const hands = [...document.querySelectorAll('.select img')];

function computerSelection(){
    option = ['papier', 'kamień', 'nożyczki']
    game.aiHand = option[Math.floor( Math.random()*option.length )]
}


function fight(ai, player){
    if (ai === player){
        return -1; //remis
    }else if ((player === "kamień" && ai == "nożyczki") || (player == "papier" && ai == "kamień") || (player == "nożyczki" && ai == "papier")){
        return 1; //wygrana
    }else{
        return 0; //przegrana
    }
}

function handsSelection(){
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';
}

function gamesResult(result){
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiHand;
    resultMsg = document.querySelector('[data-summary="who-win"]')
    if (result == 1){
        resultMsg.textContent = "WYGRANA";
        gameSummary.wins += 1;
    }else if (result == 0){
        resultMsg.textContent = "Przegrana";
        gameSummary.losses += 1;
    }else{
        resultMsg.textContent = "Remis";
        gameSummary.draws += 1;
    }
}

function showResults(){
    document.querySelector('.numbers2').textContent = gameSummary.numbers;
    document.querySelector('.wins').textContent = gameSummary.wins;
    document.querySelector('.losses').textContent =  gameSummary.losses;
    document.querySelector('.draws').textContent =  gameSummary.draws;
}

function reset(){
    hands.forEach(hand => hand.style.boxShadow = '');
    game.playerHand = null;
}

function startGame(){
    if (!game.playerHand){alert("Nie wybrano łapki :C ");
    }else{
        gameSummary.numbers +=1;
        computerSelection();
        result = fight(game.aiHand, game.playerHand);
        gamesResult(result);
        showResults();
        reset();
    }
}

hands.forEach(hand => hand.addEventListener('click', handsSelection))
btn.addEventListener('click', startGame);