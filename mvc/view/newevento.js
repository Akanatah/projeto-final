async function carregarParticipante(){

    let elPaticipante = document.querySelector("#participante")

    const dados = await fetch('http://localhost:3000/participantes')
    const json = await dados.json()
    let participantes = await json

    for(let participante of participantes){

    console.log(participante)
    elPaticipante.innerHTML +=`
        <option value="${participante.id}">${participante.nomeP}</option>
        
        `} 
}

carregarParticipante()