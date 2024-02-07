import React from "react"

export default function Score(props){
    return(
    <div className="score-container">
        <div className="highscores">
            <p>Lowest Rolls: </p>
            <p>Lowest Time: </p>
        </div>
        <div className="score">
            <p>Rolls: {props.rolls}</p>
            <p>Time: {props.timer}</p>
        </div>
   </div>
    )
}