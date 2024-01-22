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

const LobbyPage = ({ socket, state, currentGame, currentPlayer }: TProps) => {

    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [totalRound, setTotalRound] = useState(0);

    const isHidden = () => {
        return state !== 'lobby' ? 'hidden' : '';
    }

    const handleStartGame = (event: any) => {
        event.preventDefault();
        let gameId = currentGame.id
        socket.emit('server-kahoot-start', {
            gameId,
            topic,
            difficulty,
            totalRound
        });
    }

    const start = () => {
        socket.emit('server-kahoot-start', {
            gameId: currentGame.id,
            difficulty: 'Facile',
            topic: 'Géographie',
            totalRound: 8
        });
    }

    return (
        <div className={ 'm-5 ' + isHidden()}>
            Game id: <span className="text-highlight"> {currentGame?.id} </span>

            <button className={'border border-2 btn-alert rounded p-2 ' + isHidden()}
                    onClick={() => start()}> Start the game </button>

            <div className="flex gap-5 m-6">
                { 
                currentGame?.playersList.map((player) => {
                    return (
                        <div key={player.id} className={"p-3 rounded " + (player.isOwner ? 'bg-red-500' : 'bg-primary')}>
                            <span> { player.username } </span>
                        </div>
                    )
                }) }
            </div>

            <form className={(currentPlayer?.isOwner ? '' : 'hidden')} onSubmit={(event) => handleStartGame(event)}>
                <div>
                    <label htmlFor="topic"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Topic </label>
                    <input type="text" id="topic"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={topic}
                           onChange={e => setTopic(e.currentTarget.value)}
                           placeholder="Pays" required />
                </div>
                <div>
                    <label htmlFor="difficulty"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Difficulty </label>
                    <input type="text" id="difficulty"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={difficulty}
                           onChange={e => setDifficulty(e.currentTarget.value)}
                           placeholder="Facile" required />
                </div>
                <div>
                    <label htmlFor="totalRound"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Total Round </label>
                    <input type="text" id="totalRound"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={totalRound}
                           onChange={e => setTotalRound(parseInt(e.currentTarget.value))}
                           placeholder="3" required />
                </div>
                <button className={"border bg-slate-300 border-slate-300 hover:border-slate-500 p-2 rounded text-secondary"} type="submit">Démarrer</button>
            </form>
        </div>
    )
}

export default LobbyPage;