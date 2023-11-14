import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Login from '../../pages/User/Login';
import { useAppSelector } from '../useAppSelector';
import { Layout } from '../../components/Default/Layout';
import { NotFound } from '../../components/Default/NotFound';
import { Register } from '../../pages/User/Register/Register';
import { Profile } from '../../pages/User/Profile';

export const useGetRoutes = () => {
  const userState = useAppSelector((state) => state.auth);

  const router: RouteObject[] = [{ errorElement: <NotFound /> }];

  const authenticated = userState.authenticated;
  const roles = userState.roles;
  const token = userState.roles;

  router.push({
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <div>oi</div>,
      },
    ],
  });

  if (authenticated && roles !== null && roles.includes('Client') && token !== null) {
    router[1].children?.push({
      path: 'profile',
      element: <Profile />,
    });
  } else {
    router.push({
      path: 'login',
      element: <Login />,
    });

    router.push({
      path: 'register',
      element: <Register />,
    });
  }

  return createBrowserRouter(router);
};
