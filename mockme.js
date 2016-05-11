var MockMe = new function(){
    var tem = $.ajax;
    $.ajax = interfere;

    var _endPoints = {};

    var addEndPoints = function(ep) {
      for (var p in ep) {
        _endPoints[p] = ep[p];
      }
    }

    function interfere(args){
      var chunks = args.url.match(/^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/i);
      var ep = chunks[8];
      console.log("trying to intercepted", ep);

      if(!_endPoints[ep]){
        console.log("not intercepted");
        tem(args);
        return false;
      }else{
        console.log("intercepted with mock:", _endPoints[ep]);
        args.success(_endPoints[ep]);
      }
    }
    
    function random(min, max){
        return Math.floor(Math.random()*(max-min)) + min;
    }
    
    function randomID(chars, len) {
        if(!len) var len = 8;
        var id = "";
        while(len){
            id += chars[random(0,chars.length)];
            len--;
        }
        return id;
    }
    
    function randomName() {
        var names = "John,Steven,Lisa,Anne,Joan,Steve,Gilbert,Ryan,Oscar,Leo".split(",");
        var surnames = "Smith,Johanson,Kidney,DiCaprio,Bloom,Mayer,Black,Hook,Doe".split(",");
        return names[random(0,names.length)] + " " + surnames[random(0,surnames.length)];
    }
    
    function randomInteger(min, max) {
        return random(min, max);
    }
    
    function randomBoolean() {
        return ([true, false])[random(0,2)];
    }

    function randomCurrency(min, max) {
        return random(min, max) + random(0,99)/100;
    }

    this.endPoints = addEndPoints;
    this.randomID = randomID;
    this.randomName = randomName;
    this.randomInteger = randomInteger;
    this.randomBoolean = randomBoolean;
    this.randomCurrency = randomCurrency;
}
