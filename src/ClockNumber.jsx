export default function ClockNumber(props){


    let highlightedFlag = props.number % 3 == 0 


    return <div className="number" style={{ transform: `rotate(${360 - ((props.number / 12) * 360)}deg)`,
             color: highlightedFlag ? 'red' : 'black', textDecoration: highlightedFlag ? 'underline black' : '', textUnderlineOffset:'3px'}}>
        {props.number * 5}
    </div>
}