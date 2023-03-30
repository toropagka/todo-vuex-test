let guidFactory = (function () {
  function getRandomString() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  function gen(t) {
    let result = '';
    for (let i = 0; i < t; ++i) result += getRandomString();
    return result;
  }
  return {
    create: function () {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    },
  };
})();

export default guidFactory;
