export const formatNumber = (numStr: number | string | undefined, dec = 0) => {
  if (numStr === undefined) return '0';

  // console.log(Number(numStr) < 1 ? `####numStr: ${numStr}####` : 'none');

  if (Number(numStr) < 1) {
    return Number(numStr).toFixed(dec) + '';
  }

  const result = isFinite(Number(numStr))
    ? Number(numStr).toLocaleString('en-US', {
        maximumFractionDigits: dec,
        minimumFractionDigits: dec,
      })
    : '0';
  return result;
};
