import { useEffect, useRef, useState } from "react"
import LengthSetter from "./LengthSetter"
import { upperFirstLetter } from "./LengthSetter"

export default function App(){

    const [seconds, setSeconds] = useState(60 * 25)
    
    const [playFlag, setPlayFlag] = useState(false)
    
    const referenceTime = useRef(Date.now())
   
    const startTime = useRef(60 * 25)

    const [breakLength, setBreakLength] = useState(5)
    
    const [sessionLength, setSessionLength] = useState(25)
    
    const [mode, setMode] = useState('session')

    const timer = useRef([])

    const audioRef = useRef()

    function clearAllIntervals(){
        timer.current.forEach(interval => clearInterval(interval))
    }

    function playPause(){
        if(playFlag)
            pause()
        else
            play(seconds)
    }


    function toggleMode(){

        let newStartingTime 
        
        setMode(prevValue => {
            
            if(prevValue == 'session'){
                newStartingTime = breakLength * 60
                return 'break'
            } else{
                newStartingTime = sessionLength * 60
                return 'session'
            }
        })
        
        audioRef.current.play()
        setSeconds(newStartingTime)
        clearAllIntervals()
        setPlayFlag(false)
        play(newStartingTime)
    }


    function play(startingTime){

        if(playFlag)
            return

        setPlayFlag(true)

        referenceTime.current = Date.now()

        startTime.current = startingTime
        
        timer.current.push(setInterval(() => {

            
            let secondsPassed = Math.floor((Date.now() - referenceTime.current) / 50)
            let nextSeconds = startTime.current - secondsPassed
            setSeconds(() => nextSeconds)

            if(nextSeconds <= 0){
                toggleMode()
            }
            
        }, 100))
    }    

    function pause(){

        setPlayFlag(false)
        clearAllIntervals()
    }

    function restart(){

        
        pause()
        audioRef.current.load()
        setMode('session')
        setSessionLength(25)
        setBreakLength(5)
        setSeconds(60 * 25)

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

            <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                id="beep" ref={audioRef}></audio>

            <div className="lengths-container">

                <LengthSetter type="session" length={sessionLength} changeLength={setSessionLength}
                 playing={playFlag} key={Math.random()}></LengthSetter>
                
                <LengthSetter type="break" length={breakLength} changeLength={setBreakLength}
                 playing={playFlag} key={Math.random()}></LengthSetter>

            </div>

            <div className="timer-container">

                <div className="timer-label" id="timer-label">{upperFirstLetter(mode)}</div>
                <h1 className="timer" id="time-left">{`${minutes >= 10 ? "" : "0"}` + minutes}:{`${modSeconds >= 10 ? "" : "0"}` + modSeconds}</h1>
            
            </div>

            <div className="buttons-container">

                <button id="start_stop" onClick={playPause}>    
                    <div className="play" ><i className="fas fa-play"></i></div>
                    <div className="pause" ><i className="fas fa-pause"></i></div>
                </button>

                <button className="restart" onClick={restart} id="reset"><i className="fas fa-redo-alt"></i></button>
            
            </div>
        </div>
    )
}