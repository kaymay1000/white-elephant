import { 
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main.tsx';
import SetupPage from './pages/SetupPage.tsx';
// import SetupPageTemp from './pages/SetupPageTemp';

const App = () => {
  let routes = useRoutes([
    {path: "/", element: <Main aProp={'foo'} />},
    {path: "/setup", element: <SetupPage/>}
    // {path: "/setup", element: <SetupPageTemp/>}
  ]);
  return routes;
}

const AppWrapper = () => {
  return (
    <Router>
      <App className="h-screen">
        <Header />
      </App>
    </Router>
  )
}

export default AppWrapper;
