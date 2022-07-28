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
    allGames: []
  };
  
  const rootReducer = (state = initialState, action) => {
        switch(action.type){
            case GET_GAMES:

                return {
                    ...state,
                    games:action.payload,
                    allGames: action.payload,
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
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                  })
                : state.games.sort((a, b) => {
                    if (a.name > b.name) return -1
                    if (a.name < b.name) return 1
                    return 0
                  })
                return{
                    ...state,
                    games: action.payload === "All" ? state.allGames : filterAlf
                }

            case ORDER_RATING:
                const rFiltered = action.payload === "orderRatingP" 
                ? state.games.sort((a,b)=>b.rating - a.rating)
                :state.games.sort((a,b)=>a.rating - b.rating)

                return{
                    ...state,
                    games: action.payload === "All"? state.allGames:  rFiltered

                }

            case FILTER_FROM:
                const allGamesFa = state.allGames
                const fromFilter = action.payload === "gamesDb"? allGamesFa.filter(i=> i.createdAtDb) : allGamesFa.filter(i=> !i.createdAtDb)
                return{
                    ...state,
                    games: action.payload === "All" ? state.allGames : fromFilter

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
                const allGamesF = state.allGames
                 const filtered = action.payload === "All" ? allGamesF :allGamesF.filter(i=>i.genres.includes(action.payload) )
                return{
                    ...state,
                    games: filtered
                    
                }

            default:
                return state
        }
    }
  
  
  export default rootReducer;
  