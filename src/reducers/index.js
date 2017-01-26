import { combineReducers } from 'redux';
import  PostsReducer  from './reducer_posts';

//best practice al usar redux-form es crear una variable (en este caso "formReducer") para que no haya conflicto:
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
