/**
 * Created by Administrator on 2016/11/1.
 */
function refreshRem(){
    var docEl = window.document.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rootSize;
    if(width<2000){
        rootSize = width/75;
    }else{
        rootSize = width/204.8;
    }
    console.log("html font-size:"+rootSize+"px");
    docEl.style.fontSize = rootSize + 'px';
    alert(width);
}
refreshRem();
window.onresize  = function(){
    refreshRem();
};

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
//是否微信中打开
function isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
}
//是否QQ空间中打开
function isQQ() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/QQ/i) == "qq";
}
//是否新浪微博客户端中打开
function isWeiBo() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/WeiBo/i) == "weibo";
}
//获取url参数
function UrlSearch() {
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?");
    str = str.substr(num+1); //取得所有参数
    var arr=str.split("&"); //各个参数放到数组里
    for (var i=0; i<arr.length; i++) {
        num=arr[i].indexOf("=");
        if (num>0) {
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}

var _poster = document.getElementById("poster");
var _programName = document.getElementsByClassName("programName")[0];
var _episode = document.getElementsByClassName("episode")[0];
var _programDes = document.getElementsByClassName("programDes")[0];
var tipsWrapper = document.getElementById("tipsWrapper");
var hideTips = document.getElementById("hideTips");
var btn = document.getElementById("btn");
var parameters = new UrlSearch();
var scheme = parameters.scheme + "://" + "?";
console.log(scheme);
console.log(parameters);
//刷新页面内容
if(parameters.imageUrl){
    _poster.src = parameters.imageUrl;
    console.log("imageUrl: "+parameters.imageUrl);
}
if(parameters.programName){
    _programName.innerHTML = parameters.programName;
}
if(parameters.channelName){
    _programName.innerHTML = parameters.channelName;
}
if(parameters.episodeID){
    _episode.innerHTML = parameters.episodeID;
}/*else{
    _episode.innerHTML = "";
}*/
if(parameters.epgName){
    _episode.innerHTML = parameters.epgName;
}/*else{
    _episode.innerHTML = "";
}*/
if(parameters.programDes){
    _programDes.innerHTML = parameters.programDes;
}
if(parameters.epgDes){
    _programDes.innerHTML = parameters.epgDes;
}


//按钮点击事件
btn.onclick = function() {
    //判断是否移动端打开
    if (browser.versions.mobile) {
        if (isWeiXin() || isQQ() || isWeiBo()) {
            //若是在社交平台打开，显示提示图片
            tipsWrapper.style.display = "block";
            return null;
        } else {
            //若不是在社交平台打开
            switch(parameters.shareType) {
                case "10001":
                    scheme = scheme
                        + "programID=" + parameters.programID + "&"
                        + "episodeID=" + parameters.episodeID;
                    break;
                case "10002":
                    scheme = scheme
                        + "channelID=" + parameters.channelID + "&"
                        + "startTime=" + parameters.startTime + "&"
                        + "endTime=" + parameters.endTime;
                    break;
                case "10003":
                    scheme = scheme
                        + "channelID=" + parameters.channelID + "&"
                        + "startTime=" + parameters.startTime + "&"
                        + "endTime=" + parameters.endTime;
                    break;
                case "10004":
                    scheme = scheme
                        + "channelID=" + parameters.channelID + "&"
                        + "startTime=" + parameters.startTime + "&"
                        + "endTime=" + parameters.endTime;
                    break;
            }
            //window.location.href = scheme;
            //alert(scheme);
            var loadTime = Date.now();
            var body = document.getElementsByTagName('body');
            var ifr = document.createElement("iframe");
            body[0].appendChild(ifr);
            ifr.setAttribute('src', scheme);
            ifr.style.display = "none";

            window.setTimeout(function () {
                //跳转到下载链接
                if (!loadTime || Date.now()-loadTime < 600 ){
                    if (browser.versions.ios) {
                        window.location.href = "http://www.baidu.com";
                    } else if (browser.versions.iPad) {
                        window.location.href = "https://itunes.apple.com/us/app/ai-jia-dian-shi/id1042169020?mt=8";
                    } else if (browser.versions.android) {
                        window.location.href = "http://www.baidu.com";
                    } else {
                        window.location.href = "http://www.baidu.com";
                    }
                }

            }, 500);
        }
    } else {
        tipsWrapper.style.display = "block";
        return null;
    }
};
//关闭提示图片
hideTips.onclick = function() {
    tipsWrapper.style.display = "none";
}

