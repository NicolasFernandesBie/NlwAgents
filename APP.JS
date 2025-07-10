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
    const pergunta = ` 
    ## Especialidade
    Voce é um assistente especialista de meta para o jogo ${game}



    ## Tarefas
    Você deve responder as perguntas do usuario com base no seu conhecimento do jogo , estrategias, build e dicas


    ## Regras
    - Se você não sabe a resposta, responda com 'não sei' e não tente inventar uma resposta.
    - Se a pergunta não esta relacionada ao jogo , responda com 'essa pergunta não esta relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, com base na data atual, para dar resposta coerente.
    - Nunca responda itens que voce não tenha certeza de que esxiste no patch atual.



    ## Resposta
    - Economize na resposta , seja direto e responda no maximo 600 caracteres
    - responda em markdown
    - Não precisa realizar saudação ou despedida , apenas responda oque o usuario esta querendo.

    ## Exemplo de resposta
    Pergunta do usuario : Melhor build de elden ring 
    resposta: a Build mais atual é: \n\n **Itens:**
    
    ---
    Aqui esta a pergunta do usuario
    
    `






    const contents = [{
        role: "user",
        parts: [{
            text: pergunta
        }]

    }]

    const tools = [{
        google_search: {}
    }]

    //chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
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