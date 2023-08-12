import HomePage from 'Page/HomePage';
import LoginPage from 'Page/LoginPage';
import SignupPage from 'Page/SignupPage';
import PostPage from 'Page/PostPage';
import CreatePost from 'Page/CreatePost';
import MyProfilePage from 'Page/YourPage/MyProfilePage';
import MyCommissionsPage from 'Page/YourPage/MyCommissionsPage/MyCommissionsPage';
import MyTradePage from 'Page/YourPage/MyTradePage/MyTradePage';
import TradePage from 'Page/TradePage';
import SearchPage from 'Page/SearchPage';
import FormPage from 'Page/FormPage';
import AuthorPage from 'Page/AuthorPage';
import NotFoundPage from 'Page/NotFoundPage';

export const routerList = [
  {
    id: 1,
    path: '/',
    isPrivate: false,
    element: <HomePage />,
  },
  {
    id: 2,
    path: '/login',
    isPrivate: true,
    element: <LoginPage />,
  },
  {
    id: 3,
    path: '/signup',
    isPrivate: true,
    element: <SignupPage />,
  },
  {
    id: 4,
    path: '/search/:result',
    isPrivate: false,
    element: <SearchPage />,
  },
  {
    id: 5,
    path: '/commission/:id',
    isPrivate: false,
    element: <PostPage />,
  },
  {
    id: 6,
    path: '/trade/:id',
    isPrivate: true,
    element: <TradePage />,
  },
  {
    id: 7,
    path: '/create-commission',
    isPrivate: true,
    element: <CreatePost />,
  },
  {
    id: 8,
    path: '/form/:id',
    isPrivate: true,
    element: <FormPage />,
  },
  {
    id: 10,
    path: '*',
    isPrivate: false,
    element: <NotFoundPage />,
  },
  {
    id: 11,
    path: '/edit-commission/:id',
    isPrivate: true,
    element: <CreatePost />,
  },
  {
    id: 12,
    path: '/myprofile/:id',
    isPrivate: true,
    element: <MyProfilePage />,
  },
  {
    id: 13,
    path: '/mycommissions/:id',
    isPrivate: true,
    element: <MyCommissionsPage />,
  },
  {
    id: 14,
    path: '/mytrades/:id',
    isPrivate: true,
    element: <MyTradePage />,
  },
  {
    id: 15,
    path: '/author/:id',
    isPrivate: false,
    element: <AuthorPage />,
  },
];

// 출처: seb39_main_013
