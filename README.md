# ZHTURN
WebRTC/TURN/STUN Server, H5 sample

如果已经部署信令服务器，可以使用如下用户名和密码访问 turn 服务器

urls:'turn:43.138.235.180:9002', // turn地址
username: 任意, // 用户名，随意，别超过120个字节
credential: 'mypwd' // 目前暂时就是 'mypwd'

如果没有部署信令服务器

在PC/移动端使用对应角色链接，可用于测试

pc端

offer https://www.zhaosonghan.com/h5/webrtc_pc.html?&name=123456&remote=abcdef&role=1

answer https://www.zhaosonghan.com/h5/webrtc_pc.html?&name=abcdef&role=2

移动端

offer https://www.zhaosonghan.com/h5/webrtc_mobile.html?&name=123456&remote=abcdef&role=1

answer https://www.zhaosonghan.com/h5/webrtc_mobile.html?&name=abcdef&role=2

使用方式

比如：offer 在手机端，answer 在pc端

在手机端打开 offer 对应地址

在pc端打开 answer 对应地址 （pc需要一个摄像头）

点击手机端的 start test 按钮，go！

参数说明

// name 	本地端 id，最大长度32个字节
// remote	远端 id，最大长度32个字节
// role		角色 1：offer 2: answer

// 注意
// name 和 remote 不要重复



