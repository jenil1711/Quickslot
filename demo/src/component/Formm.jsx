import React, { useEffect, useState } from 'react';
import './Formm.css'
import Nav from './Nav';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Button from '@mui/material/Button';
function SlotForm({sport}) {
    const [slots,setSlots] = useState([]);
    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('');
    const [otpState,setState] = useState(0);
    
    useEffect(()=>{
        async function init(){
            const res=await axios.get(`http://localhost:3000/getslots/${sport}`);
            setSlots(res.data.Bookings);
            console.log(res.data.Bookings);
        }
        init();
    },[])
    return (
        <div className="parent">

            <div className="homescreen">
                {/* <div className="form-div"> */}
                <div className="name-id-div">
                
                    <div className="email">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" onChange={(e)=>{
                            setEmail(e.target.value);
                        }} value={email}/>
                        <Button variant="contained"  style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            marginBlock:"10px"
                                        }}
                                        onClick={async()=>{
                                            if(otpState==1)
                                            {
                                                return;
                                            }
                                            setState(1);
                                            setTimeout(() => {
                                                setState(2);
                                            }, 30000);
                                            const res = await axios.get('http://localhost:3000/sendotp',{
                                                headers:{
                                                    email:email,
                                                }
                                            })
                                        }}
                                        >{otpState==0 && "Send Otp"}{otpState==1 && `Wait to Resend`}{otpState==2 && "Resend Otp"}</Button>
                        <input  placeholder="enter otp" onChange={(e)=>{
                           setOtp(e.target.value);
                        }} value={otp}/>
                    </div>
                    <div className="time">
                        <label htmlFor="time">Time Availaible</label>
                        <div className="innertimebox">
                            {slots.map( (data,idx)=>{
                                if(data.cnt == 0)return( <div style={{textAlign:'center'}}>
                                    {idx+9}:00 - {idx+10}:00 : Fully Booked
                                </div>)
                                return(
                                    <div className="check">
                                        <Button variant="contained"  style={{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                        onClick={async()=>{
                                            if(email == '')
                                            {
                                                alert('Please enter preoper email');
                                                return;
                                            }
                                            const res=await axios.post(`http://localhost:3000/bookitem`,{
                                                time:idx,
                                                id:sport,
                                                email:email,
                                                otp
                                            })
                                            if(res.data.otp==0)
                                            {
                                                alert('Incorrect Otp');
                                            }
                                            else if(res.data.Booked)
                                            {
                                                window.location.reload();
                                                alert('Booked');
                                            }
                                        }}
                                        >{idx+9}:00 - {idx+10}:00 - Total:{data.cnt-data.cntf}</Button>
                            
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );

}

export default SlotForm;
