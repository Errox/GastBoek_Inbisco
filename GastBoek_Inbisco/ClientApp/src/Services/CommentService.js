import authService from '../components/api-authorization/AuthorizeService'

export class CommentService{
    async getComments() {
        const token = await authService.getAccessToken();
        const response = await fetch(url, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
		return data;
    }

    async addComment(comment) {
		const token = await authService.getAccessToken();
		try {
			if (token) headers['Authorization'] = `Bearer ${token}`;
			const response = await fetch(url, {
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
			if (token) headers['Authorization'] = `Bearer ${token}`;
			const response = await fetch(url + commentId, {
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
			if (token) headers['Authorization'] = `Bearer ${token}`;

			const response = await fetch(url + commentId, {
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
		const response = await fetch(url + commentId, {
			headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
		});
		const data = await response.json();
		return data;
	}

}


const commentService = new CommentService();
const headers = { 'content-type': 'application/json' };
const url = "api/comments/";

export default commentService;