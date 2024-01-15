'use client';

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

    const isHidden = () => {
        return state !== 'lobby' ? 'hidden' : '';
    }

    const isOwnerClass = (isOwner) => {
        return isOwner ? 'bg-red-500' : 'bg-primary'
    }

    return (
        <div className={ 'm-5 ' + isHidden()}>
            Game id: <span className="text-highlight"> {currentGame?.id} </span>

            <div className="flex gap-5 m-6">
                { currentGame?.playersList.map((player) => {
                    return (
                        <div key={player.id} className={"p-3  rounded " + isOwnerClass(player.isOwner)}>
                            <span> { player.username } </span>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default LobbyPage;