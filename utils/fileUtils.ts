import _get from 'lodash/get';

export const readAsDataURLAsync = (file : Blob) : Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 *
 * @param {{}} file
 * @param {Event} e
 * @returns {Promise<*>}
 */
const validateImageFile = (file : File, e: React.ChangeEvent<HTMLInputElement>) : Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
        e.target.value = '';
      reject('onlyImage');
    } else {
      resolve(true);
    }
  });
};

export const imageFileUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
  const file = _get(e, 'target.files[0]', null);
  if (file) {
    await validateImageFile(file, e);
    const dataUrl = await readAsDataURLAsync(file);
    return { file, dataUrl };
  } else {
    throw 'uploadFailed';
  }
};

export const multiImageUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
  const result : {file: File, dataUrl: string}[] = [];
  const files : File[] = _get(e, 'target.files', []);

  Array.from(files).forEach(async (file) => {
    if (file) {
      await validateImageFile(file, e);
      const dataUrl = await readAsDataURLAsync(file);
      result.push({ file, dataUrl });
    }
  });

  return result;
};


export const fileUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
  const file = _get(e, 'target.files[0]', null);
  if (file) {
    const dataUrl = await readAsDataURLAsync(file);
    return { file, dataUrl };
  }

  return { file: null, dataUrl: null };
};

export const downloadFile = (responseData : any, fileName : string = '') => {
  const url = window.URL.createObjectURL(new Blob([responseData.data]));
  const link = document.createElement('a');
  if (!fileName) {
    fileName = 'unknown';
    const contentDisposition = responseData.headers['content-disposition'];
    if (contentDisposition) {
      const [fileNameMatch] = contentDisposition.split(';').filter((str : string) => str.includes('filename'));
      if (fileNameMatch) [, fileName] = fileNameMatch.split('=');
    }
  }
  link.href = url;
  link.setAttribute('download', decodeURI(fileName));
  link.style.cssText = 'display:none';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const saveBlob = (data : Blob, filename : string) => {
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = URL.createObjectURL(data);
  anchor.click();
  URL.revokeObjectURL(anchor.href);
};
