var mysql = require('mysql2');

class DatabaseMySQL {

  #connection

  constructor() {
    this.#connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'evento'
    }).promise();
  }

  async selectEvento() {
    const query = await this.#connection.query('select * from eventos')
    return query[0]
  }
  async selectEventoId(id) {
    const query = await this.#connection.query('select * from eventos where id_evento =' + id)
    return query[0]
  }
  async AddEvento(param) {
    const sql = `insert into eventos (nome_evento, data_evento, local_evento, descricao_evento, id_participante)
   values ('${param.nome}','${param.data}','${param.local}','${param.desc}', '${param.participante}')`

    const query = await this.#connection.execute(sql)
    return query[0]
  }
  async delEvento(id) {
    const sql = 'delete from eventos where id_evento =' + id

    const query = await this.#connection.execute(sql)
    return query[0]
  }
  async upEvento(nome, data, local, desc, participante, id) {
    const sql = `update eventos 
    set nome_evento = "${nome}",
        data_evento = "${data}",
        local_evento = "${local}",
        descricao_evento = "${desc}",
        id_participante = "${participante}"
        where id_evento = ${id}
  `
    console.log(sql)
    const r = await this.#connection.execute(sql)
    return r[0]
  }


  async selectParticipante() {
    const query = await this.#connection.query('select * from participantes')
    return query[0]
  }
  async selectParticipanteId(id) {
    const query = await this.#connection.query('select * from participantes where id_participante =' + id)
    return query[0]
  }
  async AddParticipante(param) {
    const sql = `insert into participantes (nome_participante)
   values ('${param.nomeP}')`

    const query = await this.#connection.execute(sql)
    return query[0]
  }
  async delParticipante(id) {
    const sql = 'delete from participantes where id_participante =' + id

    const query = await this.#connection.execute(sql)
    return query[0]
  }
  async upParticipante(nomeP, id) {
    const sql = `update participantes 
    set nome_participante = "${nomeP}"
        where id_participante = ${id}
  `
    console.log(sql)
    const r = await this.#connection.execute(sql)
    return r[0]
  }



  async selectOrganizadorLogin(email, senha) { 
    const query = await this.#connection.query(
        'SELECT * FROM organizadores WHERE email_organizador = ? AND senha_organizador = ?', 
        [email, senha]
    );
    return query[0];
}
async selectOrganizadorId(id) {
    const query = await this.#connection.query('select * from organizadores where id_organizador =' +id)
    return query[0]
}
async AddOrganizador(dados) {
    const sql = `insert into organizadores (nome_organizador, email_organizador, senha_organizador)
    values ('${dados.nome}','${dados.email}','${dados.senha}')`

    const query = await this.#connection.execute(sql)
    return query[0]
}
async delOrganizador(id) {
    const sql = 'delete from organizadores where id_organizador ='+id

    const query = await this.#connection.execute(sql)
    return query[0]
}
async upOrganizador(nome, email, senha, id) {
    const sql = `update organizadores
        set nome_organizador = "${nome}",
            email_organizador = "${email}",
            senha_organizador = "${senha}"
        where id_organizador = ${id}`

    const query = await this.#connection.execute(sql)
    return query[0]
}

}

module.exports = DatabaseMySQL