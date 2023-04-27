import { useEffect, useState } from "react";
import Description from "./Description";
function Select(props){
    const [selectData, setselectData] = useState(props.defVal);
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    useEffect(()=>{
        if(Object.keys(props.formData).length===0){
            setselectData(props.defVal);
        }
    },[props.formData])
    useEffect(()=>{
        let newFormData=props.formData;
        newFormData[props.label]=props.defVal;
        props.setFormData(newFormData);

    },[props.defVal])
    function onChangeHandler(e){
        setselectData(e.target.value);
        let newFormData=props.formData;
        newFormData[props.label]=e.target.value;
        props.setFormData(newFormData);
    }
    return(
        <div className="input select">
            <label htmlFor={currJsonKey}>{props.element.label}<Description element={props.element}/></label>
            <select name={currJsonKey} jsonKey={currJsonKey} id={currJsonKey}  onChange={(e)=>onChangeHandler(e)} required={props.element.validate.required}>
            {
                props.element.validate.options.map((element,idx)=>{
                    return(
                        (props.element.validate.defaultValue===element.value)?<option value={element.value} selected>{element.label }</option>:<option value={element.value}>{element.label }</option>  
                    )
                })
            }
            </select>
        </div>
    )
}
export default Select;
