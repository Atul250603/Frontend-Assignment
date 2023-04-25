function Description(props){
    return((props.element.description.length>0)?<div className="tooltip"><div className="tooltipIcon" onMouseOver={(e)=>{console.log(e.target.nextElementSibling.style="display:inline;")}} onMouseLeave={(e)=>{console.log(e.target.nextElementSibling.style="display:none;")}}>i</div><div className="tooltipData"><div>{props.element.label}</div><hr/><div>{props.element.description}</div></div></div>:<></>);
}
export default Description;