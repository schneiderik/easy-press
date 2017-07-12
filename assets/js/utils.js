export default {
  integer: {
    toUSD: function (i) {
      return (i/100).toFixed(2);
    }
  },
  func: {
    noop: function () {
      return;
    }
  },
  array: {
    uniq: function (ary) {
      let s = new Set(ary);

      return [...s];
    },
    flatten: function (ary) {
      return ary.reduce(
        (acc, cur) => acc.concat(cur),
        []
      );
    },
    remove: function (ary, value) {
      let index = ary.indexOf(value)

      if (index !== -1) {
        ary.splice(index, 1);
      }

      return ary;
    },
    includes: function (ary, value) {
      return ary.indexOf(value) !== -1;
    },
    collect: function (ary, iterator) {
      return ary.reduce((acc, i) => {
        acc = acc.concat(iterator(i));

        return acc;
      }, [])
    }
  }
}
