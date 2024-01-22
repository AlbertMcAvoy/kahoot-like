'use client';

import {useState} from "react";
import {Socket} from "socket.io-client";
import {TGame} from "../../../types/TGame";
import {TClient} from "../../../types/TClient";

type TProps = {
    socket: Socket;
    state: string;
    currentGame: TGame;
    currentPlayer: TClient;
}

const GamePage = ({ socket, state, currentGame, currentPlayer }: TProps) => {

    const isHidden = () => {
        return state !== 'game' ? 'hidden' : '';
    }
    
    const handleAnswer = (event: any) => {
        event.preventDefault();
        const playerAnswer = event.nativeEvent.submitter.id;
        console.log(playerAnswer)
        let gameId = currentGame.id
        let score = 0;
        if(playerAnswer == currentGame.questionsList[currentGame?.currentRound].answer) {
            score = 20;
        }
        socket.emit('server-kahoot-answer', {
            gameId,
            score
        });
    }

    if (state == 'game') {
    return (
        // console.log(currentGame?.questionsList[0])
        <div className={ 'm-5 ' + isHidden()}>
            Game id: <span className="text-highlight"> {currentGame?.id} </span>

            <div className="flex gap-5 m-6">
                <span>
                { 
                currentGame?.questionsList[currentGame?.currentRound].value
                }
                <form id="FormAnswer" onSubmit={(event) => handleAnswer(event)}>
                {
                currentGame?.questionsList[currentGame.currentRound].propositions.map((answer) => {
                    return (
                        <div key={answer.id}>
                            <input type="submit" id={parseInt(answer.id)}
                           className="bg-gray-50 border btn mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={ answer.value }
                           placeholder="Anwser"/>
                        </div>
                    )
                }) 
                }
                </form>
                </span>
            </div>
        </div>
    )        
}
}

export default GamePage;