import {FETCH_POSTS, FETCH_POST} from '../actions/index';


const INITIAL_STATE = { all: [], post: null };

export default function(state =  INITIAL_STATE, action){

	switch(action.type){

	case FETCH_POST:
		return {...state, post: action.payload.data};

	case FETCH_POSTS:
		//REducer toma la informacion del Action Creator, para luego enviarse a "posts_index.js"
		return {...state, all: action.payload.data};


	default:
		return state;

	}
}