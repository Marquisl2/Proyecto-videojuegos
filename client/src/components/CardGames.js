import React from 'react'
import CardGame from './CardGame'
import style from "./styles/cardgames.module.css"

export default function CardGames({juegos}) {
  return (
    <div className={style.containerCards}>
        {juegos && juegos.map(el=>{
            return(
                <CardGame key={el.id} id={el.id} name={el.name} img={el.img} generos={el.genres}/>
            )
        })}
    </div>
  )
}
