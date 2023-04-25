import { useEffect, useState } from "react";
import Input from "./Input";
import Group from "./Group";
import Radio from "./Radio";
import Description from "./Description";
import Select from "./Select";
import Switch from "./Switch";
function Ignore(props){
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    const [displayFlag, setdisplayFlag] = useState(false);
    props.element.subParameters.sort((a, b) => {
        return a.sort - b.sort;
    })
    useEffect(()=>{
        if(props.target!==null){
            let jsonKey=props.element.conditions[0].jsonKey.split('.').join('');
            let value=props.element.conditions[0].value;
            if(props.target['name']===jsonKey && props.target.value===value){
                if(props.element.conditions[0].action==='enable'){
                    setdisplayFlag(true);
                }
                else{
                    setdisplayFlag(false);
                }
            }
            else{
                setdisplayFlag(false);
            }
        }
    },[props.target])
    useEffect(()=>{
        let newFormData=props.formData;
        if(!displayFlag){
            props.element.subParameters.forEach(element => {
                    delete newFormData[element.label]
            });
            props.setFormData(newFormData);
        }
    },[displayFlag])
    return(
        <div name={currJsonKey} jsonKey={currJsonKey} id={currJsonKey} >
        {
            (displayFlag)?props.element.subParameters.map((element,idx)=>{
                {
                    return(element.uiType==="Input")?(<Input element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Select")?(<Select  element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label} defVal={element.validate.defaultValue}/>):(element.uiType==="Group")?(<Group displayFlag={props.displayFlag} setdisplayFlag={props.setdisplayFlag} element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Ignore")?(<Ignore  element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Radio")?(<Radio element={element} jsonKey={currJsonKey} setTarget={props.setTarget} key={idx} formData={props.formData} setFormData={props.setFormData} label={props.element.label} defVal={element.validate.defaultValue}/> ):(element.uiType==="Switch")?(<Switch element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label} defVal={element.validate.defaultValue}/>):<></>
                }
            }):<></>
            
        }
        </div>
    )
}
export default Ignore;