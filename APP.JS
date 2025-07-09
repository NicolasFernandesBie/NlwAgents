const apiKeyInput = document.getElementById("apiKeyInput")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const form = document.getElementById("form")
const aiResponse = document.getElementById("aiResponse")

const enviarFormulario = (event) => {
    event.preventDefault()
    console.log(event)

}
form.addEventListener('submit', enviarFormulario)