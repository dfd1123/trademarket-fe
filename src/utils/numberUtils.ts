export const formatNumber = (numStr: number | string | undefined, dec = 0) => {
  if (numStr === undefined) return '0';
  
  let minus = false;

  // console.log(Number(numStr) < 1 ? `####numStr: ${numStr}####` : 'none');

  if (Number(numStr) === 0) {
    return Number(numStr).toFixed(dec) + '';
  }else if(Number(numStr) < 0){
    minus = true;
    numStr = numStr.toString().replace('-', '');
  }

  const result = isFinite(Number(numStr))
    ? Number(numStr).toLocaleString('en-US', {
        maximumFractionDigits: dec,
        minimumFractionDigits: dec,
      })
    : '0';

  return minus ? '-' + result :result;
};

export const unformatNumber = (number: string): number => {
  if (!number) return 0;
  return Number(number.toString().replace(/,/gi, ""));
};
