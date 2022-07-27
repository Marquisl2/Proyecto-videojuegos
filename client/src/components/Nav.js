import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGameByName } from '../redux/actions'
import style from "./styles/nav.module.css"

export default function Nav({set}) {

  const dispatch = useDispatch()

  const [name, setName]= useState("")
  const juegosBackup = useSelector(state=> state.allGames)


  const handlerChange =(e)=>{
      e.preventDefault()
      setName(e.target.value)
  }


  const handlerSubmit = async (e)=>{
      e.preventDefault(e)
      if(!name.length){
        await dispatch(getGameByName(name))
          set(1)
          setName("")

      }
      let result = juegosBackup.filter(i=> i.name.toLowerCase().includes(name.toLowerCase())) 
      if(!result.length){
        await dispatch(getGameByName(""))
        set(1)
        setName("")
        return
      }

      await dispatch(getGameByName(name))
      set(1)
      setName("")

  }

   

  return (
    <div className={style.containerNav}>
        <div className={style.containerTitle}>
            <h3 className={style.title}>VideoGames</h3>
        </div>
        <div className={style.searchBar}>   
                <input value={name} className={style.inpSearch} onChange={e=>handlerChange(e)}  type="text" placeholder='Busca algún juego aquí!' />
                <button className={style.btnSearch} onClick={e=>handlerSubmit(e)} type='submit' >Search</button> 
        </div> 
        <div className={style.containerBtn}>
            <Link to={"/create/game"}>
                <button className={style.btnCreate}>Create Game</button>
            </Link>
        </div>
    </div>
  )
}
