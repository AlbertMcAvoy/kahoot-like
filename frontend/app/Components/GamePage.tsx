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

const GamePage = ({ socket, state, currentGame, currentPlayer }: TProps) => {

    const isHidden = () => {
        return state !== 'game' ? 'hidden' : '';
    }


    return (
        console.log(currentGame?.questionsList[0])
        // <div className={ 'm-5 ' + isHidden()}>
        //     Game id: <span className="text-highlight"> {currentGame?.id} </span>

        //     <div className="flex gap-5 m-6">
        //         <span>
        //         </span>
        //     </div>
        // </div>
    )
}

export default GamePage;