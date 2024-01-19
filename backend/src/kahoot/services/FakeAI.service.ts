import {IApiIA} from "./IApiIA";
import {TGame} from "../../../../types/TGame";
import {TQuestion} from "../../../../types/TQuestion";

export class FakeAIService implements IApiIA {
    fillGameQuestionList(game: TGame): Promise<TGame> {
        const question1: TQuestion = {
            id: 0,
            value: "Quelle est la capitale de France ?",
            propositions: [
                {id: 0, value: "Dublin"},
                {id: 1, value: "Paris"},
                {id: 2, value: "Londre"},
                {id: 3, value: "Berlin"}
            ],
            answer: 1
        };

        let question2: TQuestion = {
            id: 1,
            value: "Combien y a-t-il d'Etats en Amérique ?",
            propositions: [
                {id: 0, value: "52"},
                {id: 1, value: "47"},
                {id: 2, value: "50"},
                {id: 3, value: "61"}
            ],
            answer: 2
        };

        game.questionsList.push(question1);
        game.questionsList.push(question2);

        return Promise.resolve(game);
    }
}