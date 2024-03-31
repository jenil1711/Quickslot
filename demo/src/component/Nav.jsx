import { useNavigate } from 'react-router-dom';
import './Nav.css'
function Nav() {
    const navigate = useNavigate();
    return (
        <>
            < div style={{
                width:"100%",
                display:"flex",
                justifyContent:"space-between"
            }} >
                <div style={{
                    width:"33%"
                }}></div>
                <h1 style={{
                    width:"33%"
                }}
                onClick={()=>{
                    navigate('/');
                }}
                > Quickslot </h1>
               <div >
                 <button style={{
                    margin:"0",
                    float:"right"
                }}
                onClick={()=>{
                    navigate('/sec');
                }}
                >Admin</button>
               </div>
            </div>
        </>
    )
}

export default Nav