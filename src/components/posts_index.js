import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

//este es el Action que queremos llamar en ComponentWillMount:
import {fetchPosts} from '../actions/index';

class PostsIndex extends Component{
	
	//react renderizara la action, cuando esta a punto de renderizarse en el DOM por primera vez (las siguientes veces no se cargara, solo la primera vez)
	componentWillMount(){
		this.props.fetchPosts();

	}


	renderPosts(){
		return this.props.posts.map((post) => {
			return(
				<li className="list-group-item" key={post.id}>
					<Link to={"posts/" + post.id}>
						<span className="pull-xs-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</Link>
				</li>
			);			
		});
	}


	//Se usa LINK en este componente para vincularse con el otro componente:
	render(){
		return(

			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}


function mapStateToProps(state){
	return {posts:state.posts.all};
}


function mapDispatchToProps(dispatch){

	//con esto, "fetchPosts" (que es 1 de los 3 action creators) se vuelve un props a usar dentro del componente "PostsIndex":
	return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);