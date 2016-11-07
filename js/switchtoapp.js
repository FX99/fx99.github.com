/**
 * Created by Administrator on 2016/11/1.
 */

var _poster = document.getElementById("poster");
var tipsWrapper = document.getElementById("tipsWrapper");
var hideTips = document.getElementById("hideTips");
var btn = document.getElementById("btn");
var parameters = new UrlSearch();
var scheme = parameters.scheme + "://" + "?";
var _url = "";
//下载链接
var _downloadUrl = parameters.downloadUrl;
console.log(scheme);
console.log(parameters);
/*
* 获取页面宽度，设定html字体大小
* 宽度1536px以下默认750px  10px
* 宽度1536px以上默认2048px  10px
* */
function refreshRem(){
    var docEl = window.document.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rootSize;
    if(width<1536){
        rootSize = width/75;
    }else{
        rootSize = width/204.8;
    }
    //console.log("html font-size:"+rootSize+"px");
    docEl.style.fontSize = rootSize + 'px';
}

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
function updateHtml(getData){
    //刷新页面内容
    var domEle = getData.data.programinfo;
    console.log(getData.data.programinfo);
    //海报
    for(i in domEle.imageUrl[0]){
        _poster.src = domEle.imageUrl[0][i];
    }
    //节目名称
    if(domEle.programName){
        $(".programName").html(domEle.programName);
    }else{
        $(".programName").html("未知");
    }
    //节目集数
    if(parameters.episodeID!=0){
        $(".episode").html("第"+parameters.episodeID+"集");
    }else{
        $(".episode").html("");
    }
    //导演
    if(domEle.director){
        $(".director span").html(domEle.director);
    }else{
        $(".director span").html("未知");
    }
    //主演
    if(domEle.actors){
        $(".mainPlay span").html(domEle.actors.replace(/\s/g, '').replace(/\//g, '，'));
    }else{
        $(".mainPlay span").html("未知");
    }
    //详情
    if(domEle.programDes){
        $(".programDes").html(domEle.programDes);
    }else{
        $(".programDes").html("未知");
    }
}
refreshRem();
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

function openApp(){
    //判断是否移动端打开
    if (browser.versions.mobile) {
        if (isWeiXin() || isQQ() || isWeiBo()) {
            //若是在社交平台打开，显示提示图片
            tipsWrapper.style.display = "block";
            return null;
        } else {
            //若不是在社交平台打开
            //window.location.href = scheme;
            //alert(scheme);
            var loadTime = Date.now();
            var body = document.getElementsByTagName('body');
            var ifr = document.createElement("iframe");
            body[0].appendChild(ifr);
            ifr.setAttribute('src', scheme);
            ifr.style.display = "none";

            window.setTimeout(function () {
                if(/%3A/.test(_downloadUrl)){
                    _downloadUrl = _downloadUrl.replace(/%3A/g,':').replace(/%2F/g,'/');
                }
                //跳转到下载链接
                if (!loadTime || Date.now() - loadTime < 600) {
                    if (browser.versions.ios) {
                        window.location.href = "https://itunes.apple.com/cn/app/shan-dong-you-xian/id1076136516?l=zh&ls=1&mt=8";
                    } else if (browser.versions.iPad) {
                        window.location.href = "https://itunes.apple.com/cn/app/shan-dong-you-xianhd/id1076083446?l=zh&ls=1&mt=8";
                    } else if (browser.versions.android) {
                        window.location.href = "http://portal.rifestone.com:9090/iVideo_phone_ShanDong_8446.apk";
                    } else {
                        window.location.href = "http://fir.im/aPadShandong";
                    }
                }

            }, 500);
        }
    } else {
        tipsWrapper.style.display = "block";
        return null;
    }
}
//按钮点击事件
    btn.onclick = openApp;
//关闭提示图片
    hideTips.onclick = function() {
        tipsWrapper.style.display = "none";
    };

window.onresize  = function(){
    refreshRem();
};

/*
 * shareType=00001：分享APP
 ......
 shareType=10001：分享点播
 shareType=10002：分享直播
 shareType=10003：分享时移
 shareType=10004：分享回看
 ......
 shareType=20001：分享业务
 * */
switch(parameters.shareType) {
    case "10001":
        //_url = "json/data.json";
        _url='http://portal.gd.sumaott.com:8080/PortalServer-App/new/ptl_ipvp_vod_vod013?'+
            'hmac=2f2253f288&nonce=1240044448&numberOfResults=12&plocation=001&pserialNumber=c615ac6662956b4274be223430b00029'+
            '&pserverAddress=portal.gd.sumaott.com&ptoken=c615ac6662956b4274be223430b00029&ptype=4&puser=freeuser&pversion=030101'+
            '&recommendTypeID=1&resolution=&start=0&timestamp=1478048946&type=0&programID='+parameters.programID;
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

//分享点播才跳转到海报
if(parameters.shareType=='10001'){
    $("#container").show();
    $.ajax({
        type:'post',
        url:_url,
        dataType:'json',
        async:true,
        success:function(data){
            console.log(data);
            updateHtml(data);
        },
        error:function(e) {
            console.log(e);
        }
    });
}else{
    openApp();
}


