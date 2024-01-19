const ROLE_OFFER = 1
const ROLE_ANSWER = 2
const CMD_REQ_LOGIN = 1
const CMD_RSP_LOGIN = 2
const CMD_REQ_SEND_PEER = 3
const CMD_RSP_SEND_PEER = 4
const ID_WEBRTC_DESC = 1
const ID_WEBRTC_CANDI = 2


class SignalingChannel {
    constructor (url, name, role, onmsg) {
        try {
            var me = this;
            this.name = name;
            this.role = role;
            this.msgHandler = onmsg;
            this.ws = new WebSocket(url);
            
            this.ws.onopen = function(evt) { 
                log("connectoin opened!"); 
                me.login(role, me.name);
            };
      
            this.ws.onmessage = function(evt) {
                me.msgHandler(evt.data);
            };
      
            this.ws.onclose = function(evt) {
                log("connection closed!");
            };    
        } catch (e) {
            log(e);
        }
	}

    login (role, name) {
        let json = {
            "head":{
                "cmd":CMD_REQ_LOGIN,
                "role":parseInt(role),
                "name":name,
                "remote":""
            }
        }

        let str = JSON.stringify(json);
        this.ws.send(str);
        log("login " + str);
    }

    sendToPeer(peer, data) {
        let json = {
            "head":{
                "cmd":CMD_REQ_SEND_PEER,
                "role":parseInt(this.role),
                "name":this.name,
                "remote":peer
          },

          "data": {
              "msg":data
          }
        };   
      
        let str = JSON.stringify(json);
        let strHead = JSON.stringify(json.head);
        this.ws.send(str);

        log("sendToPeer " + strHead);
    }
}
