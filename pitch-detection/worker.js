'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wasm;
var cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

var cachegetFloat32Memory0 = null;

function getFloat32Memory0() {
  if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
    cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
  }

  return cachegetFloat32Memory0;
}

var WASM_VECTOR_LEN = 0;

function passArrayF32ToWasm0(arg, malloc) {
  var ptr = malloc(arg.length * 4);
  getFloat32Memory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
/**
*/


var AutocorrelationDetector = /*#__PURE__*/function () {
  function AutocorrelationDetector() {
    _classCallCheck(this, AutocorrelationDetector);
  }

  _createClass(AutocorrelationDetector, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_autocorrelationdetector_free(ptr);
    }
    /**
    * @param {number} size
    * @param {number} padding
    * @returns {AutocorrelationDetector}
    */

  }, {
    key: "get_pitch",

    /**
    * @param {Float32Array} signal
    * @param {number} sample_rate
    * @param {number} power_threshold
    * @param {number} clarity_threshold
    * @param {Float32Array} pitch
    */
    value: function get_pitch(signal, sample_rate, power_threshold, clarity_threshold, pitch) {
      try {
        var ptr0 = passArrayF32ToWasm0(signal, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF32ToWasm0(pitch, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.autocorrelationdetector_get_pitch(this.ptr, ptr0, len0, sample_rate, power_threshold, clarity_threshold, ptr1, len1);
      } finally {
        pitch.set(getFloat32Memory0().subarray(ptr1 / 4, ptr1 / 4 + len1));

        wasm.__wbindgen_free(ptr1, len1 * 4);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(AutocorrelationDetector.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new(size, padding) {
      var ret = wasm.autocorrelationdetector_new(size, padding);
      return AutocorrelationDetector.__wrap(ret);
    }
  }]);

  return AutocorrelationDetector;
}();
/**
*/


var McLeodDetector = /*#__PURE__*/function () {
  function McLeodDetector() {
    _classCallCheck(this, McLeodDetector);
  }

  _createClass(McLeodDetector, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_mcleoddetector_free(ptr);
    }
    /**
    * @param {number} size
    * @param {number} padding
    * @returns {McLeodDetector}
    */

  }, {
    key: "get_pitch",

    /**
    * @param {Float32Array} signal
    * @param {number} sample_rate
    * @param {number} power_threshold
    * @param {number} clarity_threshold
    * @param {Float32Array} pitch
    */
    value: function get_pitch(signal, sample_rate, power_threshold, clarity_threshold, pitch) {
      try {
        var ptr0 = passArrayF32ToWasm0(signal, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArrayF32ToWasm0(pitch, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.mcleoddetector_get_pitch(this.ptr, ptr0, len0, sample_rate, power_threshold, clarity_threshold, ptr1, len1);
      } finally {
        pitch.set(getFloat32Memory0().subarray(ptr1 / 4, ptr1 / 4 + len1));

        wasm.__wbindgen_free(ptr1, len1 * 4);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(McLeodDetector.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new(size, padding) {
      var ret = wasm.mcleoddetector_new(size, padding);
      return McLeodDetector.__wrap(ret);
    }
  }]);

  return McLeodDetector;
}();

function load(_x, _x2) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(module, imports) {
    var bytes, instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof Response === 'function' && module instanceof Response)) {
              _context.next = 23;
              break;
            }

            if (!(typeof WebAssembly.instantiateStreaming === 'function')) {
              _context.next = 15;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return WebAssembly.instantiateStreaming(module, imports);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            if (!(module.headers.get('Content-Type') != 'application/wasm')) {
              _context.next = 14;
              break;
            }

            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", _context.t0);
            _context.next = 15;
            break;

          case 14:
            throw _context.t0;

          case 15:
            _context.next = 17;
            return module.arrayBuffer();

          case 17:
            bytes = _context.sent;
            _context.next = 20;
            return WebAssembly.instantiate(bytes, imports);

          case 20:
            return _context.abrupt("return", _context.sent);

          case 23:
            _context.next = 25;
            return WebAssembly.instantiate(module, imports);

          case 25:
            instance = _context.sent;

            if (!(instance instanceof WebAssembly.Instance)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", {
              instance: instance,
              module: module
            });

          case 30:
            return _context.abrupt("return", instance);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _load.apply(this, arguments);
}

function init(_x3) {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input) {
    var imports, _yield$load, instance, module;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (typeof input === 'undefined') {
              input = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : document.currentScript && document.currentScript.src || new URL('worker.js', document.baseURI).href).replace(/\.js$/, '_bg.wasm');
            }

            imports = {};
            imports.wbg = {};

            imports.wbg.__wbindgen_throw = function (arg0, arg1) {
              throw new Error(getStringFromWasm0(arg0, arg1));
            };

            if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
              input = fetch(input);
            }

            _context2.t0 = load;
            _context2.next = 8;
            return input;

          case 8:
            _context2.t1 = _context2.sent;
            _context2.t2 = imports;
            _context2.next = 12;
            return (0, _context2.t0)(_context2.t1, _context2.t2);

          case 12:
            _yield$load = _context2.sent;
            instance = _yield$load.instance;
            module = _yield$load.module;
            wasm = instance.exports;
            init.__wbindgen_wasm_module = module;
            return _context2.abrupt("return", wasm);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

function createUniqueIdFn() {
  var __id = 0;
  return function () {
    var id = __id;
    __id += 1;
    return id;
  };
}

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.listeners = {};
  }

  _createClass(Emitter, [{
    key: "addEventListener",
    value: function addEventListener(eventName, listener) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        listeners = new Set();
        this.listeners[eventName] = listeners;
      }

      listeners.add(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(eventName, listener) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        return;
      }

      listeners.delete(listener);
    }
  }, {
    key: "once",
    value: function once(eventName) {
      var _this = this;

      return new Promise(function (resolve) {
        var listener = function listener(data) {
          _this.removeEventListener(eventName, listener);

          resolve(data);
        };

        _this.addEventListener(eventName, listener);
      });
    }
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        return;
      }

      listeners.forEach(function (listener) {
        listener(data);
      });
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      Object.values(this.listeners).forEach(function (listeners) {
        if (listeners) {
          listeners.clear();
        }
      });
    }
  }]);

  return Emitter;
}();

