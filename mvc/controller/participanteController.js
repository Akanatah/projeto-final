const Participante = require('../model/participanteModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/participantes", async (req, res) => {        
        const participante = new Participante()
        
        res.json(await participante.consultarTodos())        
    })
        
    app.get("/participante/:id", async (req, res) => {
        const participante = new Participante()
        const status = await participante.consultarUm(req.params.id)

        res.json(
            status
        )
    })

    app.get('/participante', (req, res) => {
        res.render('participante.ejs')
    })
    app.get("/attparticipante/:id", async (req, res) =>{
        
        const participante = new Participante()        
        const r = await participante.consultarUm(req.params.id)
        console.log(r)
        res.render('attparticipante.ejs', { r })
    })
    app.get("/addparticipante", (req, res) => {
        res.render('newparticipante.ejs');
    })

   
    // Todos os post
    app.post('/registerparticipante', async (req, res) => {


        console.log(req.body)
        const participante = new Participante();
        const { 
            id: id,
            nomeP: nomeP} = req.body;

        
 
        let status;

        if(!id){
            status = await participante.registrarparticipante(nomeP)
            res.redirect("/participante")
        }
        else{
            status = await participante.att(id, nomeP)
        }   

       
        

    })


    // Delete
    app.delete("/participante/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const participante = new Participante()

        const status = await participante.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/participante/:id", async (req, res) =>{
        const participante = new Participante()
        
        const {
            nomeP,
            id
        } = req.body;

        console.log({nomeP, id})
      
        if(id == req.params.id){
          const r =  await participante.att(nomeP, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}