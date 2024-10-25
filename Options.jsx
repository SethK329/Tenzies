import React from "react"

export default function Options(props) {
    const letters = props.gameStart||props.charSet==="letters"
    const numbers = props.gameStart||props.charSet==="numbers"
    return(
        <div className="options">
            <div>
                <label htmlFor="letters">Letters</label>
                <button disabled={letters} id="letters" className={letters ? "button disabled" : "button"} onClick={()=>props.chooseCharSet("letters")}>A B C</button>
            </div>
            <div>  
                <label htmlFor="numbers">Numbers</label>
                <button disabled={numbers} id="numbers" className={numbers? "button disabled" : "button"} onClick={()=>props.chooseCharSet("numbers")}>1 2 3</button>
            </div>
        </div>
    )
}