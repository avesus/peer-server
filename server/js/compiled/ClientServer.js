// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ClientServerDataChannel = (function(_super) {

    __extends(ClientServerDataChannel, _super);

    function ClientServerDataChannel() {
      this.onFileReceived = __bind(this.onFileReceived, this);

      this.onFileSent = __bind(this.onFileSent, this);

      this.onFileProgress = __bind(this.onFileProgress, this);

      this.onOpen = __bind(this.onOpen, this);

      this.onMessage = __bind(this.onMessage, this);

      this.openSignalingChannel = __bind(this.openSignalingChannel, this);

      this.initDataChannel = __bind(this.initDataChannel, this);

      this.handleSetID = __bind(this.handleSetID, this);
      this.dataChannel = new DataChannel();
      this.socket = io.connect(document.location.origin);
      this.socket.on("setID", this.handleSetID);
    }

    ClientServerDataChannel.prototype.handleSetID = function(id) {
      this.id = id;
      console.log(id);
      this.initDataChannel();
      return this.dataChannel.open(this.id);
    };

    ClientServerDataChannel.prototype.initDataChannel = function() {
      this.dataChannel.direction = "one-to-many";
      this.dataChannel.openSignalingChannel = this.openSignalingChannel;
      this.dataChannel.onmessage = this.onMessage;
      this.dataChannel.onopen = this.onOpen;
      this.dataChannel.onFileProgress = this.onFileProgress;
      this.dataChannel.onFileSent = this.onFileSent;
      return this.dataChannel.onFileReceived = this.onFileReceived;
    };

    ClientServerDataChannel.prototype.openSignalingChannel = function(config) {
      var channel, channelSocket, sender;
      channel = config.channel || this.dataChannel.channel;
      sender = this.id;
      io.connect(document.location.origin).emit("newDataChannel", {
        channel: channel,
        sender: sender
      });
      channelSocket = io.connect(document.location.origin + "/" + channel);
      channelSocket.on("connect", function() {
        if (config.callback) {
          return config.callback(channelSocket);
        }
      });
      channelSocket.send = function(message) {
        console.log("send", {
          sender: sender,
          data: message
        });
        return channelSocket.emit("message", {
          sender: sender,
          data: message
        });
      };
      return channelSocket.on("message", config.onmessage);
    };

    ClientServerDataChannel.prototype.onMessage = function(data) {
      return console.log(data);
    };

    ClientServerDataChannel.prototype.onOpen = function() {
      this.dataChannel.send("SERVER: " + this.id);
      return console.log("onopen");
    };

    ClientServerDataChannel.prototype.onFileProgress = function() {};

    ClientServerDataChannel.prototype.onFileSent = function() {};

    ClientServerDataChannel.prototype.onFileReceived = function() {};

    return ClientServerDataChannel;

  })(DataChannel);

}).call(this);
