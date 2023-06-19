import './App.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import AboutUs from './pages/AboutUs'
import AddPost from './pages/AddEditPost'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Footer from './components/Footer'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='App'>
					<Header appTitle={'Blog'} />
					<ToastContainer />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/post/:id' element={<SinglePost />} />
						<Route path='/add-post' element={<AddPost />} />
						<Route path='/edit-post/:id' element={<AddPost />} />
						<Route path='/about-us' element={<AboutUs />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
					<Footer/>
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
