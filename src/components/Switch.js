import { useEffect, useState } from "react";
import Description from "./Description";
function Switch(props){
    const [switchData, setswitchData] = useState((props.defVal)?'on':'off');
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    useEffect(()=>{
        if(Object.keys(props.formData).length===0){
            setswitchData((props.defVal)?'on':'off');
        }
    },[props.formData])
    useEffect(()=>{
        let newFormData=props.formData;
        newFormData[props.label]=(props.defVal)?'true':'false';
        props.setFormData(newFormData);

    },[props.defVal])
    function onChangeHandler(e){
        setswitchData(e.target.value);
        let newFormData=props.formData;
        newFormData[props.label]=(e.target.value==='on')?'true':'false';
        props.setFormData(newFormData);
    }
    return <div className="input checkbox">
       { (props.element.validate.defaultValue)?<input type="checkbox" name={currJsonKey} value={switchData} jsonKey={currJsonKey} id={currJsonKey} required={props.element.validate.required} defaultChecked  onChange={(e)=>onChangeHandler(e)}/>:<input type="checkbox" name={currJsonKey} jsonKey={currJsonKey} id={currJsonKey} required={props.element.validate.required} onChange={(e)=>onChangeHandler(e)}/>}
        <label htmlFor={currJsonKey}>{props.element.label}<Description element={props.element}/></label>
    </div>
}
export default Switch;