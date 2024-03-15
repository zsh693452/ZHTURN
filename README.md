# ZHTURN
WebRTC/TURN/STUN Server, H5 sample

The URL is working，try it!

welcome to my site : https://www.zhaosonghan.com

## If a signaling server has been deployed, you can use the following username and password to access the turn server

urls:'turn:43.138.235.180:9002'

username: namestring

credential: 'mypwd' 

## If no signaling server is deployed

Use the corresponding character link on PC/mobile terminal, which can be used for testing

### pc side

offer https://www.zhaosonghan.com/h5/webrtc_pc.html?&name=123456&remote=abcdef&role=1

answer https://www.zhaosonghan.com/h5/webrtc_pc.html?&name=abcdef&role=2

### mobile side

***you can scand QRCode!***

offer https://www.zhaosonghan.com/h5/webrtc_mobile.html?&name=123456&remote=abcdef&role=1

![image](https://github.com/zsh693452/ZHTURN/blob/main/image/offer.png) 

answer https://www.zhaosonghan.com/h5/webrtc_mobile.html?&name=abcdef&role=2

![image](https://github.com/zsh693452/ZHTURN/blob/main/image/answer.png)

## Usage

For example: offer is on the mobile phone, answer is on the PC

Open the offer corresponding address on the mobile phone

Open the answer corresponding address on the PC side (PC requires a camera)

Click the start test button on the mobile phone and go!

## Parameter Description

// name local id, maximum length 32 bytes

// remote remote id, maximum length 32 bytes

// role role 1: offer 2: answer

// Notice name and remote must be different



