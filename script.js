const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//Funções para Vierar os Cards
function flipCard() {

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkFOrMatch();
}

//funções que checa cards são iguais

function checkFOrMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();

}

//Função de desabilita as cards
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', firstCard);

    resetBoard();

}

//função que desvira os cards

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();

    }, 1500);
}

//função que reseta o tabuleiro

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha os cards

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() *12);
        card.style.order = ramdomPosition;
    })
})();



//Evento de CLique no card
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})