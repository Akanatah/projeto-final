const Evento = require('../model/eventoModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/evento", async (req, res) => {        
        const evento = new Evento()
        
        res.json(await evento.consultarTodos())        
    })
        
    app.get("/evento/:id", async (req, res) => {
        const evento = new Evento()
        const status = await evento.consultarUm(req.params.id)

        res.json(
            status
        )
    })

    app.get('/home', (req, res) => {
        res.render('home.ejs')
    })
    app.get("/attevento/:id", async (req, res) =>{
        
        const evento = new Evento()        
        const r = await evento.consultarUm(req.params.id)
        console.log(r)
        res.render('alterevento', { r })
    })
    app.get("/addevento", (req, res) => {
        res.render('newevento.ejs');
    })

   
    // Todos os post
    app.post('/registerevento', async (req, res) => {


        console.log(req.body)
        const evento = new Evento();
        const { 
            id: id,
            nome: nome,
            data: data,
            local: local,
            desc: desc,
            participante: participante} = req.body;

        
 
        let status;

        if(!id){
            status = await evento.registrarevento(nome, data, local, desc, participante)
            res.redirect('/home')
        }
        else{
            status = await evento.att(id, nome, data, local, desc, participante)
        }   

       
    

    })


    // Delete
    app.delete("/evento/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const evento = new Evento()

        const status = await evento.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/evento/:id", async (req, res) =>{
        const evento = new Evento()
        
        const {
            nome,
            data,
            local,
            desc,
            participante,
            id
        } = req.body;

        console.log({nome, data, local, desc, participante, id})
      
        if(id == req.params.id){
          const r =  await evento.att(nome, data, local, desc, participante, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}