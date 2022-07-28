
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { gameDetail } from '../redux/actions'
import foto from "../img/fotoDefault.jpg"
import style from "./styles/details.module.css"

import loading from ".././img/loading-gif.gif"

export default function DetailsGame(props) {
  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(gameDetail(props.match.params.id))
  },[props.match.params.id,dispatch])

  let gameDetails = useSelector(state=>state.gameDetail)



  return (
    <div className={style.containerAll}>
    {Object.keys(gameDetails).length ?(
    <div className={style.containerDetails}>
      
        <div className={style.containerInfo}>

            <h3 className={style.title}>{gameDetails.name}</h3>
        {gameDetails.img && /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(gameDetails.img) ? (
                <div className={style.divImg}>
                  <img className={style.img} src={gameDetails.img} alt="Videogame"></img>
                </div>
              ) : (
                <div className={style.divImg}>
                  <img  className={style.img} src={foto} alt="Videogame"></img>
                </div>
              )}
  
              {
                <p>
                  <strong>Release Date</strong>:
                  {` ${gameDetails.releaseDate || "None"}`}
                </p>
              }
              <p>
                <strong>Rating</strong>: ★ {`${gameDetails.rating}`}
              </p>
  
              <div className={style.divDesc}>
                  {
                    <p className="descripcion">
                      {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  }
              </div>
                  {
                    <p>
                      <strong>Genres</strong>:
                      {` ${gameDetails.genres.join(", ")}`}
                    </p>
                  }
                  {
                    <p>
                      <strong>Platforms</strong>:{" "}
                      {`${
                        typeof gameDetails.platforms === "string"
                          ? gameDetails.platforms
                          : gameDetails.platforms.join(", ")
                      }`}
                    </p>
                  }
                  <div className={style.containerBtn}>

                  <Link to="/home">
                    <button  className={style.btn}>Back</button>
                  </Link>
                  </div>
  
  
                </div>
      
      


      </div>
      ):(<div className={style.containerLoading}><img src={loading} alt="loading" /></div>)}
      </div>








  );

}