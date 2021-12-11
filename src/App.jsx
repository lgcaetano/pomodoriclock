import { useEffect, useRef, useState, React } from "react"
import LengthSetter from "./LengthSetter"
import { upperFirstLetter } from "./LengthSetter"
import Numbers from "./Numbers"

export default function App(){

    const [seconds, setSeconds] = useState(60 * 25)

    const [flashToggle, setFlash] = useState(false) 

    const [firstFlag, setFirstFlag] = useState(false)
    
    const [playFlag, setPlayFlag] = useState(false)
    
    const referenceTime = useRef(Date.now())
   
    const startTime = useRef(60 * 25)

    const [breakLength, setBreakLength] = useState(1)
    
    const [sessionLength, setSessionLength] = useState(1)
    
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
      
        setSeconds(0)

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
        
        if(!firstFlag)
            setFirstFlag(true)
        

            
            
        setFlash(prevValue => {
            console.log(!prevValue)
            return !prevValue
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

            
            let secondsPassed = Math.floor((Date.now() - referenceTime.current) / 1000)
            let nextSeconds = startTime.current - secondsPassed
            setSeconds(() => nextSeconds)

            if(nextSeconds < 0){
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
    useEffect(() =>{ 
      if(mode == 'session')
        setSeconds(60 * sessionLength)
                   }, [sessionLength])
  
    useEffect(() => {
      
      if(mode == 'break')
         setSeconds(60 * breakLength)
    }, [breakLength])

    let minutes = Math.floor(seconds/60)
    let modSeconds = seconds % 60

    let secondRotation = 360 - (modSeconds * 6)
    let minutesRotation = 360 - (seconds / 10) 
    return (
        <div className="app">

            <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                id="beep" ref={audioRef}></audio>

            <div className="lengths-container">

                <LengthSetter type="break" length={breakLength} changeLength={setBreakLength}
                 playing={playFlag} ></LengthSetter>
              
                <LengthSetter type="session" length={sessionLength} changeLength={setSessionLength}
                 playing={playFlag} ></LengthSetter>

            </div>

            <div className="timer-container">

                <div className="center"></div>

                <Numbers></Numbers>

                <div className="handle-container"  style={{ transform: `rotate(${secondRotation}deg)` }}>
                    <div className="handle second"></div>
                </div>
                <div className="handle-container"  style={{ transform: `rotate(${minutesRotation}deg)` }}>
                    <div className="handle minute"></div>
                </div>


                <div className="timer-label" id="timer-label">{upperFirstLetter(mode)}</div>
                <h1 className={`timer`} id=" time-left">
                    <div className={`time-text-container ${
                            firstFlag ? (flashToggle ? 'flash-trigger1' : 'flash-trigger2') : ''
                        }`}>
                        {`${minutes >= 10 ? "" : "0"}` + minutes}:{`${modSeconds >= 10 ? "" : "0"}` + modSeconds}
                    </div>
                </h1>
            
            </div>

            <div className="buttons-container ">

                <button id="start_stop" onClick={playPause}>    
                    <div className="play" ><i className="fas fa-play"></i></div>
                    <div className="pause" ><i className="fas fa-pause"></i></div>
                </button>

                <button className="restart" onClick={restart} id="reset"><i className="fas fa-redo-alt"></i></button>
            
            </div>
        </div>
    )
}