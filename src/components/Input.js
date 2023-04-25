import { useEffect, useState } from "react";
import Description from "./Description";
function Input(props){
    const [inputData, setinputData] = useState("")
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    let formData=props.formData;
    function onChangeHandler(e,label){
        setinputData(e.target.value);
        let newFormData=formData;
        newFormData[label]=e.target.value;
        props.setFormData(newFormData);
    }
    useEffect(()=>{
        if(Object.keys(props.formData).length===0){
             setinputData("");
        }
    },[props.formData])
    return(
        <div className="input" style={{'display':(props.element.disable)?"none":"block"}}>
            <div className="input-txt">
                <label htmlFor={currJsonKey}>{props.element.label}<Description element={props.element}/></label>
                {(props.element.disable)?<input type="text" name={currJsonKey} id={currJsonKey} jsonKey={currJsonKey} required={props.element.validate.required} readOnly={props.element.validate.immutable} placeholder={props.element.placeholder} disabled pattern={(props.element.validate.pattern)?props.element.validate.pattern:"[a-zA-Z0-9 ]*"}/>:<input type="text" name={currJsonKey} id={currJsonKey} jsonKey={currJsonKey} required={props.element.validate.required} readOnly={props.element.validate.immutable} placeholder={props.element.placeholder} value={inputData} onChange={(e)=>onChangeHandler(e,props.element.label)} pattern={(props.element.validate.pattern)?props.element.validate.pattern:"[a-zA-Z0-9 ]*"}/>
                }
            </div>
        </div>
    )
}
export default Input;