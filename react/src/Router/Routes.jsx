import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Blogs from '../pages/Blogs/Blogs';
import ShowBlogs from '../pages/Blogs/ShowBlogs';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function RouterRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Blogs/:slug" element={<ShowBlogs />} />
        </Routes>

    );
}