var MARKER = '@post-me';
var MessageType;

(function (MessageType) {
  MessageType["HandshakeRequest"] = "handshake-request";
  MessageType["HandshakeResponse"] = "handshake-response";
  MessageType["Call"] = "call";
  MessageType["Response"] = "response";
  MessageType["Error"] = "error";
  MessageType["Event"] = "event";
})(MessageType || (MessageType = {}));

function createHandshakeResponseMessage(sessionId) {
  return {
    type: MARKER,
    action: MessageType.HandshakeResponse,
    sessionId: sessionId
  };
}

function createCallMessage(sessionId, requestId, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  return {
    type: MARKER,
    action: MessageType.Call,
    sessionId: sessionId,
    requestId: requestId,
    methodName: methodName,
    args: args
  };
}

function createResponsMessage(sessionId, requestId, result, error) {
  var message = {
    type: MARKER,
    action: MessageType.Response,
    sessionId: sessionId,
    requestId: requestId
  };

  if (result !== undefined) {
    message.result = result;
  }

  if (error !== undefined) {
    message.error = error;
  }

  return message;
}

function createEventMessage(sessionId, eventName, payload) {
  return {
    type: MARKER,
    action: MessageType.Event,
    sessionId: sessionId,
    eventName: eventName,
    payload: payload
  };
} // Type Guards


function isMessage(m) {
  return m.type === MARKER;
}

function isHandshakeRequestMessage(m) {
  return isMessage(m) && m.action === MessageType.HandshakeRequest;
}

function isCallMessage(m) {
  return isMessage(m) && m.action === MessageType.Call;
}

function isResponseMessage(m) {
  return isMessage(m) && m.action === MessageType.Response;
}

function isEventMessage(m) {
  return isMessage(m) && m.action === MessageType.Event;
}

