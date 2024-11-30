async function carregarParticipante(){
  
      let elParticipante = document.querySelector("#participantes")
  
      const dados = await fetch('http://localhost:3000/participantes')
      const json = await dados.json()
      let participantes = await json
  
  
      for (let participante of participantes) {
        console.log(participante)
        elParticipante.innerHTML +=`
          <div class="row m-4">
              <div class="col border-end border-danger text-center">${participante.nomeP}</div>
              <div class="col border-start text-center">
              <button onclick="atualizar(${participante.id})" class="btn btn-success">
                  <i class="bi bi-arrow-repeat"></i>
              </button>
              </div>
              <div class="col border-start text-center">
                  <button onclick="apagar(${participante.id})" class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                  </button>
              </div>
            </div>
        `
      } 
    
    }
  
    async function apagar(id){     
  
      const dados = await fetch('http://localhost:3000/participante/'+id, { method: 'DELETE' })
      const json = await dados.json()
      let participantes = await json
            
      location.reload()
    }
  
    function atualizar(id){
      location.href = "/attparticipante/"+id
    }
  
    carregarParticipante()