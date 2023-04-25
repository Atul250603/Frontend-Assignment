import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Group from "./Group";
import Ignore from "./Ignore";
import Radio from "./Radio";
import Switch from "./Switch";
 function ShowForm(props){
    const [data, setdata] = useState("")
    const [showAddField, setshowAddField] = useState(false);
    const [hasAddField, sethasAddField] = useState(false);
    const [target, setTarget] = useState(null);
    const[dispText,setdispText]=useState("Show");
    const [formData,setFormData]=useState({});
    const [displayFlag, setdisplayFlag] = useState(false);
    let currJsonKey="";
    useEffect(()=>{
        async function convertJSON(){
            if(props.data!==null){
                let tmpData=await JSON.parse(props.data)
                tmpData.sort((a, b) => {
                    return a.sort - b.sort;
                });
                setdata(tmpData);
                setshowAddField(false);
                sethasAddField(false);
                setTarget(null);
                setdispText("Show");
                setFormData({});
                setdisplayFlag(false);
                props.setSubmitData(null);
            }
            
        }
        convertJSON();
       
    },[props.data])
    useEffect(()=>{
        let newFormData=formData;
        if(!displayFlag && data!=="" && data.length>2){
            data.forEach(element => {
                if(!element.validate.required){
                    delete newFormData[element.label]
                }
            });
            setFormData(newFormData);
        }
    },[displayFlag])
    return(
        <div style={{"width":"60%","height":"90vh","padding":"0"}}>
        <h2 style={{"textAlign":"center"}}>Output</h2>
    <div style={{"width":"100%","height":"100%","border":"2px solid black","padding":"10px","margin":"0","overflow-y":"scroll","borderRadius":"5px"}}>
    {(data!=="" && data.length>2)?<form onSubmit={(e)=>{e.preventDefault(); props.setSubmitData(JSON.stringify(formData,null,2));}}>
        {data.map((element,idx)=>{
            return(
                <>
                {
                    (showAddField)?(element.uiType==="Input")?(<Input element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData}/>):(element.uiType==="Select")?(<Select  defVal={element.validate.defaultValue} element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData} label={element.label}/>):(element.uiType==="Group")?(<Group  data={props.data} element={element} jsonKey={currJsonKey} target={target} setTarget={setTarget} showAddField={showAddField} sethasAddField={sethasAddField} key={idx} dispText={dispText} formData={formData} setFormData={setFormData} displayFlag={displayFlag} setdisplayFlag={setdisplayFlag}/>):(element.uiType==="Ignore")?(<Ignore  data={props.data} element={element} jsonKey={currJsonKey} target={target} setTarget={setTarget} showAddField={showAddField} sethasAddField={sethasAddField} key={idx} dispText={dispText} formData={formData} setFormData={setFormData}/>):(element.uiType==="Radio")?(<Radio  element={element} jsonKey={currJsonKey} setTarget={setTarget} key={idx} formData={formData} setFormData={setFormData} label={element.label} defVal={element.validate.defaultValue}/> ):(element.uiType==="Switch")?(<Switch element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData} label={element.label} defVal={element.validate.defaultValue}/>):<></>:(element.uiType==="Input" && element.validate.required)?(<Input element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData}/>):(element.uiType==="Select" && element.validate.required)?(<Select defVal={element.validate.defaultValue} element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData} label={element.label}/>):(element.uiType==="Group" && element.validate.required)?(<Group data={props.data}  element={element} displayFlag={displayFlag} setdisplayFlag={setdisplayFlag} jsonKey={currJsonKey} target={target} setTarget={setTarget} showAddField={showAddField} sethasAddField={sethasAddField} key={idx} dispText={dispText} formData={formData} setFormData={setFormData}/>):(element.uiType==="Ignore" && element.validate.required)?(<Ignore  data={props.data} element={element} jsonKey={currJsonKey} target={target} setTarget={setTarget} showAddField={showAddField} sethasAddField={sethasAddField} key={idx} dispText={dispText} formData={formData} setFormData={setFormData}/>):(element.uiType==="Radio" && element.validate.required)?(<Radio  element={element} jsonKey={currJsonKey} setTarget={setTarget} key={idx} formData={formData} setFormData={setFormData} label={element.label} defVal={element.validate.defaultValue}/> ):(element.uiType==="Switch" && element.validate.required)?(<Switch element={element} jsonKey={currJsonKey} key={idx} formData={formData} setFormData={setFormData} label={element.label} defVal={element.validate.defaultValue}/>):(((!hasAddField)?sethasAddField(true):""))
                }
                 
                </>
                )
            })}  
            <div className="form-btn">
                {
                (hasAddField)?<div className="showAddField"><div><label class="switch">
                <input type="checkbox"  onClick={(e)=>{if(e.target.checked){setshowAddField(true); setdisplayFlag(true); setdispText("Hide")}else{setshowAddField(false); setdisplayFlag(false); setdispText("Show")}}} checked={(showAddField)?true:false}/>
  {dispText} Advanced Field
</label></div></div>:<></>
            }
            <div>
            <button type="submit" className="btn">Submit</button>
            </div>
            </div>
        </form>:<></>}
    </div>
    </div>
    )
}
export default ShowForm;