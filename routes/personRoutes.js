const router = require('express').Router()

const Person = require('../models/Person')



//rotas

router.post('/', async (req,res)=>{
    //recebendo os dados de body 
    const {name, salary, approved} = req.body
    //criar validação para os outros atributos
    if(!name){
        res.status(422).json({error: 'o nome é obrigatório!'})
        return
    }

    const person = {
        name, 
        salary,
        approved
    }
    //criação do banco de dados
    try {
      //esperar a requisição terminar, criando dados
      await Person.create(person)
       //dado criado com sucesso
       res.status(201)
       //envia uma mensagem em formato json
       res.json({message: " Pessoa inserida com sucesso!"}) 
console.log("add com sucesso!", person)
    } catch (error) {
        res.status(500).json({error:error})
        
    }

})

router.get('/', async (req, res)=>{

    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error:error})
    }
    
})

router.get('/:id', async (req,res)=>{
    //extrair o dado da requisição pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})

        if(!person) {
            res.status(422).json({message: 'O usuario não foi encontrado!'})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error:error})
    }
    
})

//atualização parcial de dados
router.patch('/:id', async (req, res)=>{
    const id = req.params.id

    const {name, salary,approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatePerson = await Person.updateOne({_id:id}, person)
        //verifica se o usuario existe ou não
        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuario não foi encontrado!'})
            return
        }
        res.status(200).json(person)
    } catch (error) {
      res.status(500).json({error:error})
    }
 

})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(422).json({message: 'O usuario não foi encontrado!'})
        return
    } 


try {
    await Person.deleteOne({ _id: id})
    res.status(200).json({message: "usuario deletado"})
    } catch (error) {
    res.status(500).json({error:error})
  }

})


module.exports = router