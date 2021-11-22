/** 图片压缩
 * @param {Object} fileObj
 * @param {function} cb
 * 图片对象
 * 回调函数
 */

export function compress(fileObj, cb) {
  try {
    // 压缩图片需要的一些元素和对象
    const img = new Image()

    // 缩放图片需要的canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    img.src = URL.createObjectURL(fileObj)
    // base64地址图片加载完毕后
    img.onload = function () {
      // 图片原始尺寸
      const originWidth = this.width
      const originHeight = this.height
      // 最大尺寸限制
      const maxWidth = 400
      const maxHeight = 400
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      // image size more than 50kb and compress
      if (fileObj.size / 1024 >= 50) {
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
      }

      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      // canvas转为blob并上传
      canvas.toBlob(function (blob) {
        cb(blob)
        console.log('压缩成功 toblob ', URL.createObjectURL(blob))
      }, fileObj.type || 'image/png')
    }
  } catch (e) {
    console.log('压缩失败：', e)
  }
}
