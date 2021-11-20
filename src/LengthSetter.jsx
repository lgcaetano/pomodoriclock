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
                <button className={`${props.type}-decrement`} onClick={() => {

                    if(props.length > 1 && !props.playing)
                        props.changeLength(props.length - 1)
                        
                    }}>
                    <i className="fas fa-arrow-down"></i>
                </button>

                <div id={`${props.type}-length`}>{props.length}</div>

                <button className={`${props.type}-increment`} onClick={() => {

                    if(props.length < 59 && !props.playing)
                        props.changeLength(props.length + 1)

                }}>
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </div>
    )
}