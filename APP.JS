const apiKeyInput = document.getElementById("apiKeyInput")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const form = document.getElementById("form")
const aiResponse = document.getElementById("aiResponse")


const markdownToHtml = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

//chave de api AIzaSyDVzspg1nfPyFE3s_oPhBMofoubmgbzrYA
const perguntarAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const pergunta = `olha, tenho esse jogo ${game} e queria saber ${question}  `;
    const contents = [{
        parts: [{
            text: pergunta
        }]

    }]
    //chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}



const enviarFormulario = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if (apiKey == '' || game == '' || question == '') {
        alert("Por favor, preencha todos os campos")
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        //perguntar para ia
        const text = await perguntarAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML =
            markdownToHtml(text)

    } catch (error) {
        console.log('Erro: ', error)

    } finally {
        askButton.disabled = false
        askButton.textContent = 'perguntar'
        askButton.classList.remove('loading')


    }


}
form.addEventListener('submit', enviarFormulario)