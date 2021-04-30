//variables for the card deck
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();

var player = [];
var comp = [];

let compScore = 0;
let playerScore = 0;

document.getElementById("start").addEventListener("click", function () {
  getDeck();

  player.push(drawCard());
  player.push(drawCard());
  console.log(player);

  comp.push(drawCard());
  comp.push(drawCard());
  console.log(comp);

  showCards();

  getScore();

  if(playerScore>21){
    compareScore();
  }
});

let playerContent = document.getElementById("players");
let playerDiv = document.getElementById("playersscore");

let reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  playerDiv.innerHTML = " ";
  playerContent.innerHTML = " ";
  player = [];
  comp = [];

  getDeck();
});

document.getElementById("draw").addEventListener("click", function () {
  player.push(drawCard());
  showCards();
  getScore();

  if(playerScore>=21){
    compareScore();
  }

 
});

document.getElementById("hold").addEventListener("click", function () {
  getScore();

  compareScore();
});

// creates the deck
function getDeck() {
  deck = new Array();
  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var realval = parseInt(values[i]);
      if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
        realval = 10;
      if (values[i] == "A") realval = 11;
      var card = { value: values[i], suit: suits[x], realval: realval };
      deck.push(card);
    }
  }
  return deck;
}


//draw a card
function drawCard() {
  let randpos = Math.floor(Math.random() * deck.length);
  let randcard = deck[randpos];
  return randcard;
}

function showCards() {
  let returnString = "";
  player.forEach((card) => {
    returnString += card.value + " ";
  });
  playerContent.innerHTML = returnString;
}

function getScore() {
  let score = 0;
  player.forEach((card) => {
    score += parseInt(card.realval);
  });
  playerScore = score;
  playerDiv.innerHTML = score;
}

function getcompScore() {
  let score = 0;
  comp.forEach((card) => {
    score += parseInt(card.realval);
  });
  compScore = score;
}


function compareScore() {
  getcompScore();

  if (compScore == 21) {
    alert("Computer has 21! You lost");
  }

  while (compScore < 17) {
    comp.push(drawCard());
    getcompScore();
  }

  if (compScore > 21) {
    if (playerScore > 21) {
      alert("No winner! Computer score: " + compScore + " Your score: " + playerScore);
    } else {
      alert("You won! Computer score: " + compScore);
    }
  } else if (compScore > playerScore) {
      alert(
        "Computer won! You lost. More luck next time! Computer score was " +
          compScore +
          " and yours was " +
          playerScore
      );
    
  } else {
    if (playerScore > 21) {
      alert("You lost. Your score is: " + playerScore + " Computer score: " + compScore);
    } else if (compScore == playerScore) {
      alert("It's a tie! Computer score: " + compScore);
    } else {
      alert("You won! Comp score: " + compScore);
    }
  }

  console.log("player score" + playerScore);
  console.log("comp score" + compScore);
}

