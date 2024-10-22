import React, { useRef } from "react"
import Die from "./Die"
import Score from "./Score"
import Options from "./Options"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [charSet, setCharSet]= React.useState("numbers")
    const [dice, setDice] = React.useState(allNewDice(charSet))
    const [rolls, setRolls]= React.useState(0)
    const [gameStart, setGameStart]= React.useState(false)


    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    const tenzies = allHeld && allSameValue



    if(tenzies && gameStart){
        setGameStart(false)
    }

    function chooseCharSet(selection){
        console.log(selection)
        setCharSet(selection)
        setDice(allNewDice(selection))
    }

    function generateNewDie(selection) {
        if(selection === "numbers"){
        return {
            value: Math.floor(Math.random() * 10),
            isHeld: false,
            id: nanoid()
        }
    } else if(selection === "letters"){
        return {
            value: String.fromCharCode(Math.floor(Math.random() * 26) + 65),
            isHeld: false,
            id: nanoid()
        }
    }
    }

    function allNewDice(selection) {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie(selection))
        }
        return newDice
    }
    
    function rollDice() {
        if(!gameStart){
            // start the timer
            setGameStart(true)
        }
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie(charSet)
            }))
            setRolls(prevRolls => prevRolls= prevRolls+1)
        } else {
            resetGame()
        }
    }

    function holdDice(id) {
        if(!gameStart){
            // start the timer
            setGameStart(true)
        }
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

    
    function resetGame(){
        setRolls(0)
        setTimer(0)
        setDice(allNewDice())
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
            <h1 className = "title" >Tenzies</h1>
            <p className = "instructions" >Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <Options chooseCharSet = {chooseCharSet}
                     gameStart = {gameStart} />
            <Score rolls = {rolls}
                   tenzies = {tenzies}
                   gameStart = {gameStart}   
            />
            <div className = "dice-container"
                 aria-live = "polite"
            >
                {diceElements}
            </div>
            <button 
                className = "button" 
                onClick = {rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}