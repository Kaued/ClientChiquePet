import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Login from '../../pages/User/Login';
import { useAppSelector } from '../useAppSelector';
import { Layout } from '../../components/Default/Layout';
import { TableUsers } from '../../pages/Users/TableUsers';
import { CreateUsers } from '../../pages/Users/CreateUser';
import { EditUser } from '../../pages/Users/EditUser';
import { NotFound } from '../../components/Default/NotFound';
import { TableCategories } from '../../pages/Category/TableCategories';
import { CreateCategory } from '../../pages/Category/CreateCategory';
import { EditCategory } from '../../pages/Category/EditCategory';

export const useGetRoutes = () => {
  const userState = useAppSelector((state) => state.auth);

  const router: RouteObject[] = [{ errorElement: <NotFound /> }];

  const authenticated = userState.authenticated;
  const roles = userState.roles;
  const token = userState.roles;

  if (
    authenticated &&
    roles !== null &&
    roles.includes('Seller') &&
    token !== null
  ) {
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

    router[1].children?.push({
      path: 'categories',
      element: <TableCategories />,
    });

    router[1].children?.push({
      path: 'categories/create',
      element: <CreateCategory />,
    });

    router[1].children?.push({
      path: 'categories/edit',
      element: <EditCategory />,
    });

    router[1].children?.push({
      path: 'users/profile',
      element: <EditUser autoEdit={true} />,
    });
    if (roles.includes('Super Admin')) {
      router[1].children?.push({
        path: 'users',
        element: <TableUsers />,
      });

      router[1].children?.push({
        path: 'users/create',
        element: <CreateUsers />,
      });

      router[1].children?.push({
        path: 'users/edit',
        element: <EditUser />,
      });
    }
  } else {
    router.push({
      path: 'login',
      element: <Login />,
    });
  }

  return createBrowserRouter(router);
};
