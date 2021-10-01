/**
 * GAME RULES
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gest added to his ROUND score
- BUT, if the player rolls a 1, all his round scores get lost. After that it is the next player's turn.
- The player can choose to 'HOLD, which means his round score is added to hisd "GLOBAL score". After that, 
it is the next player's turn
- The first player to reach 100 points on GLOBAL scores wins the game
 */

//declare the basic variables

var scores, roundScore, activePlayer, isGameOver
    //initialise variables
init()


//console.log(dice)
//The document object gives us access to manipulate the DOM
//select the 'current-0' id in html and asign the bvalue of the dice to it with 'textContent'
//document.querySelector('#current-' + activePlayer).textContent = dice

//modify the html tag
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

//read element from the DOM
// var x = document.querySelector('#score-0').textContent
// console.log(x)



//Callback function. It is called when something else happens
// function btn() {
//     //do something

// }
document.querySelector('.btn-roll').addEventListener('click', function() {
        if (isGameOver) {

            return
        }
        //do something
        //1. we need random number
        var dice = Math.floor(Math.random() * 6) + 1 //returns a numberfrom 1 to 6

        //2. Dsiplay the result
        var diceDOM = document.querySelector('.dice')
            //change display to block
        diceDOM.style.display = 'block'
            //change the image with the 'src' attribute
        diceDOM.src = 'dice-' + dice + '.png'



        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //add score to the present roundScore value and save it on roundScore
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            //Next player
            nextPlayer()

        }

    })
    //set event listener for btn-hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameOver) {

        return
    }
    //Add current score to global score
    scores[activePlayer] += roundScore





    //Check if player won the game
    if (scores[activePlayer] >= 100) {
        isGameOver = true
            //update the score
        updateScore()

        //won

        document.getElementById('name-' + activePlayer).textContent = "Winner!"
            //hide the dice
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
        //Update the UI
        updateScore()
        nextPlayer()
    }





})

function updateScore() {
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
}

function nextPlayer() {
    //next player
    //toogle activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')
    //hide the die
    document.querySelector('.dice').style.display = 'none'

}

////Listener for button new
document.querySelector('.btn-new').addEventListener('click', init)
    //initialisation function
function init() {
    //reset the score
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0
    isGameOver = false
        /***************************************************************************
         * Hiding a tag using the class selector
         */

    //the style makes us set the css property, display, to none
    document.querySelector('.dice').style.display = 'none'
        //use another method to get the element by id
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = "Player 1"
    document.getElementById('name-1').textContent = "Player 2"
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')

}