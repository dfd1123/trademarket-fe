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