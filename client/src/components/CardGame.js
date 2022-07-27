import React from 'react'
import { Link } from 'react-router-dom';
import foto from "../img/fotoDefault.jpg"
import style from "./styles/CardGame.module.css"
export default function CardGame({name,img,generos,id}) {
  return (

        <div className={style.cardContainer}>
            <div className={style.containerPa}>

              <p className={style.p}><strong>{name}</strong></p>
            </div>
            <div className={style.containerImg}>
            {img && /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(img) ? (
                <div className={style.divImage}>
                  <img className={style.img} src={img} alt="Videogame"></img>
                </div>
              ) : (
                <div className={style.divImage}>
                  <img className={style.img} src={foto} alt="Videogame"></img>
                </div>
              )}
            </div>
            
            <div className={style.containerP}>

            <p> <strong>Genres: </strong>{generos && generos.join(", ")}</p>
            </div>
            <div className={style.containerP}>
            <Link to={`/game/${id}`}>
            <button className={style.btn}>Details</button>
            </Link>
            </div>
        </div>

  )
}
