import {TGame} from "../../../../types/TGame";
import {TQuestion} from "../../../../types/TQuestion";

export interface IApiIA {

    getQuestion(game: TGame): Promise<TQuestion>;
}