import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function Table(){
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [day,setDay] = useState(0);
    const [month,setMonth] = useState(0);
    const [year,setYear] = useState(0);
    async function init(idx){
            

        const res=await axios.post('http://localhost:3000/getday',{},{
            headers:{
                pass:localStorage.getItem('pass'),
                idx
            }
        });
        if(res.data.Items.day)
        {
            setData(res.data.Items.day);
        }
        else
        {
            setData([[]])
        }

    }
    async function handleClick(){
        let date1 = new Date("03/27/2024");
        let date2 = new Date(year,month-1,day);
        
        let Difference_In_Time = date2.getTime() - date1.getTime();
    
        let diff =Math.round(Difference_In_Time / (1000 * 3600 * 24));
        if(diff < 0) diff = -2;
        console.log(diff);
        init(diff);
    }
    useEffect(()=>{
        init(-1);
    },[])
    return( <>
        <div>
        <Button variant="contained" style={{float:"right"}} onClick={()=>{
          navigate('/add')
        }}>Add Item</Button>
        <Button variant="contained" style={{float:"right"}} onClick={async()=>{
            let date1 = new Date("03/27/2024");
            let date2 = new Date();
            
            let Difference_In_Time = date2.getTime() - date1.getTime();
        
            let diff =Math.round(Difference_In_Time / (1000 * 3600 * 24));
            console.log(diff);
          const res=await axios.post('http://localhost:3000/addday',{},{
            headers:{
                pass:localStorage.getItem('pass'),
                idx:diff-1
            }
          })
        }}>Save Day</Button>
            Table
            <div>
                <div>
                <TextField id="filled-basic" label="Day" variant="filled" type="number"
                    onChange={(e)=>{
                        setDay(e.target.value)
                    }}
                    value={day}
                />
                <TextField id="filled-basic" label="Month" variant="filled" type="number" 
                onChange={(e)=>{
                    setMonth(e.target.value)
                }}
                value={month}
                />
                <TextField id="filled-basic" label="Year" variant="filled" type="number" 
                onChange={(e)=>{
                    setYear(e.target.value)
                }}
                value={year}
                />
                <Button variant="contained" onClick={handleClick}>Get Details</Button>
                </div>
                
                {data.map(item=>{
                    return (<>
                    <div>
                        {item.id}
                    </div >
                    <div style={{display:"flex",textAlign:"center",backgroundColor:"gray"}}>
                    <div style={{width:"33%"}}>Time</div>
                    <div style={{width:"33%"}}>Qty</div>
                    <div style={{width:"33%"}}>Bookings</div>
                </div>
                    <div>
                        {item.Bookings.map((slot,idx)=>{
                            return (<div style={{display:"flex",textAlign:"center",border:"1px solid black"}}>
                                <div style={{width:"33%"}}>
                                    {idx+9}:00 - {idx+10}:00
                                </div>
                                <div style={{width:"33%"}}>
                                {slot.cnt - slot.cntf} 
                                </div>
                            <div style={{width:"33%"}}>
                                {slot.emails.map(email=>{
                                    if(email=='')return<></>
                                    return (<div>{email}</div>)
                                })}
                            </div>
                            </div>)
                        })}
                    </div>
                    </>
                    )
                })}
            </div>
        </div>
    </>)
}