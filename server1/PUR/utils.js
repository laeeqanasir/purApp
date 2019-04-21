var clamp = require("@nathanfaucett/clamp"),
  isUndefined = require("@nathanfaucett/is_undefined");

class Util {
  nextDouble() {
    return Math.round(Math.random());
  }

  nextInt(num) {
    return Math.floor(Math.random() * num);
  }


  copyArray(src, srcPos, dest, destPos, length) {
    var srcLength = src.length;

    srcPos = clamp(srcPos, 0, srcLength);
    length = isUndefined(length) ? srcLength - srcPos : length;
    destPos = clamp(destPos, 0, length);

    return this.baseArrayCopy(src, srcPos, dest, destPos, length);
  }

  baseArrayCopy(src, srcPos, dest, destPos, length) {
    var i = srcPos - 1,
      il = srcPos + length - 1;

    while (i++ < il) {
      dest[destPos++] = src[i];
    }

    return dest;
  }
}

module.exports = Util;
