import React, { Component } from 'react';
import CommentService from './CommentService'
import { Link } from 'react-router-dom';
import authService from '../api-authorization/AuthorizeService'

export class Comments extends Component {
  static displayName = Comments.name;

    constructor(props) {
    super(props);
        this.state = { comments: [], loading: true };
    }

    componentDidMount() {
        this.populateCommentData();
    }

  static renderCommentsTable(comments) {
      return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>Created At</th>
                      <th>Last modified At</th>
                      <th> Delete </th>
                      <th> Edit </th>
                </tr>
            </thead>
        <tbody>
            {comments.map(comment =>
                <tr key={comment.id}>
                    <td>{comment.title}</td>
                    <td>{comment.description}</td>
                    <td>{comment.author.firstname} {comment.author.lastname}</td>
                    <td>{comment.createdDate}</td>
                    <td>{comment.updatedDate}</td>
                    <td><Link to={'/comments/delete/' + comment.id}>Delete</Link></td>
                    <td><Link to={'/comments/edit/' + comment.id}>Edit</Link></td>
                </tr>
            )}
        </tbody>
    </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : Comments.renderCommentsTable(this.state.comments);

    return (
      <div>
            <h1 id="tabelLabel" >Guest book comments</h1>
            <div className="col-sm-6">
                <p> Welcome to this guestbook, feel free to leave a message for others to read!</p>
            </div>
            <div className="col-sm-6">
                <Link to='/comments/add'>Add Comment</Link>
            </div>
        {contents}
      </div>
    );
  }

    async populateCommentData() {
        const data = await CommentService.getComments();
        this.setState({ comments: data, loading: false });
    }

}
