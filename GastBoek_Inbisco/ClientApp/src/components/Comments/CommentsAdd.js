import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import commentService from '../../Services/CommentService';


export const NewCommentsAdd = () => {
	const navigate = useNavigate();
	const [ comment, setComment ] = useState({ title: '', description: '' });

	const handleSubmit = async e => {
		e.preventDefault();
		await commentService.addComment(comment);
		navigate('/');
	}

	const handleChange = e => setComment(previousState => ({ ...previousState, [e.target.name]: e.target.value }));

	return (
		<div>
			<h1 id="tabelLabel">Adding Comment</h1>
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
                            onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		</div>
	);
}
