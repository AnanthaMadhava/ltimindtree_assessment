import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Layout from './component/layout/Layout';
import Register from './component/reg_login/Register';
import Login from './component/reg_login/Login';
import PrivateRoute from './PrivateRoute';
import CreateEvent from './component/events/CreateEvent';
import EventList from './component/events/EventList';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Authenticated Routes */}
          <Route path='/' element={<PrivateRoute component={Home} />}/>
          <Route path='/create-event' element={<PrivateRoute component={CreateEvent} />} />
          <Route path='/event-list' element={<PrivateRoute component={EventList} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;