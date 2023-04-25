import { useEffect, useRef, useState } from "react";
import Description from "./Description";
function Radio(props){
    const ref=useRef(null);
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    const [radioValue, setradioValue] = useState(props.defVal);
    let formData=props.formData;
    let setFormData=props.setFormData;
    let label=props.label;
    useEffect(()=>{
            ref.current.click();
            
    },[])
    useEffect(()=>{
        if(Object.keys(props.formData).length===0){
            setradioValue(props.defVal);
        }
    },[props.formData])
     function onClickHandler(e){
        setradioValue(e.target.value);
        let newFormData=formData;
        newFormData[label]=e.target.value;
        setFormData(newFormData);
        props.setTarget(e.target);
    }
    return(
        <>
        <div className="input outer-radio">
            {
                props.element.validate.options.map((element,idx)=>{
                    return(<div className="radio">
                    <label htmlFor={`${currJsonKey+idx}`}>{element.label}<Description element={element}/></label>
                    {(props.element.validate.defaultValue===element.value)?(<input type="radio" name={currJsonKey} id={`${currJsonKey+idx}`} value={element.value} jsonKey={`${currJsonKey+idx}`}   defaultChecked={false}  ref={ref} onClick={(e)=>{ onClickHandler(e);}}/>):<input type="radio" name={currJsonKey} id={`${currJsonKey+idx}`} jsonKey={`${currJsonKey+idx}`} value={element.value}   required={props.element.validate.required} onClick={(e)=>{onClickHandler(e);}}/>}
                    </div>)
                })
            }
        </div>
        </>
    )
}
export default Radio;