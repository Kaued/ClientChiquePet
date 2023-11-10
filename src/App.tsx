import './App.scss';
import { useGetRoutes } from './hooks/routes/useGetRoutes';
import { RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const router = useGetRoutes();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
