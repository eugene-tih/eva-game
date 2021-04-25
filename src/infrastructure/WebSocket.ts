import * as WebSocket from 'ws';
import http from 'http';
import https from 'https';

type Room = string;

export class Socket {
    public readonly id: string;

    public connected: boolean;
    public disconnected: boolean;

    private readonly _sessions: Map<string, Socket>;
    private readonly _rooms: Set<Room> = new Set();

    private readonly _wss: WebSocket.Server;
    // private readonly _clientHandler: ClientConnectionHandler;
    public constructor(server: http.Server | https.Server) {
        this.id = ''; // @TODO Generate ID
        this._wss = new WebSocket.Server({ server });
        // this._clientHandler = new ClientConnectionHandler();
        this._sessions = new Map<string, Socket>();

        this.connected = true;
        this.disconnected = false;
        this._setup();
    }

    private _setup(): void {
        this._wss.on('connection', this._onconnect);
        this._wss.on('close', this._onclose);
    }

    private _onconnect(socket: WebSocket, request: http.IncomingMessage): void {
        debugger;
        console.log(socket, request);
        /**
         * Action list
         * 1) Get User id from JWT Token
         * 2) Get Room id for this user from DB
         * 3) Create association with this user and room (new Map(Room, new Set(userId1, userId2)))
         * 4)
         */
        socket.on('message', function (message) {
            console.log(`Received message ${message} from user ${0}`);
        });

        socket.on('close', function () {
            // Remove user from Map
        });
    }

    private _onclose(): void {
        console.log();
    }

    private destroy(): void {
        this._wss.off('connection', this._onconnect);
        this._wss.off('close', this._onclose);

        this.connected = false;
        this.disconnected = true;
    }
}

// class ClientConnectionHandler {
//     public onmessage(): void {
//
//     }
//
//     public onclose(): void {
//
//     }
// }
