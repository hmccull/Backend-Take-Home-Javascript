class UsageParser {

  static parse(input) {

    // check for valid input
    // if (input.length < 2 || typeof input !== 'string' || !Array.isArray(input)) {
    //   throw "Please provide valid input";
    // }

    // parsed output
    let parsedResult = [];

    // if input is a string
    if (typeof input === 'string') {
      let strArr = input.split(',');
      // check last digit of id
      strArr[0][strArr[0].length - 1] === '4' ? extendedParse(strArr) : 
      strArr[0][strArr[0].length - 1] === '6' ? hexParse(strArr) :
      basicParse(strArr);
    };

    // if input is an array
    if (Array.isArray(input)) {
      input.forEach((el) => {
        let elArr = el.split(',');
        // check last digit of id
        elArr[0][elArr[0].length - 1] === '4' ? extendedParse(elArr) :
        elArr[0][elArr[0].length - 1] === '6' ? hexParse(elArr) :
        basicParse(elArr);
      });
    };

    // parse input with ids ending with 4
    function extendedParse(strArr) {
      // parse add objects(s) to output array
      parsedResult.push({
        id: parseInt(strArr[0]),
        bytes_used: parseInt(strArr[3]),
        mnc: parseInt(strArr[2]),
        dmcc: strArr[1],
        cellid: parseInt(strArr[4]),
        ip: null,
      });
    };
    
    // parse input with ids ending with 6
    function hexParse(strArr) {

      // create substrings
      let mnc = strArr[1].substring(0, 4);
      let bytes_used = strArr[1].substring(4, 8);
      let cellid = strArr[1].substring(8, 16);
      let ipArr = strArr[1].substring(16, 24).match(/.{1,2}/g);
      let ip = '';

      // parse and format ip 
      ipArr.forEach((el, idx, array) => {
        idx !== array.length - 1 ? ip += parseInt(el, 16) + '.' : ip += parseInt(el, 16);
      });

      // parse and add objects(s) to output array
      parsedResult.push({
        id: parseInt(strArr[0]),
        bytes_used: parseInt(bytes_used, 16),
        mnc: parseInt(mnc, 16),
        dmcc: null,
        cellid: parseInt(cellid, 16),
        ip: ip
      });
    };

    // parse input with ids not ending with 4 or 6
    function basicParse(strArr) {
      // parse and add objects(s) to output array
      parsedResult.push({
        id: parseInt(strArr[0]),
        bytes_used: parseInt(strArr[1]),
        mnc: null,
        dmcc: null,
        cellid: null,
        ip: null,
      });
    };
    
    return parsedResult;
  };
}

export default UsageParser;
