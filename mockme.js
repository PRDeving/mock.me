(function(context, factory) {
  window.MockMe = {
    _interceptors: {},
    endPoints: _endPoints,
    number: _random,
    money: _randomCurrency,
    boolean: _randomBoolean,
    id: _randomID,
    name: _randomName,
  };

  // intercept angularJS 1.X
  if (!!context.angular) {
    window.angular._module = window.angular.module;
    window.angular.module = function() {
      return context.angular._module.apply(null, arguments).run(["$http", function($http) {factory($http)}]);
    }
  }
  // intercept JQuery
  !!context.$ && factory(window.$);

  // MOCKTOOLS
  function _endPoints(ep) {
    for (var p in ep) {
      window.MockMe._interceptors[p] = ep[p];
    }
  }
  function _random(m, mx){
    var min = !!(m + 1) ? m : 0, max = !!(mx + 1) ? mx : 1000;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function _randomID(chars, length) {
    var len = length ? length : (typeof chars === 'number' ? chars : 8), id = "";
    while(len--) id += (length ? chars : 'acdefghijklmnopqrstuvwxyz1234567890')[_random(0, length ? chars.length : 35)];
    return id;
  }

  function _randomName() {
    var names = "John,Steven,Lisa,Anne,Joan,Steve,Gilbert,Ryan,Oscar,Leo".split(",");
    var surnames = "Smith,Johanson,Kidney,DiCaprio,Bloom,Mayer,Black,Hook,Doe".split(",");
    return names[_random(0, names.length)] + " " + surnames[_random(0, surnames.length)];
  }

  function _randomBoolean() {
    return ([true, false])[_random(0,2)];
  }

  function _randomCurrency(min, max) {
    return _random(min, max) + _random(0, 99) / 100;
  }

})(window, function(xhr) {
  ['get', 'post', 'ajax'].forEach(proxy);

  function proxy(method) {
    if (!xhr.hasOwnProperty(method)) return false;
    var _m = xhr[method];
    xhr[method] = function() { return intercept.apply(null, arguments) || _m.apply(null, arguments); };
  };

  function intercept() {
    var url = arguments[0].hasOwnProperty('url') ? arguments[0].url : arguments[0];
    var chunks = url.match(/^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/i);
    if (!chunks || chunks.length < 9) return false;
    var ep = chunks[8];

    if(!MockMe._interceptors[ep]) return false;

    if (arguments[0].hasOwnProperty('success')) {
      arguments[0].success(MockMe._interceptors[ep]);
      return true;
    } else if (arguments.length > 1 && typeof arguments[1] === 'function') {
      arguments[1](MockMe._interceptors[ep]);
      return true;
    } else {
      return new Promise(function (resolve, reject) { resolve(MockMe._interceptors[ep]) });
    }
  }

});
