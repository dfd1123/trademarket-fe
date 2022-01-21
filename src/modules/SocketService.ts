import WebSocketAsPromised from 'websocket-as-promised';
import {TransactionInputType} from '@/types/TransactionType';

class SocketService {
  private readonly ws: WebSocket | undefined;
  private readonly liveWs!: WebSocket;
  private readonly asyncWs: WebSocketAsPromised | undefined;
  public liveTrCodes: string[] = [];
  requestTrCode = {};

  constructor(){
    const webSocketUrl = process.env.WS_HOST;
    if (!webSocketUrl) return;
    this.liveWs = new WebSocket(webSocketUrl);
    window.addEventListener("beforeunload", () => {
      this.close();
    });
  }

  async init() {
    this.liveWs.onopen = () => {
      console.log('Live WS Connected!')
    };

    this.liveWs.onclose = (event) => {
      if (event.wasClean) {
        console.log("[live close] 커넥션 종료됨");
      } else {
        console.log("[live close] 커넥션 error");
      }
    };

    this.liveWs.onmessage = ({ data } : MessageEvent) : void => {
      data = JSON.parse(data);
      this.handleLiveTransaction(<MessageEvent<any>>{data});
    };

    this.liveWs.onerror = (error) => {
      console.error('Socket error in SocketService: ', error);
    };
  };

  handleLiveTransaction({data} : MessageEvent<any>) {
    // console.log('live data : ', data);
  }

  liveSend(input: TransactionInputType, key = '') :string | undefined {
    this.liveWs.send(JSON.stringify(input));

    switch (input.Header.trcode) {
      case 't9732':
        // console.log(`9732 to send : `, json);
        return `${input.Header.trcode}_${input.Input1.szCurNo}`;

      /*===========================================================
            | 현물종목은 symbolList가 아닌 CoinInfo에서                   |
            | transaction 을 request 해주기 때문에 key를 리턴해줘야한다    |
            ===========================================================*/
      case '91':
        return `${input.Header.trcode}_${input.Input1.Key1}`;
      case '92':
        return `${input.Header.trcode}_${input.Input1.Key1}`;
      case '95':
        return input.Header.trcode;
      case '96':
        return input.Header.trcode;
      case '98':
        return input.Header.trcode;
      default:
        console.log('default', input.Header.trcode);
        return `${input.Header.trcode}`;
    }
  }

  close(){
    this.liveWs.close();
    console.log('live ws connection closed.');
  }
}

const socketService = new SocketService();
export default socketService;
