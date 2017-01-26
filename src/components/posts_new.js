import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class PostsNew extends Component{
	static contextTypes = {
		router: PropTypes.object
	};


	onSubmit(props){
		this.props.createPost(props)
		 .then(() => {
				//cuando se esta en esta parte, el POST ya fue creado
				//luego, con el callback ".then()" nos llevara a la pagina inicial usando "this.context.router.push()" 
				this.context.router.push('/');
			});	
	}

	render(){

		//traemos como PROPs a estas variables desde ReduxForm, declaro en las ultimas lineas de esta pagina:
		const handleSubmit = this.props.handleSubmit;
		const title = this.props.fields.title;
		const categories = this.props.fields.categories;
		const content = this.props.fields.content;
		//const {fields: {title, categories, content}, handleSubmit} = this.props;

		
		//con esto veremos que propiedades me envia ReduxForm en el "field TITLE":
		//console.log(title);		


		//TODAS las propiedades que vimos en TITLE, las enviaremos tal cual a cada <input> con {...title}, de esta manera ReduxForm toma CONTROL de estos campos:
		return(

			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new Post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control " {...title}/>
					<div className="text-help" >
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className="form-control" {...content}/>
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}


function validate(values){
	const errors = {};


	if(!values.title){
		errors.title = 'Enter a username';
	}

	if(!values.categories){
		errors.categories = 'Enter categories';
	}
	
	if(!values.content){
		errors.content = 'Enter a content';
	}

	return errors;
}



function mapDispatchToProps(dispatch){

	//con esto, "fetchPosts" se vuelve un props a usar dentro del componente "PostsIndex":
	return bindActionCreators({createPost}, dispatch);
}


//diferenias entre CONNECT vs REDUXFORM se encuentran en los argumentos q reciben, pero funcionan de la misma manera::
//-Connect::   1er Argument: 'mapStateToProps',  2do Argument: 'mapDispatchToProps'
//-ReduxForm:: 1er Arg: 'form config', 2do Arg: mapStateToProps, 3er Arg:mapDispatchToProps
export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, mapDispatchToProps)(PostsNew);
//notar que de esta manera, se envia el "createPost" como PROPs