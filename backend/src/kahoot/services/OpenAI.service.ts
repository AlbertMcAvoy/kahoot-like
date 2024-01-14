import {IApiIA} from "./IApiIA";
import {TGame} from "../../../../types/TGame";
import {TQuestion} from "../../../../types/TQuestion";

export class OpenAIService implements IApiIA {
    getQuestion(game: TGame): Promise<TQuestion> {
        return Promise.resolve(undefined);
    }
}