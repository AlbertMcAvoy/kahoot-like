'use client';

import { TGame } from "../../../types/TGame";

type TProps = {
    state: string;
    currentGame: TGame | null;
}

const ResultPage = ({ state, currentGame }: TProps) => {

    const isHidden = () => {
        return state == 'game' || state == "result" ? '' : 'hidden';
    }

    return (
        <div className={'m-5 ' + isHidden()}>

            <div className="flex gap-5 m-6">
                {
                    currentGame?.playersList.map((player) => {
                        return (
                            <div key={player.id} className={"p-3 rounded " + (player.isOwner ? 'bg-red-500' : 'bg-primary')}>
                                <span> {player.username} | {player.score} points</span>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ResultPage;