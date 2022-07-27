import React from 'react'
import { Link } from 'react-router-dom'
import style from "./styles/landingpage.module.css"


export default function LandigPage() {

  return (
    <div className={style.bodyContainer}>
        <div className={style.container}>
                <h1 className={style.textLanding}>
                    Proyecto - Marcos Laurens
                </h1>
            <Link to={"/home"}>
                <button className={style.btn}>Start</button>
            </Link>
        </div>
    </div>
  )
}
