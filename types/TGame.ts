import {TClient} from "./TClient";

export type TGame = {
    id: string;
    topic: string;
    difficulty: string;
    totalRound: number;
    currentRound: number;
    playersList: TClient[];
}