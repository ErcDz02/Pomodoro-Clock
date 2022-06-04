const {useState, useEffect} = React

//SAME FUNCTION
//I cannot change time when !!isPlaying
//When !!isPlaying, the displayed time does not change and remains whatever I set it as

const Pomodoro = () => {
  const [displaySession, setDisplaySession] = useState(25)
  const [displayBreak, setDisplayBreak] = useState(5)
    
  const [sessionMin, setSessionMin] = useState(25)
  const [sessionSec, setSessionSec] = useState(0)
  
  const [breakMin, setBreakMin] = useState(5)
  const [breakSec, setBreakSec] = useState(0)
  
  const [onBreak, setOnBreak] = useState(false) 
  
  const [isPlaying, setIsPlaying] = useState(false)
  
  const arrFunc = [
    increaseSession = () => {
      if (!isPlaying) {
    setDisplaySession(displaySession >= 60 ? 60 : displaySession + 1)
    setSessionMin(sessionMin >= 60 ? 60 : sessionMin + 1)
      }
    },
    decreaseSession = () => {
      if (!isPlaying) {
    setDisplaySession(displaySession <= 1 ? 1 : displaySession - 1)
    setSessionMin(sessionMin <= 1 ? 1 : sessionMin - 1)
      }
    },
    increaseBreak = () => {
      if (!isPlaying) {
    setDisplayBreak(displayBreak >= 60 ? 60 : displayBreak + 1)
    setBreakMin(breakMin >= 60 ? 60 : breakMin + 1)
      }
    },
    descreaseBreak = () => {
      if (!isPlaying) {
    setDisplayBreak(displayBreak <= 1 ? 1 : displayBreak - 1)
    setBreakMin(breakMin <= 1 ? 1 : breakMin - 1)
      }
    },   
    
    
  ]
  
  const handleRestart = () => {
    setSessionMin(25)
    setSessionSec(0)
    
    setBreakMin(5)
    setBreakSec(0)
    
    setDisplaySession(25)
    setDisplayBreak(5)
    
    
    setIsPlaying(false)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        if (!onBreak) {
          if (sessionSec === 0 && sessionMin === 0) {
            setOnBreak(true); 
            setSessionMin(displaySession)
          } else if (sessionSec === 0 && sessionMin !== 0) {
            setSessionMin(sessionMin - 1);
            setSessionSec(59);
          } else {
            setSessionSec(sessionSec - 1);
          }
        } else if (onBreak) {
          if (breakSec === 0 && breakMin === 0) {
            setOnBreak(false);
            setBreakMin(displayBreak)
          } else if (breakSec === 0 && breakMin !== 0) {
            setBreakMin(breakMin - 1);
            setBreakSec(59);
          } else {
            setBreakSec(breakSec - 1);
          }
        }
      } //if isPlaying
    }, 1000);
    return () => clearInterval(interval);
  });
  

  
  // {isPlaying ? {/*the clean state for sessionMin*/}: sessionMin}
  return (
    <div id="main">
      <div id="set-timers">
      <div id="session-div">
         Set Session Time: <br/><i><strong>{displaySession}</strong></i><br/>
        <button onClick={() => arrFunc[increaseSession()]}>+</button>
        <button onClick={() => arrFunc[decreaseSession()]}>-</button>
        
      </div>
      
      <div id="break-div">
        Set Break Time: <br/>{displayBreak}<br/>
        <button onClick={() => arrFunc[increaseBreak()]}>+</button>
        <button onClick={() => arrFunc[descreaseBreak()]}>-</button>
      </div>
      </div> {/*st-timers id*/}
      
      {/*If there is a break, show break and if not show session*/}
   {<div id="result">
        {isPlaying ? 
          onBreak ?
   (breakSec < 10 ? `Break ${breakMin}:0${breakSec} minutes` : `Break  ${breakMin}:${breakSec} minutes` ) :
   (sessionSec < 10 ? `Work ${sessionMin}:0${sessionSec}` : `Work ${sessionMin}:${sessionSec}`) : 
        
        `Start timer`}
   </div>}
      <div id="usefulBtns">
        <span id="pause-btn">
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause': 'Play'}</button>
          </span>
        <span id="restart-btn">
      <button onClick={() => handleRestart()}>Restart</button>
        </span>
      </div>
    </div>//main
)
}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'))
