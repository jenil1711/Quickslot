import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
function AddItem() {
  const navigate = useNavigate();
  const [item, setItem] = React.useState("");
  const [img,setImg]=React.useState("");
  const [cnt,setCnt]=React.useState(0);
  return (
    <>

      <Card
        sx={{ minHeight: "85vh" }}
        style={{
          borderRadius: 0,
          marginTop: "10px",
          boxShadow: "0px 0px 3px black",
        }}
      >
       <Button variant="contained" style={{float:"right"}} onClick={()=>{
          navigate('/table')
        }}>table</Button>
        <Typography
          style={{
            margin: "20px",
            fontSize: "40px",
          }}
        >
          Add Item:
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "500px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"

              onChange={(e)=>{
                setItem(e.target.value);
              }}
              value={item}
            />
            <TextField
              id="outlined-basic"
              label="Image Link"
              variant="outlined"
              
              onChange={(e)=>{
                setImg(e.target.value);
              }}
              value={img}
            />
            <TextField
              id="outlined-basic"
              label="Count"
              variant="outlined"
              type="number"
              onChange={(e)=>{
                setCnt(e.target.value);
              }}
              value={cnt}
            />
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#202124" }}
              onClick={async()=>{
                
                const res=await axios.post('http://localhost:3000/additem',{
                  id:item,
                  img,
                  cnt,
                  p:localStorage.getItem('pass')
                })
                localStorage.setItem('pass',null);
                navigate('/');
              }}
            >
              Add Item
            </Button>
          </div>
        </div>
        
      </Card>
    </>
  );
}
export default AddItem;
