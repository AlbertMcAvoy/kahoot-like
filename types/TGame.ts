import {TClient} from "./TClient";
import {TQuestion} from "./TQuestion";

export type TGame = {
    id: string;
    topic: string;
    difficulty: string;
    totalRound: number;
    currentRound: number;
    playersList: TClient[];
    questionsList: TQuestion[];
}