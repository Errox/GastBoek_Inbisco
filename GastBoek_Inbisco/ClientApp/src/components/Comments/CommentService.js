import authService from '../api-authorization/AuthorizeService'

export class CommentService{
    async getComments() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/comments', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    }

    async addComment(comment) {
		const token = await authService.getAccessToken();
		try {
			const headers = { 'content-type': 'application/json' };
			if (token) headers['Authorization'] = `Bearer ${token}`;


			const response = await fetch('api/comments', {
				method: 'POST',
				body: JSON.stringify(comment),
				headers: headers,
			});

			if (response.ok) {
				return;
			}
			else {
				throw new Error("HTTP error! Code: " + response.status);
			}
		}
		catch (error) {
			console.log(error);
			throw error;
		}
	}


	async updateComment(commentId, comment) {
		const token = await authService.getAccessToken();

		try {
			const headers = { 'content-type': 'application/json' };
			if (token) headers['Authorization'] = `Bearer ${token}`;

			const response = await fetch('api/comments/' + commentId, {
				method: 'PUT',
				body: JSON.stringify(comment),
				headers: headers,
			});

			if (response.ok) {
				return;
			}
			else {
				throw new Error("HTTP error! Code: " + response.status);
			}
		}
		catch (error) {
			console.log(error);
			throw error;
		}
	}

	async deleteComment(commentId) {
		const token = await authService.getAccessToken();

		try {
			const headers = { 'content-type': 'application/json' };
			if (token) headers['Authorization'] = `Bearer ${token}`;

			const response = await fetch('api/comments/' + commentId, {
				method: 'DELETE',
				headers: headers,
			});

			if (response.ok) {
				return;
			}
			else {
				throw new Error("HTTP error! Code: " + response.status);
			}
		}
		catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getComment(commentId) {
		const token = await authService.getAccessToken();
		const response = await fetch('api/comments/' + commentId, {
			headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
		});
		const data = await response.json();
		return data;
	}

}


const commentService = new CommentService();

export default commentService;