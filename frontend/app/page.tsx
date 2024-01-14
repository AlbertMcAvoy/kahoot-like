'use client';

import MainPage from "@/app/Components/MainPage";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {TGame} from "../../types/TGame";
import LobbyPage from "@/app/Components/LobbyPage";

const socket = io('http://localhost:3001');

export default function Home() {

    const [state, setState] = useState<string>('home');

    const [currentGame, setCurrentGame] = useState<TGame>(null);

    useEffect(() => {
        socket.on('client-kahoot-create', (data) => {
            console.log(data.id)
            setCurrentGame(data);
            setState('lobby');
        });

        socket.on('client-kahoot-join', (data) => {
            setCurrentGame(data);
            setState('lobby');
        });

        socket.on('server-error', (data) => {
            alert(data.status + ' : ' + data.msg)
        });
    }, [currentGame]);

    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <h1 className="text-4xl"> Kahoot Like </h1>
            <MainPage socket={socket} state={state} />
            <LobbyPage socket={socket} state={state} currentGame={currentGame} />
        </main>
    )
}
