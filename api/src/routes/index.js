const { Router } = require("express");
const model = require("../controllers/videogames");
const {Videogame} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/videogames", async (req, res, next) => {
  const { name } = req.query;
  try {
    const result = await model.getVideoGames(name);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/platforms", async(req,res,next)=>{
    try{
        const result  = await model.getPlatforms()
        res.send(result)
    }catch(e){
        next(e)
    }
})

router.get("/getRating", async(req,res,next)=>{
    try {
        const result = await model.getRating()
        res.send(result)
    } catch (error) {
        next(error)
        
    }
})

router.get("/videogames/:id", async(req,res,next)=>{
    const {id} = req.params
    try {
        const result = await model.getGameById(id);
        res.send(result);
    } catch (error) {
        next(error)
    }
})

router.post("/videogames",async(req,res,next)=>{
    const {name,description,releaseDate,rating,platforms,genres,img} =req.body

    try {
        const result = await model.postVideoGame(img,name,description,releaseDate,rating,platforms,genres);
        res.send(result);
    } catch (error) {
        next(error)
    }
})

router.get("/genres", async(req,res,next)=>{
    try {
        const resultado = await model.getGenres()
        res.send(resultado)
    } catch (error) {
        next(error)
    }
})

router.delete("/delete/:id",async(req,res,next)=>{
    const {id} = req.params
    try {
        await Videogame.destroy({
            where:{
                id
            }
        })
        res.send("juego eliminado")
    } catch (error) {
        next(error)
    }
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
