// handles JSON.stringify/parse


const url = location.href;
let name = getParamFromUrl(url, "name");
let role = getParamFromUrl(url, "role");
let remote = getParamFromUrl(url, "remote"); // answer none remote
var localOpened = false;


const constraints = { audio: true, video: true };
const configuration = {
    iceServers: [{
        urls: 'turn:43.138.235.180:9002',
        username: name,
        credential: 'mypwd'
    }]
};

const signaling = new SignalingChannel("wss://www.zhaosonghan.com:9001", name, role, onmessage);
signaling.remote = remote;

const pc = new RTCPeerConnection(configuration);


pc.oniceconnectionstatechange = async (ev) => {
    log("oniceconnectionstatechange " + pc.iceConnectionState);

    // just only for display local camera
    if (ROLE_ANSWER == role && !localOpened) {
        localOpened = true;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        // now, trigger onnegotiationneeded / onicecandidate
        document.getElementById('local').srcObject = stream;
  }
}

pc.onicecandidateerror = (event) => {
    console.log("onicecandidateerror");
}

// Send any ice candidates to the other peer.
pc.onicecandidate = ({ candidate }) => {
    if (null == candidate)
      return;

    log("onicecandidate=" + JSON.stringify(candidate));
    signaling.sendToPeer(signaling.remote, { id: ID_WEBRTC_CANDI, candi: candidate });
}

// Let the "negotiationneeded" event trigger offer generation.
// offer trigger
pc.onnegotiationneeded = async () => {
    try {
        log("onnegotiationneeded");
        await pc.setLocalDescription(await pc.createOffer());

        // Send the offer to the other peer.
        signaling.sendToPeer(signaling.remote, { id: ID_WEBRTC_DESC, desc: pc.localDescription });
    } catch (err) {
        log(err);
    }
};

// Once remote track media arrives, show it in remote video element.
pc.ontrack = (event) => {
    // Don't set srcObject again if it is already set.
    let remoteView = document.getElementById('remote');
    if (remoteView.srcObject) return;
    remoteView.srcObject = event.streams[0];
};

// Call start() to initiate.
async function start() {
    try {
        // Get local stream, show it in 'local'
        const stream =
          await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        // now, trigger onnegotiationneeded / onicecandidate
        document.getElementById('local').srcObject = stream;

    } catch (err) {
        log("start error=" + err);
    }
}

function onmessage(data) {
    let jsonRoot = eval('(' + data + ')');
    let cmd = parseInt(jsonRoot.head.cmd);

    switch (cmd) {
        case CMD_REQ_SEND_PEER:
            handleCmdFromPeer(data);
            break;
        case CMD_RSP_SEND_PEER:
            handleSendPeerResp(data);
            break;
        case CMD_RSP_LOGIN:
            handleLogin(data);
            break;
        default:
            break;
    }
}

function handleLogin(data) {
    let jsonRoot = eval('(' + data + ')');
    log("login rst=" + jsonRoot.data.ret);
}

function handleSendPeerResp(data) {
    let jsonRoot = eval('(' + data + ')');
    log("handleSendPeerResp=" + jsonRoot.data.ret);
}

function handleCmdFromPeer(data) {
    let jsonRoot = eval('(' + data + ')');
    signaling.remote = jsonRoot.head.name;
    log("cmd from peer " + signaling.remote);

    let cmdid = parseInt(jsonRoot.data.msg.id);
    switch (cmdid) {
        case ID_WEBRTC_DESC:
            setRemoteDesc(jsonRoot.data.msg.desc);
            break;
        case ID_WEBRTC_CANDI:
            setCandidate(jsonRoot.data.msg.candi);
            break;
        default:
            break;
    }
}

async function setCandidate(candi) {
    log("setCandidate " + JSON.stringify(candi));
    await pc.addIceCandidate(candi);
}

async function setRemoteDesc(json) {
    if ('offer' == json.type) {
        await pc.setRemoteDescription(json);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        await pc.setLocalDescription(await pc.createAnswer());
        log("offer setremotedesc local desc=" + pc.localDescription);

      signaling.sendToPeer(signaling.remote, { id: ID_WEBRTC_DESC, desc: pc.localDescription });
    } else if ('answer' == json.type) {
        await pc.setRemoteDescription(json);
        log("answer setremotedesc local desc=" + pc.localDescription);
    } else {
        log('Unsupported SDP type.');
    }
}


function getParamFromUrl(url, param) {
    let vars = url.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (param == pair[0])
            return pair[1];
    }
    return "";
}
