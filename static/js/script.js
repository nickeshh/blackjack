// challenge 1
// Your Age in Days

function ageInDays() {
    var birthday = prompt("what year you were you born ?");
    var ageInDayss = (2020 - birthday) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset() {
    document.getElementById('ageInDays').remove();
}


// challenge 2 
// Cat Generator 

function generateCat() {
    var image = document.createElement("img");
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}


// challenge RPS

// we make a click function which will called when clickec in a img

function rpsGame(yourChoice) {

    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numToChoice(randomToRpsInt());  // one ID is called randomly 
    // console.log('computer choice :', botChoice);

    result = decideWinner(humanChoice, botChoice);  // array of {1,0} 0r {0,1} or {0.5, 0.5}
    // console.log(result);

    message = finalMessage(result); //it should be object as : {'message': 'you win', 'color':'green' }  
    // console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);  // it remove all img and show final result with message

}

//to generate randon number 
// console.log(Math.floor(Math.random() * 3));  // to generate a random of 0,1 or 2
function randomToRpsInt() {
    return Math.floor(Math.random() * 3);
}
// to choose item from that randomly generated number
function numToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

// this is condition to choose the winner 
// it can be done with if else condition but we have to write 9 conditions
// So we made a object to output the result in array form
// yourChoice is fixed as we clicked 
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 },
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice]

    return [yourScore, computerScore];
}

// we return a message and color attribute in object type form aka JSON type
// here the parameters are given from above function so the value of parameter are defined 
// there is simple 3 condition of {0,1} {1,0} and {0.5,0.5} so we use if else condition
function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You won!', 'color': 'green' };
    }
}

// to show the final message in front End
function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage) {
    var imgDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // let remove all the img 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    //create Div for all the result 
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    // insert inner HTML in those div
    humanDiv.innerHTML = "<img src='" + imgDatabase[humanImgChoice] + "' style='box-shadow: 0px 5px 20px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h2 style='color:" + finalMessage['color'] + "; padding:25px; font-size:50px;'>" + finalMessage['message'] + "</h2>";
    botDiv.innerHTML = "<img src='" + imgDatabase[botImgChoice] + "' style='box-shadow: 0px 5px 20px rgba(243, 38, 24, 1);'>";

    // show those HTML in frontend with append
    document.getElementById('flex-box-rps-div').append(humanDiv);
    document.getElementById('flex-box-rps-div').append(messageDiv);
    document.getElementById('flex-box-rps-div').append(botDiv);

}

//challenge 4: change all the button color

var allButton = document.getElementsByTagName('button');

var copyAllButton = [];
for (let i = 0; i < allButton.length; i++) {
    copyAllButton.push(allButton[i].classList[1]);
}


function buttonColorChange(buttonThing) {
    if (buttonThing.value === 'red') {
        buttonRed();
    } else if (buttonThing.value === 'green') {
        buttonGreen();
    } else if (buttonThing.value === 'reset') {
        buttonReset();
    } else if (buttonThing.value === 'random') {
        buttonRandom();
    }
}

function buttonRed() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}
function buttonReset() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButton[i]);
    }
}

function buttonRandom() {
    var choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger', 'btn-secondary', 'btn-dark']

    for (let i = 0; i < allButton.length; i++) {
        var randomNumber = Math.floor(Math.random() * 6);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(choices[randomNumber]);
    }

}



// challenge 5 : Blackjack

let blackjackGame = {
    'you': { 'scoreSpan': '#your-score-status', 'div': '#your-score-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-score-status', 'div': '#dealer-score-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,


};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener("click", blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener("click", blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return (blackjackGame['cards'][randomIndex]);
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21, add 11. Otherwise add 1.
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-score-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-score-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-score-status').textContent = 0;
        document.querySelector('#dealer-score-status').textContent = 0;

        document.querySelector('#your-score-status').style.color = '#fff';
        document.querySelector('#dealer-score-status').style.color = '#fff';

        document.querySelector('#game-status').textContent = "let's play";
        document.querySelector('#game-status').style.color = 'black';

        blackjackGame['turnsOver'] = true;


    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);

}


// compute  winner and return who win the game

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer bust but you're score is less than 21

        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

        // condition if your score and Dealer score is same 
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;

        // condition if your score is less than dealer and dealer isnt bust
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    }

    return winner;
}

// you win message and sound
function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (YOU === winner) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win !';
            messageColor = 'green';
            winSound.play();

        } else if (DEALER === winner) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You Lost !";
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew !';
            messageColor = 'black';
        }

        document.querySelector('#game-status').textContent = message;
        document.querySelector('#game-status').style.color = messageColor;
    }
}
