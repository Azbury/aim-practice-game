const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const userFormContainer = document.querySelector(".container")

document.addEventListener("DOMContentLoaded", () => {
    userFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        newUser(e.target)
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
        let newUser = document.createElement('h2')
        newUser.innerHTML = `Username: ${user.username}`
        document.getElementById("username").append(newUser)
    }).catch(function(error) {
        document.body.innerHTML = error.message
    });
}