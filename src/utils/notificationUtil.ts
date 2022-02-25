export const setPushAlarm = (params: boolean) => {
  const loginOs = window.navigator.userAgent;
  try {
    if (loginOs === 'Android') {
      // 안드로이드일때
      if (typeof window.myJs !== 'undefined') {
        if (typeof window.myJs.pushSetting !== 'undefined') {
          const andParams = JSON.stringify(params);
          window.myJs.pushSetting(andParams);
        }
      }
    } else if (loginOs === 'iOS') {
      // 아이폰일때
      if (typeof webkit !== 'undefined') {
        if (window.webkit.messageHandlers.pushSetting) {
          window.webkit.messageHandlers.pushSetting.postMessage(params);
        }
      }
    }
  } catch (e) {
    console.log('push notification error on mypage', e);
  }
};
