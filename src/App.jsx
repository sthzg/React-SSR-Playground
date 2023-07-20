import { Route, Routes } from 'react-router-dom';
import Error404 from './pages/Error404.jsx';

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob(['./pages/*.jsx', '!./pages/Error*.jsx'], {
  eager: true,
});

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});

export function App() {
  return (
    <Routes>
      {routes.map(({ path, component: RouteComp }) => (
        <Route key={path} path={path} element={<RouteComp />} />
      ))}
      <Route key="*" path="*" element={<Error404 />} />
    </Routes>
  );
}
