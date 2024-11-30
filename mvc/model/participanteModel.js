const DataBaseMySQL = require('../../database/DataBase')

class Participante {

    #id
    #nomeP

    constructor(nomeP ){
        this.#nomeP = nomeP
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeP() {
        return this.#nomeP
    }
    set nomeP(value) {
        this.#nomeP = value
    }

   

    toJson(){

        return {
            "id": this.#id,
            "nomeP": this.#nomeP
        }
    }
}

class ParticipanteDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_participante = []

        const query = await this.#db.selectParticipante()

        for (let index = 0; index < query.length; index++) {

            const participante = new Participante()

            participante.id = query[index].id_participante
            participante.nomeP = query[index].nome_participante

            list_participante.push(participante.toJson())     
        }


       
        return list_participante
    }

    async consultarUm(id){      

        const query = await this.#db.selectParticipanteId(id)

        
        const participante = new Participante()

        if(query){
            participante.id = query[0].id_participante
            participante.nomeP = query[0].nome_participante
        }

 
        return participante.toJson()
    }


    async registrarparticipante(
        nomeP){

         
            const participante = new Participante(nomeP);

            const sql = await this.#db.AddParticipante(participante.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delParticipante(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeP, id){
        const participante = new Participante(nomeP)
        participante.id = id

        const r = await this.#db.upParticipante(
            participante.nomeP,
            participante.id
        )

        return r.affectedRows;
    }
}

module.exports = ParticipanteDAO