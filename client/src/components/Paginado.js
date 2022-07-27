import React from 'react'
import style from "./styles/paginado.module.css"

export default function Paginado({currentPage,prevHandler,nextHandler}) {



  return (
    <div className={style.container}>
        <button className={style.btn} onClick={prevHandler}>Prev</button>
        <p className={style.page}>{currentPage}</p>
        <button className={style.btn} onClick={nextHandler}>Next</button>
    </div>
  )
}
