import { useParams } from "react-router-dom";
import SlotForm from "./component/Formm"
export default function BookForm(){
   const {sport}= useParams();
    return(<>
        <SlotForm sport={sport}></SlotForm>
    </>)
}