import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export default function Sec(){
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    return (<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <div>

        <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              style={{margin:"20px",width:"300px" }}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              value={password}
            />
    </div>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#202124",width:"300px" }}
              onClick={async()=>{
                localStorage.setItem('pass',password);
                navigate('/add');
              }}
            >
              Enter
            </Button>
    </div>)
}