import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth_services'
import {login, logout} from './store/autsSlice';
import {Header, Footer} from './Components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getcurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  },[])
  
  // if loading false so render first data
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'
    style={{backgroundColor: '#000235'}}>
      <div className='mx-auto block m-4'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      </div>
    </div>
  ) : null
}

export default App