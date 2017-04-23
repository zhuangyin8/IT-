self.document = self; self.window = self; (function() {var ouid = 'u68a72c9eb812912e'; var prefix = ')]}\x27\n'; var flagsPrefix = ''; var loadTaskJs = function() {importScripts('\/static\/doclist\/client\/js\/464208091-offline_tasks_worker_bin.js');};
  var flagsUrl = flagsPrefix + '/offline/flags?ouid=' + ouid;
  self.fetch(flagsUrl, ({credentials: 'include'})).then(function(response) {
    return response.text();
  }).then(function(text) {
    if (text.indexOf(prefix, 0) != 0) {
      throw Error('Invalid response prefix');
    }
    self['_docs_flag_initialData'] = JSON.parse(text.substr(prefix.length));
    loadTaskJs();
  });
  var handlerPromise = new Promise(function (resolve, reject) {
    self['_docs_worker_handler_resolve'] = resolve;
  });
  self.onmessage = function(event) {
    handlerPromise.then(function(handler) {
      handler(event);
    });
  };
  })();