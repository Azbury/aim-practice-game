const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const userFormContainer = document.querySelector(".container")
const newPlayer = document.getElementById("new-player")
const creeper = "http://www.pngmart.com/files/7/Minecraft-PNG-Clipart.png"
const gameBoard = document.getElementById("game-board")

document.addEventListener("DOMContentLoaded", () => {
    userFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        newUser(e.target)
        setInterval(addCreeper, 1000)
    })
    newPlayer.addEventListener('click', function(e) {
        e.preventDefault()
        userFormContainer.style.display = "block"
        newPlayer.style.display = "none"
        document.getElementById("user").remove()
    })
})

function newUser(userDate) {
    let formData = {
        "username": userDate.username.value
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
        let newUser = document.createElement('h2')
        newUser.setAttribute('id', 'user')
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
        
    })
}

function addCreeper() {
    
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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}