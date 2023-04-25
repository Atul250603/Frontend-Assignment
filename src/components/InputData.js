function InputData(props){
    return(
        <div style={{"width":"40%","height":"90vh","padding":"0" ,"margin-right":"10px"}}>
            <h2 style={{"textAlign":"center"}}>Enter the JSON Here</h2>
            <textarea style={{"width":"100%","height":"100%","margin":"0","padding":"10px","border":"2px solid black","resize":"none","borderRadius":"5px"}} onChange={(e)=>{props.setjsonData(e.target.value)}}>
            </textarea>
        </div>
    )    
}
export default InputData;