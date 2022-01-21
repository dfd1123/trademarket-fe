import WebSocketAsPromised from 'websocket-as-promised';

export type TransactionInputType = {
  Header: {
    function: 'D' | 'A';
    termtype: 'HTS';
    trcode: string;
    trid?: string;
    userid?: string | undefined;
    token?: string | undefined;
  };
  Input1: Record<string, any>;
};

class SocketService {
  private readonly ws: WebSocket | undefined;
  private readonly liveWs: WebSocket | undefined;
  private readonly asyncWs: WebSocketAsPromised | undefined;
  public liveTrCodes: string[] = [];
  requestTrCode = {};

  constructor(){
    const webSocketUrl = process.env.WS_HOST;
    console.log(process.env,import.meta.env, process.env.WS_HOST);
    if (!webSocketUrl) return;
    this.liveWs = new WebSocket(webSocketUrl);
    // console.log(this.liveWs);
    this.asyncWs = new WebSocketAsPromised(webSocketUrl, {
      packMessage: data => JSON.stringify(data),
      unpackMessage: (data) => JSON.parse(<string>data),
      attachRequestId: (data, requestId) => Object.assign({id: requestId}, data), // attach requestId to message as `id` field
      extractRequestId: data => data && data.id,
    });
  //   this.asyncWs = new WebSocket(webSocketUrl);
  }

  async init() {
    if(!this.liveWs) return alert('No Live socket connection');

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

    this.asyncWs.onUnpackedMessage.addListener(data => {
      // @ts-ignore
      console.log('JW', this.requestTrCode);
      this.requestTrCode[data.Header.trcode](data);
    });


    ///

    // this.asyncWs.onopen = () => {
    //   console.log('Live WS Connected!')
    // };
    //
    // this.asyncWs.onclose = (event) => {
    //   if (event.wasClean) {
    //     console.log("[live close] 커넥션 종료됨");
    //   } else {
    //     console.log("[live close] 커넥션 error");
    //   }
    // };
    //
    // this.asyncWs.onmessage = ({ data } : MessageEvent) : void => {
    //   data = JSON.parse(data);
    //   this.handleLiveTransaction(<MessageEvent<any>>{data});
    // };
    //
    // this.asyncWs.onerror = (error) => {
    //   console.error('Socket error in SocketService: ', error);
    // };
  };

  handleLiveTransaction({data} : MessageEvent<any>) {
    // console.log('live data : ', data);
  }

  liveSend(input: TransactionInputType, key = '') :string | undefined {
    if (!this.liveWs) {
      alert('No socket connection');
      return;
    }

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

  async asyncSend(data: TransactionInputType) : any | void {
    if(!this.asyncWs) return alert('No Async socket connection');

    await this.asyncWs.open();
    this.asyncWs.sendRequest(data);
    console.log(data.Header.trcode);
    this.asyncWs.close();
    console.log(data.Header.trcode);
    return new Promise((resolve, reject) => {
      // @ts-ignore
      this.requestTrCode[data.Header.trcode] = resolve;
    })
  }
}

const socketService = new SocketService();
export default socketService;
