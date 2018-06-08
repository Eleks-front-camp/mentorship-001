var helper = (function () {
  return {
    getObjectById: function (data, id) {
      return data.filter(function (item) { return item.id == id })[0];
    }
  };
})();