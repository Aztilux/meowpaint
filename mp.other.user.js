Object.defineProperty(window.console, 'log', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: console.log
});
Object.defineProperty(window, 'setInterval', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: setInterval
});
Object.defineProperty(window, 'setTimeout', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: setTimeout
});

const colors = new Uint32Array([
  0xFFFFFF, 0xC4C4C4, 0x888888, 0x555555, 0x222222, 0x000000, 0x006600, 0x22B14C,
  0x02BE01, 0x51E119, 0x94E044, 0xFBFF5B, 0xE5D900, 0xE6BE0C, 0xE59500, 0xA06A42,
  0x99530D, 0x633C1F, 0x6B0000, 0x9F0000, 0xE50000, 0xFF3904, 0xBB4F00, 0xFF755F,
  0xFFC49F, 0xFFDFCC, 0xFFA7D1, 0xCF6EE4, 0xEC08EC, 0x820080, 0x5100FF, 0x020763,
  0x0000EA, 0x044BFF, 0x6583CF, 0x36BAFF, 0x0083C7, 0x00D3DD, 0x45FFC8, 0x003638,
  0x477050, 0x98FB98, 0xFF7000, 0xCE2939, 0xFF416A, 0x7D26CD, 0x330077, 0x005BA1,
  0xB5E8EE, 0x1B7400
]);