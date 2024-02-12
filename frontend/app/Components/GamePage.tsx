'use client';

import { Socket } from "socket.io-client";
import { TGame } from "../../../types/TGame";
import { useEffect, useState } from "react";
import ResultPage from "./ResultPage";

type TProps = {
    socket: Socket;
    state: string;
    currentGame: TGame;
}

const GamePage = ({ socket, state, currentGame }: TProps) => {

    const [counter, setCounter] = useState<number>(10);

    const [hasAnswered, setHasAnswered] = useState<boolean>(false);

    const isHidden = () => {
        return state !== 'game' ? 'hidden' : '';
    }

    const hasAnsweredToQuestion = (isForm) => {
        return isForm ? hasAnswered ? 'hidden' : '' : hasAnswered ? '' : 'hidden';
    }

    const handleAnswer = (event: any) => {
        event.preventDefault();
        const playerAnswer = event.nativeEvent.submitter.id;
        let score = 0;
        if (playerAnswer == currentGame.questionsList[currentGame?.currentRound].answer) {
            score = 20 * counter;
        }
        socket.emit('server-kahoot-answer', {
            gameId: currentGame.id,
            score
        });
    }

    const handleEndOfRound = () => {
        socket.emit('server-kahoot-round', {
            gameId: currentGame?.id,
        });
    }

    const clientKahootAnswer = (data: TGame) => {
        if (data) {
            setHasAnswered(true);
        } else {
            alert("An error occured, please retry");
            setHasAnswered(false);
        }
    }

    useEffect(() => {
        if (counter > 0 && state === 'game') {
            const timer = setInterval(() => setCounter(counter - 1), 1000);
            return () => clearInterval(timer);
        } else if (state === 'game') {
            handleEndOfRound();
            setCounter(10);
            setHasAnswered(false);
        }
    }, [counter, state]);

    useEffect(() => {
        socket.off('client-kahoot-answer');
        socket.on('client-kahoot-answer', clientKahootAnswer);
    }, []);


    return (
        <div>
            <div className={'m-5 ' + isHidden()}>
                <p className="ms-6">Game id: <span className="text-highlight"> {currentGame?.id} </span></p>

                <div className="flex justify-center m-6 p-2 border border-2 border-white rounded">
                    <span className="text-5xl">{counter}</span>
                </div>

                <div className={'flex flex-col gap-5 m-6 ' + hasAnsweredToQuestion(true)}>
                    <span> {currentGame?.questionsList[currentGame?.currentRound]?.value} </span>
                    <form className={"flex flex-col gap-3"} onSubmit={(event) => handleAnswer(event)}>
                        {
                            currentGame?.questionsList[currentGame.currentRound]?.propositions.map((answer) => {
                                return (
                                    <input type="submit" id={answer.id.toString()} key={answer.id}
                                        className="bg-gray-50 border btn mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:hover:ring-blue-500 dark:hover:border-blue-500"
                                        value={answer.value}
                                        placeholder="Anwser" />
                                )
                            })
                        }
                    </form>
                </div>
                <p className={'ms-6 ' + hasAnsweredToQuestion(false)}> Attendez la fin du compteur pour passer à la question suivante </p>
            </div>
            <ResultPage socket={socket} state={state} currentGame={currentGame} />
        </div>
    )
}

export default GamePage;