import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class PostsShow extends Component{
	static contextTypes = {
		router: PropTypes.object
	};


	componentWillMount(){
		this.props.fetchPost(this.props.params.id);
	}


	onDeleteClick(){
		this.props.deletePost(this.props.params.id)
			.then(()=> {this.context.router.push('/'); });

	}


	render(){
		if(!this.props.post){
			return <div>Loading...</div>
		}

		return (
			<div>
				<Link to="/">Back To Index</Link>
				<button className="btn btn-danger float-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
				<h3>{this.props.post.title}</h3>
				<h6>Categories:  {this.props.post.categories}</h6>
				<p>{this.props.post.content}</p>
			</div>
		);
	}
}


function mapStateToProps(state){
	return {post: state.posts.post};
}


function mapDispatchToProps(dispatch){

	//con esto, "fetchPost" y "deletePost" (que es 1 de los 3 action creators) se vuelve un props a usar dentro del componente "PostsIndex":
	return bindActionCreators({fetchPost, deletePost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);