var Dispatcher = /*#__PURE__*/function (_Emitter) {
  _inherits(Dispatcher, _Emitter);

  var _super = _createSuper(Dispatcher);

  function Dispatcher(messenger, sessionId) {
    var _this2;

    _classCallCheck(this, Dispatcher);

    _this2 = _super.call(this);
    _this2.uniqueId = createUniqueIdFn();
    _this2.messenger = messenger;
    _this2.sessionId = sessionId;
    _this2.removeMessengerListener = _this2.messenger.addMessageListener(_this2.messengerListener.bind(_assertThisInitialized(_this2)));
    return _this2;
  }

  _createClass(Dispatcher, [{
    key: "messengerListener",
    value: function messengerListener(event) {
      var data = event.data;

      if (!isMessage(data)) {
        return;
      }

      if (this.sessionId !== data.sessionId) {
        return;
      }

      if (isCallMessage(data)) {
        this.emit(MessageType.Call, data);
      } else if (isResponseMessage(data)) {
        this.emit(data.requestId, data);
      } else if (isEventMessage(data)) {
        this.emit(MessageType.Event, data);
      }
    }
  }, {
    key: "callOnRemote",
    value: function callOnRemote(methodName) {
      var requestId = this.uniqueId();

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var message = createCallMessage.apply(void 0, [this.sessionId, requestId, methodName].concat(args));
      this.messenger.postMessage(message);
      return requestId;
    }
  }, {
    key: "respondToRemote",
    value: function respondToRemote(requestId, value, error) {
      var message = createResponsMessage(this.sessionId, requestId, value, error);
      this.messenger.postMessage(message);
    }
  }, {
    key: "emitToRemote",
    value: function emitToRemote(eventName, payload) {
      var message = createEventMessage(this.sessionId, eventName, payload);
      this.messenger.postMessage(message);
    }
  }, {
    key: "close",
    value: function close() {
      this.removeMessengerListener();
      this.removeAllListeners();
    }
  }]);

  return Dispatcher;
}(Emitter);

var ChildHandshakeDispatcher = /*#__PURE__*/function (_Emitter2) {
  _inherits(ChildHandshakeDispatcher, _Emitter2);

  var _super2 = _createSuper(ChildHandshakeDispatcher);

  function ChildHandshakeDispatcher(messenger) {
    var _this3;

    _classCallCheck(this, ChildHandshakeDispatcher);

    _this3 = _super2.call(this);
    _this3.messenger = messenger;
    _this3.removeMessengerListener = _this3.messenger.addMessageListener(_this3.messengerListener.bind(_assertThisInitialized(_this3)));
    return _this3;
  }

  _createClass(ChildHandshakeDispatcher, [{
    key: "messengerListener",
    value: function messengerListener(event) {
      var data = event.data;

      if (isHandshakeRequestMessage(data)) {
        this.emit(MessageType.HandshakeRequest, data);
      }
    }
  }, {
    key: "acceptHandshake",
    value: function acceptHandshake(sessionId) {
      var message = createHandshakeResponseMessage(sessionId);
      this.messenger.postMessage(message);
    }
  }, {
    key: "close",
    value: function close() {
      this.removeMessengerListener();
      this.removeAllListeners();
    }
  }]);

  return ChildHandshakeDispatcher;
}(Emitter);

var ConcreteRemoteHandle = /*#__PURE__*/function (_Emitter3) {
  _inherits(ConcreteRemoteHandle, _Emitter3);

  var _super3 = _createSuper(ConcreteRemoteHandle);

  function ConcreteRemoteHandle(callFn) {
    var _this4;

    _classCallCheck(this, ConcreteRemoteHandle);

    _this4 = _super3.call(this);
    _this4.call = callFn;
    return _this4;
  }

  return ConcreteRemoteHandle;
}(Emitter);

var ConcreteLocalHandle = function ConcreteLocalHandle(emitFn) {
  _classCallCheck(this, ConcreteLocalHandle);

  this.emit = emitFn;
};

