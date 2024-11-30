const DataBaseMySQL = require('../../database/DataBase')

class Evento {

    #id
    #nome
    #data
    #local
    #desc
    #participante

    constructor(nome, data, local, desc, participante ){
        this.#nome = nome
        this.#data = data
        this.#local = local
        this.#desc = desc,
        this.#participante = participante
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }

    get data() {
        return this.#data
    }
    set data(value) {
        this.#data = value
    }

    get local() {
        return this.#local
    }
    set local(value) {
        this.#local = value
    }

    get desc() {
        return this.#desc
    }
    set desc(value) {
        this.#desc = value
    }

    get participante() {
        return this.#participante
    }
    set participante(value) {
        this.#participante = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nome": this.#nome,
            "data": this.#data,
            "local": this.#local,
            "desc": this.#desc,
            "participante": this.#participante
        }
    }
}

class EventoDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_evento = []

        const query = await this.#db.selectEvento()

        for (let index = 0; index < query.length; index++) {

            const evento = new Evento()

            evento.id = query[index].id_evento
            evento.nome = query[index].nome_evento
            evento.data = query[index].data_evento
            evento.local = query[index].local_evento
            evento.desc = query[index].descricao_evento
            evento.participante = query[index].id_participante

            list_evento.push(evento.toJson())     
        }


       
        return list_evento
    }

    async consultarUm(id){      

        const query = await this.#db.selectEventoId(id)

        
        const evento = new Evento()

        if(query){
            evento.id = query[0].id_evento
            evento.nome = query[0].nome_evento
            evento.data = query[0].data_evento
            evento.local = query[0].local_evento
            evento.desc = query[0].descricao_evento
            evento.participante = query[0].id_participante
        }

 
        return evento.toJson()
    }


    async registrarevento(
        nome,
        data,
        local,
        desc,
        participante){

         
            const evento = new Evento(nome, data, local, desc, participante);

            const sql = await this.#db.AddEvento(evento.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delEvento(id)
        return linhasAfetadas.affectedRows
    }

    async att(nome, data, local, desc, participante, id){
        const evento = new Evento(nome, data, local, desc, participante)
        evento.id = id

        const r = await this.#db.upEvento(
            evento.nome,
            evento.data,
            evento.local,
            evento.desc,
            evento.participante,
            evento.id
        )

        return r.affectedRows;
    }
}

module.exports = EventoDAO