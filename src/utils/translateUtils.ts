export const translateSzPoCode = (data, isWallet) => {
  data = data.replace(/ /g, '');
  switch (data) {
    case '079':
      if (isWallet) {
        return 'In';
      } else {
        return 'Buy';
      }
    case '080':
      return 'Close Sell';
    case '081':
      if (isWallet) {
        return 'Out';
      } else {
        return 'Sell';
      }
    case '082':
      return 'Close Buy';
    case '001':
      return 'Deposit';
    case '098':
      return 'Sales Commission';
    case '120':
      return 'Convert Deposit';
    case '002':
      return 'Withdraw';
    case '125':
      return 'Convert Withdraw';
    case '106':
      return 'Commission';
    case '107':
      return 'Open Commission';
    case '108':
      return 'Close Commission';
    case '061':
      return 'Profit';
    case '062':
      return 'Loss';

    default:
      return data;
  }
};

export const translateOrderType = (data, isWallet) => {
  data = data.replace(/ /g, '');
  switch (data) {
    case 'UOM':
      return 'Market';
    case 'UOE':
      return 'Limit';
    case 'UCM':
      return 'Close Order';
    case 'MCM':
      return 'Margin Call Close';
    case 'MOM':
      return 'Margin Call';
    case 'SOM':
      if (isWallet) {
        return 'Transfer';
      } else {
        return 'System Market';
      }
    case 'SCM':
      return 'System Close Order';
    case 'EOM':
      return 'Convert';
    case 'UCEL':
      return 'Limit Close';
    case 'UCES':
      return 'Stop Close';
    default:
      return data;
  }
};

export const translateAccountingCode = (code: string) => {
  switch (code) {
    case '001':
      return 'Deposit';
    case '098':
      return 'Sales Commission';
    case '120':
      return 'Convert Deposit';
    case '002':
      return 'Withdraw';
    case '125':
      return 'Convert Withdraw';
    case '106':
      return 'Commission';
    case '107':
      return 'Open Commission';
    case '108':
      return 'Close Commission';
    case '061':
      return 'Profit';
    case '062':
      return 'Loss';
    default:
      return '';
  }
};
