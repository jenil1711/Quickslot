import React, { useEffect, useState } from 'react';
import Card from './component/Card';
import { useNavigate } from 'react-router-dom';
import './Landing.css'
import Nav from './component/Nav';
import axios from 'axios';
import Button from "@mui/material/Button";

export default function Landing() {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    useEffect(()=>{
        async function init(){
            const res=await axios.get('http://localhost:3000/allitems/users');
            setData(res.data);
        }
        init();
    },[])
    function func(id) {
        navigate(`/book/${id}`);
    }
    return (
        <>
            <div>
            
            </div>
            <div className="container">
                {data.map(item => (
                    <Card sport={item} func={func} />
                ))}
            </div>
            <div>
           
            </div>
        </>
    );

}