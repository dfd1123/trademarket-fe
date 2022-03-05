import useService from '@/hooks/useService';

interface PropsType {
  isOn: boolean;
}

export const setPushAlarm = (params: PropsType) => {
  const loginOs = window.navigator.userAgent;
  try {
    if (loginOs.includes('Android')) {
      // 안드로이드일때
      if (typeof window.myJs !== 'undefined') {
        if (typeof window.myJs.pushSetting !== 'undefined') {
          const andParams = JSON.stringify(params);
          window.myJs.pushSetting(andParams);
        }
      }
    } else if (loginOs.includes('iOS')) {
      // 아이폰일때
      if (typeof window.webkit !== 'undefined') {
        if (window.webkit.messageHandlers.pushSetting) {
          window.webkit.messageHandlers.pushSetting.postMessage(params);
        }
      }
    }
  } catch (e) {
    // console.log('push notification error on mypage', e);
  }
};
