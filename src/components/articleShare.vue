<template>
    <div class="articleShare">
        <!-- <headerS></headerS> -->
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="articleTitle">{{title}}</div>
        <div class="author">
            <div class="authorLeft">
                <img :src="authorImg" alt="" class="authorImg">
                <div class="authorTitle">
                    <div class="name">{{author}}</div>
                    <div class="time">{{time}}</div>
                </div>
            </div>
            <div class="authorRight" v-if="author">
                <div class="focus" @click="clickDownload">
                    关注
                </div>
            </div>
        </div>
        <div class="content" v-html="content">
        </div>
        <!-- <div class="lastSection"></div> -->
        <!-- <div class="footer">
            <div class="footerLeft">
                <div class="footerOne" @click="clickDownload">
                    <img src="../assets/good.png" alt="">
                    <div>点赞</div>
                </div>
                <div class="footerTwo" @click="clickDownload">
                    <img src="../assets/fav.png" alt="">
                    <div>收藏</div>
                </div>
                <div class="footerThree" @click="clickDownload">
                    <img src="../assets/comment.png" alt="">
                    <div>评论</div>
                </div>
            </div>
            <div class="footerRight">
                <div class="footerLike" @click="clickDownload">
                    我喜欢
                </div>
            </div>
        </div> -->
        <!-- <img src="../assets/cc.jpg" alt=""> -->
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    // import headerS from './header';
    import {
        getArticle,
        getWx
    } from '../api/api'
    export default {
        components: {
            // headerS
        },
        data() {
            return {
                authorImg: '',
                title: '',
                time: '',
                author: '',
                content: '',
                thu_image: '',
                shareDesc: ''
            }
        },
        created() {
            this.fetchData()
            this.wechatConfig()
        },
        methods: {
            fetchData() {
                let dl = document.location.href.split('/')
                let id = dl[dl.length - 1];
                getArticle(id).then(res => {
                    // console.log(res)
                    let data = res.data;
                    document.title = data.title
                    this.authorImg = `${this.apiUrl}/attach/img/${data.author.avatarId}/square`
                    this.title = data.title;
                    this.author = data.author.nickname;
                    this.content = data.content;
                    this.time = data.momentCreatedDate;
                    this.thu_image = `${this.apiUrl}/attach/img/${data.coverId}`
                    // this.shareDesc = data.shareDesc
                })
            },
            clickDownload() {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    var loadDateTime = new Date();
                    window.setTimeout(function() {
                        var timeOutDateTime = new Date();
                        if (timeOutDateTime - loadDateTime < 5000) {
                            window.location = "https://itunes.apple.com/cn/app/id1236615957?mt=8"; //ios下载地址  
                        } else {
                            window.close();
                        }
                    }, 25);
                    window.location = "wxb4cd88e06a542940://openwebview/?ret=0";
                } else if (navigator.userAgent.match(/android/i)) {
                    var state = null;
                    try {
                        window.location = 'arttreeyixiaapp://testpage';
                        setTimeout(function() {
                            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.dw.artree"; //android下载地址  
                        }, 500);
                    } catch (e) {}
                }
            },
            wechatConfig() { //create获取config
                let url = location.href.split('#')[0]
                getWx({
                    url: url
                }).then((response) => {
                    // this.$wechat.config(JSON.parse(response.data.data))
                    //api调接口之后配置
                    let data = response;
                    // console.log(data)
                    wx.config({
                        debug: false,
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，微信签名
                        jsApiList: [
                            'updateAppMessageShareData', 'updateTimelineShareData'
                        ] // 必填，需要使用的JS接口列表
                    });
                    let _this = this;
                     let loc =  window.location
                    let shareUrl = loc.origin+loc.pathname+loc.hash
                    wx.ready(function() {
                        //              alert(window.location.href.split('#')[0]);
                        //分享到朋友/qq
                        wx.updateAppMessageShareData({
                            title: _this.title, // 分享标题
                            desc: document.getElementsByClassName('content')[0].textContent || _this.title, // 分享描述
                            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.thu_image, // 分享图标
                            success: function(res) {
                                // 用户确认分享后执行的回调函数
                                // logUtil.printLog("分享到朋友圈成功返回的信息为:", res);
                                // _this.showMsg("分享成功!")
                            },
                            cancel: function(res) {
                                // 用户取消分享后执行的回调函数
                                // logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
                            }
                        });
                        //分享给朋友圈 空间
                        wx.updateTimelineShareData({
                            title: _this.title, // 分享标题
                            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.thu_image, // 分享图标
                            success: function(res) {
                                // 用户确认分享后执行的回调函数
                                // logUtil.printLog("分享给朋友成功返回的信息为:", res);
                            },
                            cancel: function(res) {
                                // 用户取消分享后执行的回调函数
                                // logUtil.printLog("取消分享给朋友返回的信息为:", res);
                            }
                        });
                    });
                }).catch(() => {
                    // this.$vux.loading.hide()
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .articleShare {
        height: inherit;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .articleTitle {
        font-size: 24px;
        color: #212121;
        margin: 0.2rem 0.4rem 0 .4rem;
    }
    .author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem
    }
    .authorImg {
        width: 1.013333rem;
        height: 1.013333rem;
        border-radius: 50%;
        margin-right: .266667rem;
    }
    .authorLeft {
        display: flex;
        align-items: center;
    }
    .authorTitle {
        display: flex;
        flex-direction: column;
    }
    .authorTitle .name {
        font-size: 14px;
        color: #363636;
    }
    .authorTitle .time {
        color: #BDBDBD;
    }
    .focus {
        width: 1.173333rem;
        height: .666667rem;
        background: #FFD95D;
        border-radius: .053333rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #573426;
        border-radius: 2px;
    }
    /* .footer {
        width: 100%;
        height: 1.6rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        padding: 0 .4rem;
        display: flex;
        background: white;
    }
    .footerLeft {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .3rem;
    }
    .footerRight {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerOne,
    .footerTwo,
    .footerThree {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 60%;
    }
    .footerOne img {
        height: .44rem;
    }
    .footerTwo img {
        height: .48rem;
    }
    .footerThree img {
        height: .48rem;
    }
    .footerOne div,
    .footerTwo div,
    .footerThree div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike {
        font-size: 14px;
        color: #573426;
        width: 100%;
        text-align: center;
        padding: 0.25rem 0;
        background: #FFCA18;
        border-radius: 3px;
    } */
    .content {
        padding: 0 .4rem;
        font-size: 14px;
        margin-bottom: 1.8rem;
        line-height: 20px;
    }
    .content img , .content video{
        max-width: 100%;
    }
     .lastSection {
        width: 100%;
        height: 1.4rem;
        background: white;
    }
</style>
