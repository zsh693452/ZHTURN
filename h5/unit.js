
function isMobile() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}

function log(text, mobileOutput = false) {
    if (!isMobile())
        console.log(text);  
    else if (mobileOutput)
        alert(text);
}