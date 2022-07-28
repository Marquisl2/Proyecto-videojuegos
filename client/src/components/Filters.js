import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterFrom,  orderGenre } from '../redux/actions'
import style from "./styles/filters.module.css"



export default function Filters({generos,handlerOrderAlf,handlerOrderRating,set}) {
    const dispatch = useDispatch()
    const juegosB = useSelector(state=> state.gamesBackup)

    const validate = (e)=>{
        let result = juegosB.filter(i=>i.genres.includes(e.target.value))
        if(!result.length){
            return 0
        }
        return 1
    }


    function handlerFilterGenres(e){
        e.preventDefault()
        let result = validate(e)
        if(!result && e.target.value !== "All") return
        dispatch(orderGenre(e.target.value))
        set(1)
    }

    function handlerFilterFrom(e){
        e.preventDefault()
        let result =  juegosB.filter(i=> i.createdAtDb)
        if(!result.length)return
        dispatch(filterFrom(e.target.value))
        set(1)
    }


    
        
    
  return (
    <div className={style.container}>
        <div>
        <select className={style.select} onChange={e=>handlerOrderAlf(e)} name="Orden alfabetico">

            <option value={"All"}>Ordenar por nombre:</option>

            <option value="orderAaZ">A-Z</option>

            <option value="orderZaA">Z-A</option>

        </select>
        </div>
        <div>
        <select  className={style.select} onChange={e=>handlerOrderRating(e)} name="Orden rating">

            <option value={"All"}>Ordenar por rating:</option>

            <option value="orderRatingL">0-5</option>

            <option value="orderRatingP">5-0</option>

        </select>
        </div>
        <div>
            <select  className={style.select} onChange={(e)=>handlerFilterFrom(e)} name="Orden Origin">
                <option value={"All"}>Creados/Existentes</option>
                <option value="gamesDb">Creados</option>
                <option value="gamesApi">Existentes</option>
            </select>
        </div>
        <div>
            <select  className={style.select} onChange={e=>handlerFilterGenres(e)} name="Orden genero">
                <option value="All">Filtrar por genero:</option>
                {generos && generos.map(j=>{
                    return(
                        <option value={j.name} key={j.id}>{j.name}</option>
                    )
                })}
            </select>
        </div>
    </div>
  )
}
