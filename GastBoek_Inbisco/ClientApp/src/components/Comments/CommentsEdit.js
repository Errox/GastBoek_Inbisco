import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import commentService from '../../Services/CommentService';

export const NewCommentsEdit = () => {
	const { commentId } = useParams();
	const navigate = useNavigate();
	const [ comment, setComment ] = useState({ title: '', description: '' });
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		const getComment = async () => {
			const comment = await commentService.getComment(commentId);
			setComment({ title: comment.title, description: comment.description });
			setLoading(false);
		}
		getComment();
	}, [commentId]);

	const handleSubmit = async e => {
		e.preventDefault();
		await commentService.updateComment(commentId, comment);
		navigate('/');
	}

	const handleChange = e => setComment(previousState => ({ ...previousState, [e.target.name]: e.target.value }));

	return (
		<div>
			<h1 id="tabelLabel">Editing Comment: {comment.title} </h1>
			{loading ? (
				<p><em>Loading...</em></p>
			) : (
				<form onSubmit={handleSubmit}>
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
								onChange={handleChange} />
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
								onChange={handleChange} />
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			)}
		</div>
	);
}
