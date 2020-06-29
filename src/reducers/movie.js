const initialState = {
  fav: [],
  wishlist: [],
  actor_array: [],
  dir_array: [],
  year_array: [],
  search_data: [],
  filter_data: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAV':
      return {
        ...state,
        fav: action.payload
      }
    case 'SET_WL':
      return {
        ...state,
        wishlist: action.payload
      }
    case 'SET_DATA':
      return {
        ...state,
        filter_data: action.payload
      }
    case 'SET_SEARCH':
      return {
        ...state,
        search_data: action.payload
      }
    case 'SET_AA':
      return {
        ...state,
        actor_array: action.payload
      }
    case 'SET_DA':
      return {
        ...state,
        dir_array: action.payload
      }
    case 'SET_YA':
      return {
        ...state,
        year_array: action.payload
      }
    default:
      return {
        ...state
      }
  }
}