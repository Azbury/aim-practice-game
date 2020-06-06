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

document.addEventListener("DOMContentLoaded", () => {
    userFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        User.newUser(e.target)
    })
    newPlayer.addEventListener('click', function(e) {
        e.preventDefault()
        User.clearUserInfo()
        Score.clearScoreboard()
    })
    startGame.addEventListener('click', function(e) {
        e.preventDefault()
        Score.resetGame()
        let interval = setInterval(function() {
            if (intervalCounter >= 20) {
                clearInterval(interval)
                startGame.style.display = "block"
                Score.addNewScore(parseInt(document.getElementById('current-score').innerHTML.split(" ")[1]), document.querySelector('.user').id)
            } else {
                Creeper.addCreeper()
            }
        }, 1000)
    })
})

//Score Class
//Contains all the function pertaining to the operating of the scoreboard, as well as adding new scores to the database after each game
class Score {
    //clearScoreboard method
    //clears the scoreboard when a player clicks on the "new player" button
    static clearScoreboard() {
        for (let i = 1; i < 6; i++) {
            document.getElementById(`score-${i}`).innerHTML = `${i}. `
        }
        scores.style.display = "none"
    }

    //getScores method
    //gets the scores from the desired user based upon the parameter userID
    static getScores(userID) {
        fetch(`${USERS_URL}/${userID}`).then(function(reponse) {return reponse.json()}).then(function(user) {
            let userPoints = user.scores.map(element => element.points)
            let sortedScores = userPoints.sort((a, b) => b - a)
            for (let i = 1; i < sortedScores.length + 1 && i != 6; i++) {
                document.getElementById(`score-${i}`).innerHTML = `${i}. ${sortedScores[i - 1]}`
            }
        })
    }
    
    //addNewScore method
    //adds a new score the user in the database based upon the parameter user_id with the point total defined in the parameter points
    static addNewScore(points, user_id) {
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
            Score.getScores(score.user_id)
        })
    }

    //resetGame method
    //resets the current score, the counter that determines how many creepers will spawn, and removes the option to start a new game after
    //the new game button has been pressed
    static resetGame() {
        document.getElementById("current-score").innerHTML = "Score: 0"
        startGame.style.display = "none"
        intervalCounter = 0
    }
}

//User Class
//Contains all the functions pertaining to operating on Users including adding a new user to the database as well as clearing the current
//user's information after the "new player" button is pressed
class User {
    //newUser method
    //adds a new user to the database with the desired username entered by the user in the new user form
    static newUser(userData) {
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
            scores.style.display = "block"
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
            scores.appendChild(newScore)
            document.getElementById("username").appendChild(newUser)
        }).catch(function(error) {
            document.body.innerHTML = error.message
        });
    }

    //clearUserInfo method
    //clears the current user's info when the "new player" button is pressed
    static clearUserInfo() {
        userFormContainer.style.display = "block"
        newPlayer.style.display = "none"
        startGame.style.display = "none"
        document.getElementById("current-score").remove()
        document.querySelector(".user").remove()
    }
}

//Creeper Class
//Contains all the methods pertaining to adding a creeper to the game board when a user starts a new game
class Creeper {
    //addCreeper method
    //add 1 creeper to the game board everytime the method is called
    static addCreeper() {
        const creeperElement = document.getElementById('creeper')
        if (creeperElement) {
            creeperElement.remove()
        }
        intervalCounter++
        let newCreeper = document.createElement('img')
        newCreeper.src = creeper
        newCreeper.style = "width:50px;height:50px"
        newCreeper.style.position = "absolute"
        newCreeper.style.top = `${Creeper.getRandomPosition(0,480)}px`
        newCreeper.style.left = `${Creeper.getRandomPosition(0,480)}px`
        newCreeper.setAttribute('id', 'creeper')
        newCreeper.addEventListener('click', function(e) {
            e.target.remove()
            const currentScore = document.getElementById("current-score")
            let scoreArray = currentScore.innerHTML.split(" ")
            scoreArray[1] = parseInt(scoreArray[1]) + 1
            currentScore.innerHTML = scoreArray.join(" ")
        })
        gameBoard.appendChild(newCreeper)
    }
    
    //getRandomPosition method
    //gives a random position each time the method is called allowing for creepers to appear randomly on the game board
    static getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }
}