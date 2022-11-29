import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import commentService from '../../Services/CommentService';

export const NewCommentsDelete = () => {
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
		await commentService.deleteComment(commentId, comment);
		navigate('/');
	}

	return (
		<div>
			<h1 id="tabelLabel">Deleting Comment: {comment.title} </h1>
			{loading ? (
				<p><em>Loading...</em></p>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="form-group row">
						<label htmlFor="Title" className="col-sm-2 col-form-label">Title</label>
						<div className="col-sm-10">
							{comment.title}
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="Description" className="col-sm-2 col-form-label">Description</label>
						<div className="col-sm-10">
							{comment.description}
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			)}
		</div>
	);
}
