import React, { Component } from 'react';
import commentService from './CommentService';


export class CommentsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: {
				description: '',
				title: ''
			}, loading: true
		};

		const url = window.location.href
		const firstId = url.split("?")[0].match(/[0-9]+$/)
		this.commentId = firstId[0];

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieveFormData();
	}

	handleChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.state.comment[name] = value;
		this.setState({
			[name]: value
		});
	}

	handleSubmit = (event, values) => {
		console.log(values);
		(async () => {
			await commentService.updateComment(this.commentId, this.state.comment);
		})();
	}

	rendercommentForm(comment) {
		return (
			<form model={comment} onSubmit={this.handleSubmit}>
				<div className="form-group row">
					<label htmlFor="Title" className="col-sm-2 col-form-label">Title</label>
					<div className="col-sm-10">
						<input
							name="title"
							type="text"
							className="form-control"
							maxLength={255}
							id="title"
							value={comment.title}
							onChange={this.handleChange} />
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="Description" className="col-sm-2 col-form-label">Description</label>
					<div className="col-sm-10">
						<input
							name="description"
							type="text"
							className="form-control"
							maxLength={255}
							id="description"
							value={comment.description}
							onChange={this.handleChange} />
					</div>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: this.rendercommentForm(this.state.comment);

		return (
			<div>
				<h1 id="tabelLabel">Editing Comment {this.state.comment.title} </h1>
				{contents}
			</div>
		);
	}

	async retrieveFormData() {
		const data = await commentService.getComment(this.commentId);
		console.log(data);
		this.setState({ loading: false });
		this.state.comment.description = data.description;
		this.state.comment.title = data.title;
	}
}
