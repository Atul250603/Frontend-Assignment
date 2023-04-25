import { useEffect, useState } from "react"
import Description from "./Description"
import Ignore from "./Ignore"
import Input from "./Input"
import Radio from "./Radio"
import Select from "./Select"
import Switch from "./Switch"
function Group(props){
    const [showAddField, setshowAddField] = useState(false);
    const [hasAddField, sethasAddField] = useState(false);
    const[dispText,setdispText]=useState("Show");
    const[displayFlag,setdisplayFlag]=useState(false);
    props.element.subParameters.sort((a, b) => {
        return a.sort - b.sort;
    })
    let currJsonKey=props.jsonKey+props.element.jsonKey;
    useEffect(()=>{
        setshowAddField(false);
        sethasAddField(false);
        setdispText("Show");
    },[props.data])
    useEffect(()=>{
        setshowAddField(props.showAddField);
        setdispText(props.dispText)
    },[props.showAddField])
    useEffect(()=>{
        setdisplayFlag(props.displayFlag)
    },[props.displayFlag])
    useEffect(()=>{
        let newFormData=props.formData;
        if(!displayFlag){
            props.element.subParameters.forEach(element => {
                if(!element.validate.required){
                    delete newFormData[element.label]
                }
            });
            props.setFormData(newFormData);
        }
    },[displayFlag])
    return(
        <div className="input">
        <label htmlFor={currJsonKey}>{props.element.label}<Description element={props.element}/></label>
        <div jsonKey={currJsonKey} name={currJsonKey} id={currJsonKey}>
             {   props.element.subParameters.map((element,idx)=>{
                    return(
                <>
                {
                    (showAddField)?(element.uiType==="Input")?(<Input element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Select")?(<Select  defVal={element.validate.defaultValue} element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label}/>):(element.uiType==="Group")?(<Group displayFlag={props.displayFlag} setdisplayFlag={props.setdisplayFlag} element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Ignore")?(<Ignore  element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Radio")?(<Radio  element={element} jsonKey={currJsonKey} setTarget={props.setTarget} key={idx} formData={props.formData} setFormData={props.setFormData} label={props.element.label} defVal={element.validate.defaultValue}/> ):(element.uiType==="Switch")?(<Switch element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label} defVal={element.validate.defaultValue}/>):<></>:(element.uiType==="Input" && element.validate.required)?(<Input element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Select" && element.validate.required)?(<Select  defVal={element.validate.defaultValue} element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label}/>):(element.uiType==="Group" && element.validate.required)?(<Group  displayFlag={props.displayFlag} setdisplayFlag={props.setdisplayFlag} element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Ignore" && element.validate.required)?(<Ignore  element={element} jsonKey={currJsonKey} target={props.target} setTarget={props.setTarget} showAddField={props.showAddField} sethasAddField={props.sethasAddField} key={idx} formData={props.formData} setFormData={props.setFormData}/>):(element.uiType==="Radio" && element.validate.required)?(<Radio  element={element} jsonKey={currJsonKey} setTarget={props.setTarget} key={idx} formData={props.formData} setFormData={props.setFormData} label={props.element.label} defVal={element.validate.defaultValue}/> ):(element.uiType==="Switch" && element.validate.required)?(<Switch element={element} jsonKey={currJsonKey} key={idx} formData={props.formData} setFormData={props.setFormData} label={element.label} defVal={element.validate.defaultValue}/>):(!hasAddField)?(sethasAddField(true),props.sethasAddField(true)):<></>
                  }
                </>
                )
                })
            }
            {
                (hasAddField)?<div className="showAddField"><div><label class="switch" id={props.key}>
                <input type="checkbox"  onClick={(e)=>{if(e.target.checked){setshowAddField(true); setdisplayFlag(true); setdispText("Hide")}else{setshowAddField(false); setdisplayFlag(false); setdispText("Show")}}} checked={(showAddField)?true:false}/>
  {dispText} Advanced Field
</label></div></div>:<></>
            }
        </div>
        </div>
    )
}
export default Group;