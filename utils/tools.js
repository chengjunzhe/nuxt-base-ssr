// 判断设备类型
export function judgeDeviceType() {
  const ua = window.navigator.userAgent.toLocaleLowerCase()
  const isIOS = /iphone|ipad|ipod/.test(ua)
  const isAndroid = /android/.test(ua)
  return {
    isIOS,
    isAndroid,
  }
}

// blob 转file
export function blobToFile(theBlob, imganme) {
  const file = new window.File([theBlob], imganme, { type: 'image/jpeg' })
  return file
}
