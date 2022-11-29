import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import commentService from '../../Services/CommentService';
import authService from '../api-authorization/AuthorizeService';
import jwt from 'jwt-decode';

export const CommentsList = () => {
    const { commentId } = useParams();
	const Navigate = useNavigate();
	const [ comments, setComments ] = useState([]);
    const [ userId , setUserId ] = useState(0);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		const getComments = async () => {
			const comments = await commentService.getComments(commentId);
			setComments(comments);
			setLoading(false);
		}
		getComments();
	}, [commentId]);

    useEffect(() => {
        const setUser = async() => {
            const token = await authService.getAccessToken();
            const user = jwt(token); 
            setUserId(user.sub);
        }
        setUser();
    }, [])


	return (
		<div>
            <h1 id="tabelLabel" >Guest book comments</h1>
            <div className="col-sm-6">
                <p> Welcome to this guestbook, feel free to leave a message for others to read!</p>
            </div>
            <div className="col-sm-6">
                <p className="Link" onClick={() => Navigate('/comments/add')}>Add Comment</p>
            </div>
			{loading ? (
				<p><em>Loading...</em></p>
			) : (
                comments.map((comment,i) => 
                    <div key={i} className="container border border-dark rounded bg-light card"> 
                        <div className="row border-bottom border-dark">
                            <div className="col font-weight-bold">{comment.title}</div>
                            <div className="col">
                                {comment.author.id === userId && (
                                    <div className="float-right">
                                        <p className="Link" onClick={() => Navigate('/comments/delete/' + comment.id)}> Delete</p>
                                        <p className="Link" onClick={() => Navigate('/comments/edit/' + comment.id)}> Edit</p> 
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {comment.description}
                        </div>
                    </div>
                    <div className="row border-top border-dark">
                        <div className="col">By: {comment.author.firstname} {comment.author.lastname}</div>
                        <div className="col">
                            <div className="float-right">
                                <p>Posted on - {comment.createdDate} <br></br> Last edited - {comment.updatedDate} </p>
                            </div>
                        </div>
                        </div>
                    </div>          
                )                    
              )}
		</div>
	);
}