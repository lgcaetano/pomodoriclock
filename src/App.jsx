import { useEffect, useRef, useState } from "react"
import LengthSetter from "./LengthSetter"
import { upperFirstLetter } from "./LengthSetter"

export default function App(){

    const [seconds, setSeconds] = useState(60 * 25)
    const playFlag = useRef(false)
    // const [referenceTime, setReferenceTime] = useState(Date.now())
    const referenceTime = useRef(Date.now())
    // console.log(referenceTime)
    const startTime = useRef(60 * 25)

    const [breakLength, setBreakLength] = useState(1)
    const [sessionLength, setSessionLength] = useState(1)
    const [mode, setMode] = useState('session')

    const timer = useRef([])

    function clearAllIntervals(){
        console.log(timer)
        timer.current.forEach(interval => clearInterval(interval))
    }


    function toggleMode(){

        let newStartingTime 

        console.log(mode)

        
        setMode(prevValue => {
            
            if(prevValue == 'session'){
                newStartingTime = breakLength * 60
                return 'break'
            } else{
                newStartingTime = sessionLength * 60
                return 'session'
            }
        })

        setSeconds(newStartingTime)
        clearAllIntervals()
        playFlag.current = false
        play(newStartingTime)
    }


    function play(startingTime){

        
        if(playFlag.current)
            return
        
        // console.log("HEY")

        playFlag.current = true

        referenceTime.current = Date.now()

        startTime.current = startingTime
        
        timer.current.push(setInterval(() => {

            
            let secondsPassed = Math.floor((Date.now() - referenceTime.current) / 50)
            let nextSeconds = startTime.current - secondsPassed
            setSeconds(() => nextSeconds)

            if(nextSeconds <= 0){
                
                // console.log(seconds)
                toggleMode()
            }
            
        }, 100))
    }    

    function pause(){
        // setReferenceTime(Date.now())
        // setStartTime(seconds)
        playFlag.current = false
        // console.log("KRLFORA")
        // console.log(timer)
        clearAllIntervals()
    }

    function restart(){
        pause()
        setSessionLength(25)
        setBreakLength(5)
    }

    useEffect(() => {
        if(mode == 'session')
            setSeconds(60 * sessionLength)
        else 
            setSeconds(60 * breakLength)
    }, [breakLength, sessionLength])




    let minutes = Math.floor(seconds/60)
    let modSeconds = seconds % 60

    return (
        <div className="app">
            <div className="lengths-container">
                <LengthSetter type="session" length={sessionLength} changeLength={setSessionLength}></LengthSetter>
                
                <LengthSetter type="break" length={breakLength} changeLength={setBreakLength}></LengthSetter>
            </div>
            <div className="timer-container">
                <div className="timer-label">{upperFirstLetter(mode)}</div>
                <h1 className="timer">{`${minutes >= 10 ? "" : "0"}` + minutes}:{`${modSeconds >= 10 ? "" : "0"}` + modSeconds}</h1>
            </div>
            <div className="buttons-container">
                <button className="play" onClick={() => play(seconds)}><i className="fas fa-play"></i></button>
                <button className="pause" onClick={pause}><i className="fas fa-pause"></i></button>
                <button className="restart" onClick={restart}><i className="fas fa-redo-alt"></i></button>
            </div>
        </div>
    )
}