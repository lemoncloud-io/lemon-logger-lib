import io from 'socket.io-client';

export class SocketService {
    private serverURL: string = '';
    private eventName: string = 'LOGGER';
    private connected: boolean = false;
    private socket: SocketIOClient.Socket;

    constructor(url: string = '', eventName: string = 'LOGGER') {
        this.serverURL = url;
        this.eventName = eventName;
        this.socket = io.connect(this.serverURL);

        this.socket.on('connect', () => {
            // TODO: add something...
            this.connected = true;
        });
    }

    public sendMessage(message: string = '') {
        this.socket.emit(this.eventName, { message });
    }

    public close() {
        if (this.connected) {
            this.socket.close();
            this.connected = false;
        }
    }
}
