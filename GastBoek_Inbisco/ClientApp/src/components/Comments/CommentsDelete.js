import React, { Component } from 'react';
import commentService from './CommentService';

export class CommentsDelete extends Component {
	constructor(props) {
		super(props);
		this.state = { Comments: [], loading: true };

		// I know this doesn't look great. I just have no idea about the hooks and way of dynamic functions for now.
		const firstId = window.location.href.match(/[0-9]+$/)
		this.commentId = firstId[0]
	}

	componentDidMount() {

	}

	handleClickOk = () => {

		(async () => {
			await commentService.deleteComment(this.commentId);
		})();

	}


	render() {
		return (
			<div>
				<h2>Are you sure you want to delete this comment?</h2>

				<button onClick={this.handleClickOk}>Yes</button>
			</div>
		);
	}
}

