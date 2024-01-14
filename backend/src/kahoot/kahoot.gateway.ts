import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { TClient } from "../../../types/TClient";
import { TGame } from "../../../types/TGame";
import { IApiIA } from "./services/IApiIA";
import { FakeAIService } from "./services/FakeAI.service";
import { OpenAIService } from "./services/OpenAI.service";

@WebSocketGateway({ cors: true })
export class KahootGateway implements OnGatewayConnection, OnGatewayDisconnect {

    gameList: TGame[] = [];

    totalRound: number;

    @WebSocketServer()
    server: Socket;

    apiService: IApiIA;

    constructor() {
        this.apiService = process.env.OPEN_API_KEY != '' ? new OpenAIService() : new FakeAIService();
    }

    @SubscribeMessage('server-kahoot-create')
    handleCreateGame(
        @MessageBody() data: { username: string },
        @ConnectedSocket() client: Socket,
    ): void {

        let owner = this.getTclient(client, data.username, true);

        let newGame: TGame = {
            id: uuidv4(),
            topic: '',
            difficulty: '',
            currentRound: 0,
            playersList: [owner],
            totalRound: this.totalRound
        };

        this.gameList.push(newGame);

        client.emit('client-kahoot-create', newGame);
    }

    @SubscribeMessage('server-kahoot-join')
    handleJoinGame(
        @MessageBody() data: { username: string, gameId: string },
        @ConnectedSocket() client: Socket
    ): void {
        const player = this.getTclient(client, data.username);
        const cGame = this.getCurrentGame(data.gameId, client);

        cGame.playersList.push(player);

        cGame.playersList.forEach((c) => {
            c.clientEmit('client-kahoot-join', cGame);
        });
    }

    @SubscribeMessage('server-kahoot-leave')
    handleLeaveGame(
        @MessageBody() data: { username: string, gameId: string },
        @ConnectedSocket() client: Socket
    ): void {
        const cGame = this.getCurrentGame(data.gameId, client);

        cGame.playersList.splice(
            cGame.playersList.findIndex((c) => c.id === client.id),
            1,
        );

        cGame.playersList.forEach((c) => {
            c.clientEmit('client-kahoot-players', cGame);
        });
    }

    @SubscribeMessage('server-kahoot-round')
    handleRoundGame(
        @MessageBody() data: { gameId: String },
        @ConnectedSocket() client: Socket
    ): void {
        const cGame = this.getCurrentGame(data.gameId, client);
        cGame.currentRound++;

        if (cGame.currentRound > cGame.totalRound) {
            this.gameList.splice(
                this.gameList.findIndex((g) => g.id === data.gameId),
                1,
            );

            cGame.playersList.forEach((c) => {
                c.clientEmit('client-kahoot-end', cGame);
            });
        } else {
            cGame.playersList.forEach((c) => {
                c.clientEmit('client-kahoot-round', this.apiService.getQuestion(cGame));
            });
        }
    }

    @SubscribeMessage('server-kahoot-answer')
    handleAnswerPlayer(
        @MessageBody() data: { gameId: string, score: string },
        @ConnectedSocket() client: Socket
    ): void {

        try {
            const cGame = this.getCurrentGame(data.gameId, client);

            const cPlayer = cGame.playersList.find(p => p.id === client.id);
            cPlayer.score += Number(data.score);

            client.emit('client-kahoot-answer', true);
        } catch (e) {
            client.emit('client-kahoot-answer', false);
        }
    }

    handleConnection(client: any, ...args: any[]): any {
        console.log('\nclient connected', client.id);
    }

    handleDisconnect(client: any): any {
        console.log('\nclient disconnected', client.id);
    }

    private getCurrentGame(gameId: string, client: Socket) {
        const cGame = this.gameList.find(g => g.id === gameId);

        if (cGame === undefined) {
            client.emit('server-error', {
                status: 404,
                msg: 'This ID seems to be invalid !'
            })
        }
        return cGame;
    }

    private getTclient(
        client: Socket,
        username: string,
        isOwner: boolean = false
    ): TClient {
        return {
            id: client.id,
            isOwner,
            score: 0,
            username,
            clientEmit: client.emit
        };
    }
}