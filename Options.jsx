import React from "react"

export default function Options(props) {
    const letters = props.gameStart||props.charSet==="letters"
    const numbers = props.gameStart||props.charSet==="numbers"
    return(
        <div className="options">
            <div>
                <label htmlFor="letters">Letters</label>
                <button id="letters" className={letters ? "button" : "button"} onClick={()=>props.chooseCharSet("letters")}>A B C</button>
            </div>
            <div>  
                <label htmlFor="numbers">Numbers</label>
                <button id="numbers" className={numbers? "button" : "button"} onClick={()=>props.chooseCharSet("numbers")}>1 2 3</button>
            </div>
        </div>
    )
}