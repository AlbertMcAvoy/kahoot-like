'use client';

import MainPage from "@/app/Components/MainPage";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {TGame} from "../../types/TGame";
import {TClient} from "../../types/TClient";
import LobbyPage from "@/app/Components/LobbyPage";
import GamePage from "@/app/Components/GamePage";

const socket = io('http://localhost:3001');

export default function Home() {

    const [state, setState] = useState<string>('home');

    const [currentGame, setCurrentGame] = useState<TGame>(null);

    const [currentPlayer, setCurrentPlayer] = useState<TClient>(null);

    useEffect(() => {
        socket.on('client-kahoot-create', (data: {game: TGame, owner: TClient}) => {
            setCurrentGame(data.game);
            setCurrentPlayer(data.owner);
            setState('lobby');
        });

        socket.on('client-kahoot-join', (data: {game: TGame, player: TClient|null}) => {
            setCurrentGame(data.game);
            if (data.player != null) setCurrentPlayer(data.player);
            setState('lobby');
        });

        socket.on('client-kahoot-players', (data: TGame) => {
            setCurrentGame(data);
        });

        socket.on('client-kahoot-start', (data: TGame) => {
            setCurrentGame(data);
            setState('game');
        });

        socket.on('client-kahoot-answer', (data: TGame) => {
            if(data) {
                document.getElementById("FormAnswer")?.classList.add('hidden')
                alert("votre reponse a bien été comptabilisé")
            }
            else {
                alert("votre reponse n'a pas été comptabilisé veuillez retenter")
            }
        });

        socket.on('server-error', (data) => {
            alert(data.status + ' : ' + data.msg)
        });
    }, [currentGame]);

    const isHidden = () => {
        return currentGame === null ? 'hidden' : '';
    }

    const leave = () => {
        socket.emit('server-kahoot-leave', {
            username: currentPlayer.username,
            gameId: currentGame.id
        });

        setCurrentGame(null);
        setState('home');
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <div className="flex gap-6">
                <h1 className="text-4xl"> Kahoot Like </h1>
                <button className={'border border-2 btn-alert rounded p-2 ' + isHidden()}
                        onClick={() => leave()}> Leave the game </button>
            </div>
            <MainPage socket={socket} state={state} />
            <LobbyPage socket={socket} state={state} currentGame={currentGame} currentPlayer={currentPlayer} />
            <GamePage socket={socket} state={state} currentGame={currentGame} currentPlayer={currentPlayer} />
        </main>
    )
}
