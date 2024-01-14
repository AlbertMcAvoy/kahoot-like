import {IApiIA} from "./IApiIA";
import {TGame} from "../../../../types/TGame";
import {TQuestion} from "../../../../types/TQuestion";

export class FakeAIService implements IApiIA {
    getQuestion(game: TGame): Promise<TQuestion> {
        let question: TQuestion = {
            id: 0,
            value: "Quelle est la capitale de France ?",
            propositions: [
                {id: 0, value: "Dublin"},
                {id: 1, value: "Paris"},
                {id: 2, value: "Londre"},
                {id: 3, value: "Berlin"}
            ],
            answer: 1
        }

        return Promise.resolve(question);
    }
}