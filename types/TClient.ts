export type TClient = {
    id: string;
    username: string;
    score: number;
    isOwner: boolean;
    clientEmit: (ev, ...args) => boolean;
}