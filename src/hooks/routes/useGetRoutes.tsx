import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Login from '../../pages/User/Login';
import { useAppSelector } from '../useAppSelector';
import { Layout } from '../../components/Default/Layout';
import { NotFound } from '../../components/Default/NotFound';
import { Register } from '../../pages/User/Register/Register';
import { Profile } from '../../pages/User/Profile';
import { Home } from '../../pages/Home/Home';
import { ListProduct } from '../../pages/Product/ListProduct';
import { ListProductSearch } from '../../pages/Product/ListProductSearch';
import { ListProductCategory } from '../../pages/Product/ListProductCategory';
import { SingleProduct } from '../../pages/Product/SingleProduct';
import { EndCart } from '../../pages/Cart/EndCart';
import { FinishCart } from '../../pages/Cart/FinishCart';
import { OrderList } from '../../pages/Order/OrderList';
import { SingleOrder } from '../../pages/Order/SingleOrder';

export const useGetRoutes = () => {
  const userState = useAppSelector((state) => state.auth);

  const router: RouteObject[] = [{ errorElement: <NotFound /> }];

  const authenticated = userState.authenticated;
  const roles = userState.roles;
  const token = userState.roles;

  router.push({
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "produtos",
        element: <ListProduct />,
      },
      {
        path: "produtos/:filter",
        element: <ListProduct />,
      },
      {
        path: "produtos/pesquisar/:search",
        element: <ListProductSearch />,
      },
      {
        path: "produtos/categoria/:filter",
        element: <ListProductCategory />,
      },

      {
        path: "produto/:productParam",
        element: <SingleProduct />,
      },

      {
        path: "carrinho",
        element: <EndCart />,
      },

    ],
  });

  if (authenticated && roles !== null && roles.includes('Client') && token !== null) {
    router[1].children?.push(
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "finalizar/pedido",
        element: <FinishCart />,
      },
      {
        path: "profile/pedidos",
        element: <OrderList />,
      },
      {
        path: "pedido/:id",
        element: <SingleOrder />,
      },
    );
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
