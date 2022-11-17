import React, { Component } from 'react';
import commentService from './CommentService';


export class CommentsAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        (async () => {
            await commentService.addComment(this.state);
        })();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1> Add a new comment</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="Title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input
                                name="title"
                                type="text"
                                maxLength={255}
                                className="form-control"
                                id="title"
                                placeholder="Title"
                                value={this.state.title}
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
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

