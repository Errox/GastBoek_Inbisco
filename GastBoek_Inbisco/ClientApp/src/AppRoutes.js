import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Comments } from "./components/Comments/CommentsList";
import { CommentsAdd } from "./components/Comments/CommentsAdd";
import { CommentsDelete } from "./components/Comments/CommentsDelete";
import { CommentsEdit } from "./components/Comments/CommentsEdit";

const AppRoutes = [
    {
        index: true,
        element: <Comments />
    },
    {
        path: '/comments',
        element: <Comments />
    },
    {
        path: '/comments/add',
        requireAuth: true,
        element: <CommentsAdd />
    },
    {
        path: '/comments/delete/:commentId',
        requireAuth: true,
        element: <CommentsDelete />
    },
    {
        path: '/comments/edit/:commentId',
        requireAuth: true,
        element: <CommentsEdit />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
