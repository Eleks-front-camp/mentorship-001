var helper = (function () {
  var getObjectById = function (data, id) {
    return data.filter(function (item) { return item.id == id })[0];
  }

  return {
    getObjectById: getObjectById
  };
})();