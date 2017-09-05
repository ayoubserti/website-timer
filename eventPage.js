 _getHostName=function(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 &&
        typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
};

var LocalStorage = (function(){
  var _storage ={};
  var _timeTrack =0;
  var _add = function(keyvalue){
    var __d = _getHostName(keyvalue.url);
    var __v =  _storage[__d];
    if(typeof __v === "undefined") _storage[__d] = 0;
    _storage[__d]+=3;
  };
  var _getInternal = function(){return _storage;};

  return {add:_add,
          getInternal: _getInternal};
})();

setInterval(function(){
      var queryInfo = {
            active: true,
            currentWindow: true
      };  
      
      chrome.tabs.query(queryInfo, function(tabs) {

       var tabObj = tabs[0];

        if(tabObj && tabObj.url)
        {
           
           var tmpObj = {'url': tabObj.url
                   };
            LocalStorage.add(tmpObj);
            console.log(tmpObj);
        }
        
      });
       
  }, 3000);

chrome.runtime.onMessage.addListener(function(msg,sender,sendResponse){
  if(msg == "arakolchi")
  {
    sendResponse(LocalStorage.getInternal());  
  }
  
});
