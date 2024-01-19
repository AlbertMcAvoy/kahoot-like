import {TGame} from "../../../../types/TGame";

export interface IApiIA {

    fillGameQuestionList(game: TGame): Promise<TGame>;
}