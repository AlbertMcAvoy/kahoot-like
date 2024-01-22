import OpenAI from 'openai';
import {IApiIA} from "./IApiIA";
import {TGame} from "../../../../types/TGame";
import {config} from "dotenv";
config();

export class OpenAIService implements IApiIA {
    openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY,
    });

    async fillGameQuestionList(game: TGame): Promise<TGame> {
        const prompt = `Donnes moi un quizz ${game.difficulty} de ${game.totalRound} questions sur ce thème ${game.topic}.`;

        const completion = await this.openai.chat.completions.create({
            temperature: 0,
            response_format: { "type": "json_object" },
            messages: [
                {
                    role: 'system',
                    content: 'Tu es un robot qui génère des quizz sur un thème et une difficulté qu\'on te donne. Tu proposes des questions et les réponses en donnant la bonne réponse au format JSON',
                },
                {
                    role: 'assistant',
                    content: 'Exemple de réponses : {questions: [{id: 0; value: "Quelle est la capitale de France ?"; propositions: [{id: 1; value: "Berlin"}, {id: 2; value: "Paris"}, {id: 3; value: "Madrid"}, {id: 4; value: "Lisbonne"}]; answer: 2}, {id: 1; value: "Combien y a-t-il d\'Etats en Amérique ?"; propositions: [{id: 1; value: "25"}, {id: 2; value: "61"}, {id: 3; value: "47"}, {id: 4; value: "50"}]; answer: 4}]}'
                },
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            model: 'gpt-3.5-turbo-1106',
        });

        game.questionsList = JSON.parse(completion.choices[0].message.content).questions;

        return game;
    }
}