import React, { useRef } from "react"
import Die from "./Die"
import Score from "./Score"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [rolls, setRolls]= React.useState(0)
    const [timer, setTimer]= React.useState(0)
    const [timerId, setTimerId] =  React.useState(setTime)


    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    const tenzies = allHeld && allSameValue

    function setTime() {
        return setInterval(()=>{setTimer(prevTime=> prevTime+1)},1000)
    }

    if(tenzies){
        clearInterval(timerId)
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevRolls => prevRolls= prevRolls+1)
        } else {
            setTimerId(setTime)
            setRolls(0)
            setTimer(0)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        speakDiceValue(id)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function speakDiceValue(id){
        const synth = window.speechSynthesis
        const value = dice.find(die => die.id === id).value
        const utterance = new SpeechSynthesisUtterance(value)
        synth.speak(utterance)
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <Score rolls={rolls}
                   timer={timer}
                   tenzies={tenzies}   
            />
            <div className="dice-container"
                 aria-live="polite"
            >
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}