import React, { Component } from 'react';
import CommentService from './CommentService'
import { Link } from 'react-router-dom';

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

          <div>
              {comments.map(comment =>
                  <><div key={comment.id} className="container border border-dark rounded bg-light">
                      <div className="row border-bottom border-dark">
                          <div className="col font-weight-bold">{comment.title}</div>
                          <div className="col">
                              <div className="float-right">
                                  <p><Link to={'/comments/delete/' + comment.id}>Delete</Link> | <Link to={'/comments/edit/' + comment.id}>Edit</Link></p>
                              </div>
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
                      <hr></hr>
                  </>
              )}
          </div>

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
