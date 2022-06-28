const _ = {
  clamp(number, lower, upper) {
    const lowerClampedValue = Math.max(number, lower);
    const clampedValue = Math.min(lowerClampedValue, upper);
    return clampedValue;
  },

  inRange(number, start, end) {
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    if (start > end) {
      let temp = end;
      end = start;
      start = temp;
    }
    let isInRange = number >= start && number < end;
    return isInRange;
  },

  words(string) {
    let words = string.split(" ");
    return words;
  },

  pad(string, length) {
    let result;
    if (length <= string.length) {
      return (result = string);
    }
    let startPaddingLength = Math.floor((length - string.length) / 2);
    let endPaddingLength = length - string.length - startPaddingLength;
    let paddedString =
      " ".repeat(startPaddingLength) + string + " ".repeat(endPaddingLength);
    return paddedString;
  },
  // TODO improve
  has(object, key) {
    let hasValue = typeof object[key] !== "undefined";
    return hasValue;
  },
  // TODO improve
  invert(object) {
    let invertedObject = {};
    for (let key in object) {
      console.log("key: " + key);
      const originalValue = object[key];
      console.log("originalValue: " + originalValue);
      invertedObject = { originalValue: key };
    }
    console.log("invertedObject key1: " + invertedObject["originalValue"]);
    console.log("invertedObject key2: " + invertedObject["originalValue2"]);
    return invertedObject;
  },

  findKey(object, predicate) {
    for (let key in object) {
      let value = object[key];
      let predicateReturnValue = predicate(value);
      if (predicateReturnValue) {
        return key;
      }
    }
    return undefined;
  },

  drop(array, n) {
    if (n === undefined) {
      n = 1;
    }
    let droppedArray = array.slice(n);
    return droppedArray;
  },

  dropWhile(array, predicate) {
    let dropNumber = array.findIndex((element, index) => {
      return !predicate(element, index, array);
    });
    const droppedArray = this.drop(array, dropNumber);
    return droppedArray;
  },

  chunk(array, size) {
    if (size === undefined) {
      size = 1;
    }
    let arrayChunks = [];
    for (let i = 0; i < array.length; i += size) {
      let arrayChunk = array.slice(i, i + size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  },
};

// Do not write or modify code below this line.
module.exports = _;
