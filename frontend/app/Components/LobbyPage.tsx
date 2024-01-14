'use client';

import {Socket} from "socket.io-client";
import {TGame} from "../../../types/TGame";

type TProps = {
    socket: Socket;
    state: string;
    currentGame: TGame;
}

const LobbyPage = ({ socket, state, currentGame }: TProps) => {

    const isHidden = () => {
        return state !== 'lobby' ? 'hidden' : '';
    }

    return (
        <div className={ 'm-20 ' + isHidden()}>
            C'est le lobby de la game : {currentGame?.id}
        </div>
    )
}

export default LobbyPage;