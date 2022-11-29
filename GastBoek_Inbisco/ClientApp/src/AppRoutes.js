import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { CommentsList } from "./components/Comments/CommentsList";
import { NewCommentsAdd } from "./components/Comments/CommentsAdd";
import { NewCommentsDelete } from "./components/Comments/CommentsDelete";
import { NewCommentsEdit } from "./components/Comments/CommentsEdit";

const AppRoutes = [
    {
        index: true,
        element: <CommentsList />
    },
    {
        path: '/comments/add',
        requireAuth: true,
        element: <NewCommentsAdd />
    },
    {
        path: '/comments/delete/:commentId',
        requireAuth: true,
        element: <NewCommentsDelete />
    },
    {
        path: '/comments/edit/:commentId',
        requireAuth: true,
        element: <NewCommentsEdit />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
