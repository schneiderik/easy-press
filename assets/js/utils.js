export default {
  array: {
    unique: function (ary) {
      return [...new Set(ary)];
    },
    flatten: function (ary) {
      return ary.reduce(
        (acc, cur) => acc.concat(cur),
        []
      );
    }
  }
}
