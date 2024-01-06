export type TQuestion = {
    id: number;
    value: string;
    propositions: { id: number; value: string }[];
    answer: number
}