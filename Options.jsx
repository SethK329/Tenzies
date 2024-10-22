import React from "react"

export default function Options(props) {
    return(
        <div className="options">
            <button disabled={props.gameStart} id="letters" className="button" onClick={()=>props.chooseCharSet("letters")}>A B C</button>
            <button disabled={props.gameStart} id="numbers" className="button" onClick={()=>props.chooseCharSet("numbers")}>1 2 3</button>
        </div>
    )
}