import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Landing from './Landing';
import BookForm from './Form';
import AddItem from './Additem';
import Sec from './Sec';
import Table from './Table';
import Nav from './component/Nav';
function App() {
    return (
        <>
            <Router>
            <Nav/>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/add" element={<AddItem/>}/>
                    <Route path="/sec" element={<Sec/>}/>
                    <Route path="/table" element={<Table/>}/>
                    <Route path="/book/:sport" element={<BookForm/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
