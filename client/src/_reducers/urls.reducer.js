import { urlConstants } from '../_constants';

export function urls(state = {}, action) {
  switch (action.type) {
    case urlConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case urlConstants.GETALL_SUCCESS:
      return {
        items: action.urls
      };
    case urlConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case urlConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case urlConstants.CREATE_SUCCESS:
      var urls = state.items;
      urls.push(action.url);
      return {
        items: urls
      };
    case urlConstants.CREATE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}