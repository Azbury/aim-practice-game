const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const userFormContainer = document.querySelector(".container")
const newPlayer = document.getElementById("new-player")

document.addEventListener("DOMContentLoaded", () => {
    userFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        newUser(e.target)
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
        document.getElementById("username").appendChild(newUser)
    }).catch(function(error) {
        document.body.innerHTML = error.message
    });
}