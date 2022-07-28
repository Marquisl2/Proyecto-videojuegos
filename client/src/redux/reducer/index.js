import {GET_GAMES,
    POST_GAMES,
    GAME_DETAIL,
    GET_GENRES,
    FILTER_FROM,
    ORDER_ALF,
    ORDER_RATING,
    GET_GAME_BY_NAME,
    ORDER_GENRE} from "../actions/index"

const initialState = {
    games: [],
    gameDetail: {},
    genres: [],
    allGames: [],
    gamesBackup:[]
  };
  
  const rootReducer = (state = initialState, action) => {
        switch(action.type){
            case GET_GAMES:

                return {
                    ...state,
                    games:action.payload,
                    allGames: action.payload,
                    gamesBackup: action.payload
                }
            case GAME_DETAIL:
                return{
                    ...state,
                    gameDetail:action.payload
                }
            case GET_GENRES:
                return{
                    ...state,
                    genres: action.payload
                }
            case ORDER_ALF:

                const filterAlf = action.payload === "orderAaZ" 
                ? state.games.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    return 0
                  })
                : state.games.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                  })
                return{
                    ...state,
                    games: action.payload === "All" ? state.games : filterAlf
                }

            case ORDER_RATING:
                const rFiltered = action.payload === "orderRatingP" 
                ? state.games.sort((a,b)=>b.rating - a.rating)
                :state.games.sort((a,b)=>a.rating - b.rating)

                return{
                    ...state,
                    games: action.payload === "All"? state.games:  rFiltered,
                    allGames: action.payload === "All"? state.games:  rFiltered

                }

            case FILTER_FROM:
                const allGamesFa = state.gamesBackup
                let resultDb = allGamesFa.filter(i=> i.createdAtDb)
                let resultApi = allGamesFa.filter(i=> !i.createdAtDb)
                const fromFilter = action.payload === "gamesDb"? resultDb : resultApi
                return{
                    ...state,
                    games: action.payload === "All" ? state.gamesBackup : fromFilter
                }

            

            case GET_GAME_BY_NAME:
                return{
                    ...state,
                    games: action.payload
                }
           
            case POST_GAMES:
                return{
                    ...state,
                    games: [...state.games, action.payload]
                }
            case ORDER_GENRE:
                const allGamesF = state.gamesBackup
                 const filtered = action.payload === "All" ? state.gamesBackup :allGamesF.filter(i=>i.genres.includes(action.payload) )
                return{
                    ...state,
                    games: filtered
                    
                }

            default:
                return state
        }
    }
  
  
  export default rootReducer;
  