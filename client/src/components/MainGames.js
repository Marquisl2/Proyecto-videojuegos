import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getGenres, orderAlf, orderRating, getGameByName } from '../redux/actions'
import CardGames from './CardGames'
import Filters from './Filters'
import gif from "../img/loading-gif.gif"
import Nav from './Nav'
import Paginado from './Paginado'
import style from "./styles/maingames.module.css"

export default function MainGames() {
  const dispatch = useDispatch()
  
  useEffect(()=>{

    
    dispatch(getGames())
    
    dispatch(getGenres())
    
  },[])
  const generos = useSelector(state=> state.genres)
  
  const juegos = useSelector(state=>state.games)



  


//paginado----------------------
  
  const [currentPage,setCurrentPage] = useState(1)
  
  const gamesPerPage = 15;

  const indexLast = currentPage * gamesPerPage

  const indexFirst = indexLast - gamesPerPage 


  let currentGames = juegos.slice(indexFirst,indexLast)


    const nextHandler = ()=>{
      const totalElementos = juegos.length

      const nextPage = currentPage + 1

      const index = nextPage * gamesPerPage

      if(index <= (totalElementos + gamesPerPage)){

        if(index === totalElementos)return
  
        setCurrentPage(nextPage)
      }

     
    }

    const prevHandler = ()=>{
      const prevPage = currentPage - 1
      
      if(prevPage < 1) return;
      
      setCurrentPage(prevPage)
      
    }

    

    // --------------------- para ordenamiento---------------

    const [estado, setEstado] = useState("")


    function handlerOrderAlf(e){
        e.preventDefault()
        dispatch(orderAlf(e.target.value))
        setEstado(`estado ${e.target.value}`)
        setCurrentPage(1)
    }

    function handlerOrderRating(e){
        e.preventDefault()
        dispatch(orderRating(e.target.value))
        setEstado(`estado ${e.target.value}`)
        setCurrentPage(1)
    }
    
  return (
    
    <div className={style.containerMain}>
        {
          !juegos.length || !generos.length ?(<div className={style.containerLoading}><img src={gif} alt="laoding"/></div>)
          :
          <div>

            <Nav set={setCurrentPage}/>
            <Filters set={setCurrentPage} handlerOrderAlf={handlerOrderAlf} handlerOrderRating={handlerOrderRating} generos={generos}/>
            <Paginado currentPage={currentPage} prevHandler={prevHandler} nextHandler={nextHandler}/>
            <CardGames juegos={currentGames}/>
            <Paginado currentPage={currentPage} prevHandler={prevHandler} nextHandler={nextHandler}/>
          </div>

          
        
        }
        
    </div>
    
  )
}
