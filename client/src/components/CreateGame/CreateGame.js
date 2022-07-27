import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory} from 'react-router-dom'
import { postGames } from '../../redux/actions'
import style from "../styles/creategame.module.css"


const validate = (input)=>{
  let errors = {}

  if(!input.name.trim() || /[$%&|<>#]/.test(input.name)){
    errors.name = "Name is required or invalid"
  }

  if(!input.description){
    errors.description = "Description is required"
  }

  if(!input.platforms.length){
    errors.platforms = "At least one platform is required"
  }

  if(!input.img){
    errors.img = "Image is required"
  }

  if(!input.releaseDate){
    errors.releaseDate = "Release date is required"
  }

  if(!input.genres.length){
    errors.genres = "At least one gender is required"
  }

  if(!input.rating){
    errors.rating = "The rating cannot be 0"
  }

  return errors
}



export default function CreateGame() {
  const dispatch = useDispatch()
  const generos = useSelector(state=> state.genres)

  const history = useHistory()

  const [errors, setErrors] = useState({})


  const [input,setInput] = useState({
    name: "",
    description:"",
    releaseDate:"",
    img:"",
    rating:0,
    platforms:[],
    genres:[]
  })

  const plataformas = ["PC","PS2","PS3","PS4","PS5","XBOX 360", "XBOX ONE", "XBOX SERIES X"]


  const handlerChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({...input, [e.target.name]: e.target.value}))

  }

  const handlerSelectPlatforms = (e)=>{
    if(e.target.value === "platforms") return
    let x = input.platforms.find(i=> i === e.target.value)
    if(x) return


    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })

    setErrors(validate({...input, platforms: e.target.value}))
  }
  const handlerSelectGenres = (e)=>{
    if(e.target.value === "genres") return;
    let x = input.genres.find(i=> i === e.target.value)
    if(x) return
    setInput({
      ...input,
      genres: [...input.genres, e.target.value]
    })

    setErrors(validate({...input, genres: e.target.value}))
 

  }

  const handlerDeletePlatforms= (e)=>{
    const x = input.platforms.filter(i=> i !== e)
    setInput({
      ...input,
      platforms: x
    })
  }

  const handlerDeleteGenres= (e)=>{
    const x = input.genres.filter(i=> i !== e)
    setInput({
      ...input,
      genres: x
    })
  }

  const handlerSubmit = async (e)=>{
    e.preventDefault()

    if(!input.name.length || !input.description.length || !input.platforms.length || !input.genres.length){
      alert("Falta completar campos obligatorios")
      return
    }

    if(Object.keys(errors).length) return;


    let y = {...input}

    y.genres = y.genres.map(el=>{
      let b = generos.find(l => l.name === el)
      return b.id
    })

    y.rating = Number(y.rating)
    console.log(input)
    await dispatch(postGames(y))
    alert("Personaje creado!")
    setInput({
      name: "",
      description:"",
      releaseDate:"",
      img:"",
      rating:0,
      platforms:[],
      genres:[]
    })

    history.push("/home")

  }

  let count = 0

  return (
    <div className={style.containerAll}>

      
      <div className={style.containerBtn}>

        <Link to={"/home"}>
          <button className={style.btn}>Back</button>
        </Link>
      </div>
        <div className={style.containerCreate}>
          <div className={style.containerTitle}>

        <h2 className={style.title}>Create your game!</h2>
          </div>
        <form onSubmit={e=>handlerSubmit(e)}>
          <div className={style.formF}>
          <div className={style.divs}>
            <label>Name:</label>
            <input className={style.inp} placeholder='Insert name...' minLength={"3"} onChange={e=>handlerChange(e)} type={"text"} value={input.name} name={"name"} />
            {errors.name&& (<p className={style.errors}>{errors.name}</p>)}
          </div>
          <div className={style.divs}>
            <label>Image url:</label>
            <input className={style.inp} placeholder='Insert image url...' onChange={e=>handlerChange(e)} type={"text"} value={input.img} name="img"/>
            {errors.img && (<p className={style.errors}>{errors.img}</p>)}
          </div>
          </div>
          <div className={style.formS}>
          <div className={style.divs}>
            <label className={style.select}>Release date: </label>
            <input className={style.inpa} onChange={e=>handlerChange(e)} type={"date"} value={input.releaseDate} name={"releaseDate"}/>
            {errors.releaseDate && (<p className={style.errors}>{errors.releaseDate}</p>)}
          </div>
          
          <div className={style.divs}>
            <label className={style.select}>Rating:</label>
            <input className={style.inp} onChange={e=>handlerChange(e)} type={"number"} value={input.rating} min="0" step={"0.01"} max="5" name="rating"/>
            {errors.rating&& (<p className={style.errors}>{errors.rating}</p>)}
          </div>
          </div>
          <div className={style.formT}>
          <div className={style.divT}>
            <label className={style.select}>Select platforms:</label>
            <select className={style.inpa} onChange={e=>handlerSelectPlatforms(e)}>
              <option value={"platforms"}>Platforms</option>
              {plataformas.map(i=>{
                return(
                  <option key={count--} value={i}>{i}</option>
                )
              })}
            </select>
            {errors.platforms&& (<p className={style.errors}>{errors.platforms}</p>)}
            <div className={style.ulO}>

            <ul>
              {input.platforms && input.platforms.map(i=>{
                return (
                  <li className={style.li} key={count-- + i}>{i} <button className={style.del} onClick={()=>handlerDeletePlatforms(i)}>X</button></li>
                  )
                })}
            </ul>
            </div>
          </div>
          <div className={style.divT}>
            <label className={style.select}>Select genres:</label>
            <select className={style.inpa} onChange={e=>handlerSelectGenres(e)}>
            <option value={"genres"}>Genres</option>


            {generos&& generos.map(i=>{
              return(
                <option key={i.name + count--}  value={i.name} >{i.name}</option>
              )
            })}
            </select>
            {errors.genres&& (<p className={style.errors}>{errors.genres}</p>)}
            <div className={style.ulO}>

            <ul>
              {input.genres && input.genres.map(i=>{
                return (
                  <li className={style.li} key={count-- + "a"} >{i} <button className={style.del} onClick={()=>handlerDeleteGenres(i)}>X</button></li>
                  )
                })}
            </ul>
            </div>
          </div>
          </div>
          <div className={style.containerDesc}>
            <textarea placeholder='Insert description here!' className={style.desc} minLength={"25"} onChange={e=>handlerChange(e)} value={input.description} name={"description"}/>
            {errors.description&& (<p className={style.errors}>{errors.description}</p>)}
          </div>
            <div className={style.containerSub}>

          <button  className={style.sub} type='submit'>Create game!</button>
            </div>
        </form>
        </div>
    </div>
  )
}
