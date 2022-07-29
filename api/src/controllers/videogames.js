require("dotenv").config();
const axios = require("axios");

const {Videogame,Genre} = require("../db")
const { API_KEY } = process.env;

let cache = []
const getApiGames = async () => {
    let juegosApi = [];
    let count = 1;
    while (count <= 5) {
      const result = await axios.get(
        `https://api.rawg.io/api/games?page=${count}&key=${API_KEY}`
      );
      let juegos = result.data.results;
      juegos = juegos.map((i) => {
        return {
          id: i.id,
          name: i.name,
          rating:i.rating,
          img: i.background_image,
          genres: i.genres.map((i) => i.name),
        };
      });
      juegosApi = [...juegosApi, ...juegos];
      count++
    }
    return juegosApi
  };
  
  const getDbGames = async()=>{
      let result = await Videogame.findAll({
          include:Genre  
        })
        result = JSON.stringify(result)  
        result = JSON.parse(result)

        // result = result.reduce((acc,el)=>acc.concat({...el, genres: el.genres.map(g=>g.name)}),[])

        result = result.map(j=>{
          j={
            ...j,
            genres: j.genres.map(l=>l.name)
          }
          return j
        })
        return result

      }
  
  const totalInfoGames= async()=>{
      const api = await getApiGames()
      const db = await getDbGames()
      const totalGames = [...api,...db]
      cache = [...totalGames]
      return totalGames
  }



  module.exports={
    getVideoGames: async(name)=>{
      let juegos = await totalInfoGames()
      if(!name) return juegos

      juegos = juegos.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
      
      if(!juegos.length) return juegos
      return juegos
    },

    getGameById: async(id)=>{


      let idd = Number(id) ? Number(id) : id

      const x = cache.find(i=> i.id === idd)

      if(!x) return "El id es incorrecto"
       
      
      
      if(typeof idd === "number"){
        

  
        let gameApi = await axios.get(`https://api.rawg.io/api/games/${idd}?key=${API_KEY}`)

        let juego = gameApi.data

        juego = {
          id: juego.id,
          name: juego.name,
          img: juego.background_image,
          genres: juego.genres.map((i) => i.name),
          description: juego.description,
          releaseDate: juego.released,
          rating: juego.rating,
          platforms: juego.platforms.map(i=>i.platform.name)

        }


        return juego
         
      }else{

        let videogameDb = await Videogame.findOne({
          where: {
              id: idd,
          },
          include: Genre
      })

      videogameDb = JSON.stringify(videogameDb);
      videogameDb = JSON.parse(videogameDb);

      videogameDb.genres = videogameDb.genres.map(i=>i.name)
      

      return videogameDb
      }
    },
    
    postVideoGame: async(img,name,description,releaseDate,rating,platforms,genres)=>{
      // (name,desc,platforms)

      const videoGameCreate = await Videogame.findOrCreate({
          where:{
            name,description,releaseDate,rating,platforms,img
          }
        })

      await videoGameCreate[0].addGenres(genres)

    

      return videoGameCreate[0]


      
    },

    getGenres: async()=>{
      // let juegos = await totalInfoGames()
      // let generos = juegos.map(i=>i.genres)
      // generos = generos.flat()

      // generos.forEach(i=>{
      //   Genre.findOrCreate({
      //     where:{
      //       name: i
      //     }
      //   })
      // })

      // const allGenres = await Genre.findAll()

      // return allGenres
      const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

      let generos = genres.data.results

      generos = generos.map(i=> i.name)

      generos.forEach(i=>{
          Genre.findOrCreate({
            where:{
              name: i
            }
          })
        })

         const allGenres = await Genre.findAll()

      return allGenres


    }
  }
