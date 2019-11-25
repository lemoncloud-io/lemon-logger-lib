import io from 'socket.io-client';

export class SocketService {

    private serverURL: string = '';
    private eventName: string = 'LOGGER';
    private socket: SocketIOClient.Socket;

    constructor(url: string = '', eventName: string = 'LOGGER') {
        this.serverURL = url;
        this.eventName = eventName;
        this.socket = io.connect(this.serverURL);

        this.socket.on('connect', () => {
            // do nothing
        });
    }

    public sendMessage(message: string = '') {
        this.socket.emit(this.eventName, { message });
        // this.close();
    }

    public close() {
        this.socket.close();
    }

}
