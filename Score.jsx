import React from "react"

export default function Score(props){
    const [highscores, setHighscores] = React.useState(JSON.parse(localStorage.getItem('highscores')) || {timer:150, rolls:50})
    const [newHighScores, setNewHighScores] = React.useState({timer:false, rolls:false})
    const [timer, setTimer]= React.useState(0)

function checkHighscore() {
        if (props.rolls < highscores.rolls) {
            setHighscores(prevHighscores => ({
                ...prevHighscores,
                rolls: props.rolls
            }));
            // save highscores in local storage
            setNewHighScores(prevNewHighScores => ({
                ...prevNewHighScores,
                rolls: true
            }))
        }
    
        if (props.timer < highscores.timer) {
            setHighscores(prevHighscores => ({
                ...prevHighscores,
                timer: props.timer
            }));
            // save highscores in local storage
            setNewHighScores(prevNewHighScores => ({
                ...prevNewHighScores,
                timer: true
            }))
        }
        localStorage.setItem('highscores', JSON.stringify(highscores));
}

if(props.tenzies){
    checkHighscore()
}
React.useEffect(()=>{   
    if(props.rolls===0){
        setNewHighScores({timer:false, rolls:false})
        setTimer(0)
    }    
},[props.tenzies])

React.useEffect(()=>{
    const timerId = setInterval(()=>{setTimer(prevTime=> prevTime+1)},1000)    
    if(!props.gameStart){
        clearInterval(timerId)
    }
    return ()=> clearInterval(timerId)
},[props.gameStart])

const style = {color:"red"}

    return(
    <div className="score-container">
        <div className="highscores">
            {props.tenzies&&newHighScores.rolls?<p style={style}>New Highscore Rolls: {props.rolls}</p>:<p>Lowest Rolls: {highscores.rolls} </p>}
            {props.tenzies&&newHighScores.timer?<p style={style}>New Highscore Time: {timer}</p>:<p>Lowest Time: {highscores.timer} </p>}
        </div>
        <div className="score">
            <p>Rolls: {props.rolls}</p>
            <p>Time: {timer}</p>
        </div>
   </div>
    )
}