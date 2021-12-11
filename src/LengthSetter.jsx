export function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function LengthSetter(props){


    return (
        <div className="length-container">

            


            <div id={`${props.type}-label`}>
                {`${upperFirstLetter(props.type)} Length`}
            </div>


            <div className="length-buttons">
                <button id={`${props.type}-decrement`} onClick={() => {
                    
                  console.log("CLICK")
                  
                    if(props.length > 1 && !props.playing)
                        props.changeLength(prevValue => prevValue - 1)
                        
                    }}>
                    <i className="fas fa-arrow-down"></i>
                </button>

                <div id={`${props.type}-length`}>{props.length}</div>

                <button id={`${props.type}-increment`} onClick={() => {
                  
                    console.log("CLICK")  
                  
                    if(props.length < 60 && !props.playing)
                        props.changeLength(prevValue => prevValue + 1)

                }}>
                    <i className="fas fa-arrow-up"></i>    
                </button>
            </div>
        </div>
    )
}