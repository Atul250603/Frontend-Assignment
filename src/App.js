import { useState } from "react";
import InputData from "./components/InputData";
import ShowForm from "./components/ShowForm";
function App() {
  const [jsonData, setjsonData] = useState(null);
  const [submitData,setSubmitData]=useState(null);
  return (
    <div className="maindiv">
      <div className="panels">
        <InputData setjsonData={setjsonData}/>
        <ShowForm data={jsonData} setSubmitData={setSubmitData}/>
      </div>
      <div className="finalAns">
      {(submitData!==null)?<div>
      <h2>JSON To Be Sent To Backend</h2>
        <div>{submitData}</div>
      </div>:<></>}
      </div>
    </div>
  );
}

export default App;
