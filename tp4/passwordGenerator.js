const getSequence = {
  from: 0,
  to: 10,

  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};

export function passwordGenerator(params, length) {
  if (
    typeof params !== "object" ||
    (!params.uppers && !params.lowers && !params.numbers && !params.symbols)
  )
    params = {
      uppers: true,
      lowers: true,
      numbers: true,
      lowers: true,
    };
  if (typeof length !== "number") throw new Error("length is not a number");

  let chars = [];
  const config = {
    uppers: [65, 91],
    lowers: [97, 122],
    numbers: [48, 57],
  };

  for (const seq in config) {
    if (!params[seq]) continue;
    getSequence.from = config[seq][0];
    getSequence.to = config[seq][1];

    chars.push([[...getSequence]]); // an array of array
  }

  // if (params.symbols) chars.push(["~!@#$%^&*_+-=?./;".split("")]);

  // chars = chars.map((e) => String.fromCharCode(e));

  alert(chars);
}

passwordGenerator({}, 12);
