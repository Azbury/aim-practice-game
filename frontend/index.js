const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const SCORES_URL = `${BASE_URL}/scores`
const userFormContainer = document.querySelector(".container")
const newPlayer = document.getElementById("new-player")
const creeper = "http://www.pngmart.com/files/7/Minecraft-PNG-Clipart.png"
const gameBoard = document.getElementById("game-board")
const startGame = document.getElementById("start-game")
const scores = document.getElementById("scores")
let intervalCounter = 0
let topScores = []

document.addEventListener("DOMContentLoaded", () => {
    userFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        scores.style.display = "block"
        newUser(e.target)
    })
    newPlayer.addEventListener('click', function(e) {
        e.preventDefault()
        userFormContainer.style.display = "block"
        newPlayer.style.display = "none"
        startGame.style.display = "none"
        document.getElementById("current-score").remove()
        document.querySelector(".user").remove()
    })
    startGame.addEventListener('click', function(e) {
        e.preventDefault()
        document.getElementById("current-score").innerHTML = "Score: 0"
        startGame.style.display = "none"
        intervalCounter = 0
        let interval = setInterval(function() {
            if (intervalCounter >= 30) {
                clearInterval(interval)
                startGame.style.display = "block"
                addNewScore(parseInt(document.getElementById('current-score').innerHTML.split(" ")[1]), document.querySelector('.user').id)
            } else {
                addCreeper()
            }
        }, 1000)
    })
})

function newUser(userData) {
    let formData = {
        "username": userData.username.value
    }

    let configObj = {
        method: "Post",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch(USERS_URL, configObj).then(function(reponse) {return reponse.json()}).then(function(user) {
        userFormContainer.style.display = "none"
        newPlayer.style.display = "block"
        startGame.style.display = "block"
        let newUser = document.createElement('h2')
        newUser.setAttribute('class', 'user')
        newUser.setAttribute('id', user.id)
        newUser.innerHTML = `Username: ${user.username}`
        let newScore = document.createElement('h3')
        newScore.innerHTML = "Score: 0"
        newScore.setAttribute('id', 'current-score')
        document.getElementById("scores").appendChild(newScore)
        document.getElementById("username").appendChild(newUser)
    }).catch(function(error) {
        document.body.innerHTML = error.message
    });
}

function getScores(userID) {
    fetch(`${USERS_URL}/${userID}`).then(function(reponse) {return reponse.json()}).then(function(user) {
        let topScores = []
        sortedScores = user.scores.sort((a, b) => b - a)
    })
}

function addCreeper() {
    const creeperElement = document.getElementById('creeper')
    if (creeperElement) {
        creeperElement.remove()
    }
    intervalCounter++
    let newCreeper = document.createElement('img')
    newCreeper.src = creeper
    newCreeper.style = "width:50px;height:50px"
    newCreeper.style.position = "absolute"
    newCreeper.style.top = `${getRandomArbitrary(0,480)}px`
    newCreeper.style.left = `${getRandomArbitrary(0,480)}px`
    newCreeper.setAttribute('id', 'creeper')
    newCreeper.addEventListener('click', function(e) {
        e.target.remove()
        const currentScore = document.getElementById("current-score")
        scoreArray = currentScore.innerHTML.split(" ")
        scoreArray[1] = parseInt(scoreArray[1]) + 1
        currentScore.innerHTML = scoreArray.join(" ")
    })
    gameBoard.appendChild(newCreeper)
}

function addNewScore(points, user_id) {
    let formData = {
        "points": points,
        "user_id": user_id
    }

    let configObj = {
        method: "Post",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch(SCORES_URL, configObj).then(function(reponse) {return reponse.json()}).then(function(score) {
        document.getElementById("score-1").innerHTML = `1. ${score.points}`
    })
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}