var ConcreteConnection = /*#__PURE__*/function () {
  function ConcreteConnection(dispatcher, localMethods) {
    _classCallCheck(this, ConcreteConnection);

    this.dispatcher = dispatcher;
    this.methods = localMethods;
    this._remoteHandle = new ConcreteRemoteHandle(this.callRemoteMethod.bind(this));
    this._localHandle = new ConcreteLocalHandle(this.dispatcher.emitToRemote.bind(this.dispatcher));
    this.dispatcher.addEventListener(MessageType.Call, this.handleCall.bind(this));
    this.dispatcher.addEventListener(MessageType.Event, this.handleEvent.bind(this));
  }

  _createClass(ConcreteConnection, [{
    key: "close",
    value: function close() {
      this.dispatcher.close();

      this._remoteHandle['removeAllListeners']();
    }
  }, {
    key: "localHandle",
    value: function localHandle() {
      return this._localHandle;
    }
  }, {
    key: "remoteHandle",
    value: function remoteHandle() {
      return this._remoteHandle;
    }
  }, {
    key: "handleCall",
    value: function handleCall(data) {
      var _this5 = this;

      var requestId = data.requestId,
          methodName = data.methodName,
          args = data.args;
      var callMethod = new Promise(function (resolve, reject) {
        var method = _this5.methods[methodName];

        if (typeof method !== 'function') {
          reject(new Error("The method \"".concat(methodName, "\" has not been implemented.")));
          return;
        }

        Promise.resolve(method.apply(void 0, _toConsumableArray(args))).then(resolve).catch(reject);
      });
      callMethod.then(function (value) {
        _this5.dispatcher.respondToRemote(requestId, value);
      }).catch(function (error) {
        _this5.dispatcher.respondToRemote(requestId, undefined, error);
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(data) {
      var eventName = data.eventName,
          payload = data.payload;

      this._remoteHandle['emit'](eventName, payload);
    }
  }, {
    key: "callRemoteMethod",
    value: function callRemoteMethod(methodName) {
      var _this6 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return new Promise(function (resolve, reject) {
        var _this6$dispatcher;

        var responseEvent = (_this6$dispatcher = _this6.dispatcher).callOnRemote.apply(_this6$dispatcher, [methodName].concat(args));

        _this6.dispatcher.once(responseEvent).then(function (response) {
          var result = response.result,
              error = response.error;

          if (error !== undefined) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }]);

  return ConcreteConnection;
}();

function ChildHandshake(messenger) {
  var localMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    var handshakeDispatcher = new ChildHandshakeDispatcher(messenger);
    handshakeDispatcher.once(MessageType.HandshakeRequest).then(function (response) {
      var sessionId = response.sessionId;
      handshakeDispatcher.acceptHandshake(sessionId);
      handshakeDispatcher.close();
      var dispatcher = new Dispatcher(messenger, sessionId);
      var connection = new ConcreteConnection(dispatcher, localMethods);
      resolve(connection);
    });
  });
}

var WorkerMessenger = function WorkerMessenger(_ref) {
  var worker = _ref.worker;

  _classCallCheck(this, WorkerMessenger);

  this.postMessage = function (message) {
    worker.postMessage(message);
  };

  this.addMessageListener = function (listener) {
    var outerListener = function outerListener(event) {
      listener(event);
    };

    worker.addEventListener('message', outerListener);

    var removeListener = function removeListener() {
      worker.removeEventListener('message', outerListener);
    };

    return removeListener;
  };
};
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var runtime = function (exports) {
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined$1,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined$1;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

init('./pitch_detection_wasm_bg.wasm').then(function () {
  var messenger = new WorkerMessenger({
    worker: self
  });
  var detector = undefined;
  var methods = {
    createDetector: function createDetector(name, size, padding) {
      if (detector) {
        detector.free();
        detector = undefined;
      }

      switch (name) {
        case 'autocorrelation':
          {
            detector = AutocorrelationDetector.new(size, padding);
            break;
          }

        case 'mcleod':
          {
            detector = McLeodDetector.new(size, padding);
            break;
          }

        default:
          {
            throw new Error("Detector type not recognized: " + name);
          }
      }
    },
    getPitch: function getPitch(signal, sampleRate, powerThreshold, clarityThreshold) {
      if (!detector) {
        throw new Error("Detector not initialized");
      }

      var result = new Float32Array(2);
      detector.get_pitch(signal, sampleRate, powerThreshold, clarityThreshold, result);
      return result;
    }
  };
  ChildHandshake(messenger, methods);
});
