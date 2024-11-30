async function carregarEvento(){

  const formatarData = (dataISO) => {
    if (!dataISO) return "Sem data";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

    let elEvento = document.querySelector("#eventos")

    const dados = await fetch('http://localhost:3000/evento')
    const json = await dados.json()
    let eventos = await json


    for (let evento of eventos) {
      const [participante] = await Promise.all([
        fetch(`http://localhost:3000/participante/${evento.participante}`).then((res) => res.json())
      ]);

  
      console.log(evento)
      elEvento.innerHTML +=`
        <div class="row m-4">
            <div class="col border-end border-danger text-center">${evento.nome}</div>
            <div class="col border-end border-danger text-center">${formatarData(evento.data)}</div>
            <div class="col border-end border-danger text-center">${evento.local}</div>
            <div class="col border-end border-danger text-center desc">${evento.desc}</div>
            <div id="participante" class="col border-end border-danger text-center">${participante ? participante.nomeP : "Sem período"}</div>
            <div class="col border-start text-center">
            <button onclick="atualizar(${evento.id})" class="btn btn-success">
                <i class="bi bi-arrow-repeat"></i>
            </button>
            </div>
            <div class="col border-start text-center">
                <button onclick="apagar(${evento.id})" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
          </div>
      `
    } 
  
}

  async function apagar(id){     

    const dados = await fetch('http://localhost:3000/evento/'+id, { method: 'DELETE' })
    const json = await dados.json()
    let eventos = await json
          
    location.reload()
  }

  function atualizar(id){
    location.href = "/attevento/"+id
  }

  carregarEvento()