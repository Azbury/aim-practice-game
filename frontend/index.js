const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`

document.addEventListener("DOMContentLoaded", () => {
    const userFormContainer = document.querySelector(".container")
    userFormContainer.addEventListener('submit', e => {
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
        let newUser = document.createElement('h2')
        newUser.innerHTML = user.username
        document.getElementById("username").append(newUser)
    })
}