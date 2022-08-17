import axios from "axios"
export const GET_GAMES = "GET_GAMES"
export const POST_GAMES = "POST_GAMES"
export const GAME_DETAIL = "GAME_DETAIL"
export const GET_GENRES = "GET_GENRES"
export const ORDER_ALF = "ORDER_ALF"
export const FILTER_FROM = "FILTER_FROM"
export const ORDER_RATING = "ORDER_RATING"
export const ORDER_GENRE = "ORDER_GENRE"
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME"
export const GET_PLATFORMS = "GET_PLATFORMS"
export const CLEAR_DETAILS = "CLEAR_DETAILS"


export const clearDetails = ()=>{
    return{
        type: CLEAR_DETAILS,
        payload: {}
    }
}

export const getGames = ()=>{
    return async function (dispatch) {
        
        return fetch("http://localhost:3001/videogames")
            .then(response => response.json())
          .then(data=>dispatch({type: GET_GAMES, payload: data}))
        
      };
}

export const postGames = (objGame)=>{
    return async function (dispatch) {
        
        return axios.post(`http://localhost:3001/videogames`,objGame)
          .then(response=>dispatch({type: POST_GAMES, payload: response.data}))
          .catch(e=>console.log(e))
        
      };
}

export const gameDetail = (id)=>{
    return async function (dispatch) {
        
        return fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
          .then(data=>dispatch({type: GAME_DETAIL, payload: data}))
        
      };
}

export const getGameByName =(payload/*name*/)=>{
    // return async function(dispatch){
    //     try {
    //         return fetch(`/videogames?name=${name}`)
    //         .then(response => response.json())
    //       .then(data=>dispatch({type: GET_GAME_BY_NAME, payload: data}))   
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return{
        type: GET_GAME_BY_NAME,
        payload:payload/*name*/
    }
}

export const getGenres = ()=>{
    return async function (dispatch) {
        
        return fetch(`http://localhost:3001/genres`)
            .then(response => response.json())
          .then(data=>dispatch({type: GET_GENRES, payload: data}))
        
      };
}

export const getPlatforms = ()=>{
    return async function (dispatch) {
        
        return fetch(`http://localhost:3001/platforms`)
            .then(response => response.json())
          .then(data=>dispatch({type: GET_PLATFORMS, payload: data}))
        
      };
}

export const orderAlf = (payload)=>{
    return {
        type: ORDER_ALF,
        payload:payload
    }
}
export const filterFrom = (payload)=>{
    return {
        type: FILTER_FROM,
        payload:payload
    }
}

export const orderRating = (payload)=>{
    return {
        type: ORDER_RATING,
        payload:payload
    }
}



export const orderGenre = (genero)=>{
    return{
        type: ORDER_GENRE,
        payload:genero
    }
}
