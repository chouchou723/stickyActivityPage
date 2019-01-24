<template>
    <div class="productShare">
        <!-- <div class="header">
                    <div class="authorLeft">
                        <img src="../assets/logo.png" alt="" class="headerImg">
                        <div class="authorTitle">
                            <div class="headername">下载艺下APP</div>
                            <div class="headernameT">发现身边的艺术玩伴</div>
                        </div>
                    </div>
                    <div>
                        <div class="headerDown" @click="clickDownload">
                            点击下载
                        </div>
                    </div>
                </div> -->
        <!-- <headerS></headerS> -->
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <swiper :options="swiperOption" class="swiperOption">
            <swiper-slide class="slide-1" v-for="(item,index) in pics" :key="index">
                <img :src="item.src" alt="" class="slideImg">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="productTitle">
            <div class="articleTitle"><span class="moneyicon">¥</span><span class="moneyprice">{{price}}</span></div>
            <div class="productName">{{title}}</div>
            <div class="freede">快递:&nbsp;&nbsp;{{deliver}}</div>
        </div>
        <div class="author">
            <!-- <div class="productI">
                        <div class="authorLeft">
                            <div class="mr2">优惠</div>
                            <div v-for="(item,index) in promotions" :key="'p'+index" class="promotionList">{{item}}</div>
                        </div>
                        <div class="authorRight" @click="clickDownload">
                            <div class="focus" >
                                领券
                            </div>
                            <i class="right-arrow"></i>
                        </div>
                    </div> -->
            <div class="productI productT" @click="clickDownload">
                <div class="authorLeft">
                    <div class="mr2">服务</div>
                    <div class="colorg">{{service}}</div>
                </div>
                <div class="authorRight">
                    <i class="right-arrow"></i>
                </div>
            </div>
        </div>
        <div class="author">
            <div class="productI productT" @click="clickDownload">
                <div class="authorLeft">
                    <div class="mr2">选择</div>
                    <div class="colorg">尺寸&nbsp;&nbsp;外框类型&nbsp;&nbsp;颜色分类</div>
                </div>
                <div class="authorRight">
                    <i class="right-arrow"></i>
                </div>
            </div>
        </div>
        <div class="author">
            <div class="productI productT">
                <div class="authorLeft">
                    <div class="commentT">评价 </div>
                    <div class="commentN">({{commentNumber}})</div>
                </div>
                <div class="authorRight" @click="clickDownload">
                    <div class="allcomment">
                        查看全部
                    </div>
                    <i class="right-arrowR"></i>
                </div>
            </div>
            <div>
                <div class="authorLeft mt2" v-if="commentS">
                    <img :src="authorImg" alt="" class="authorImg">
                    <div class="authorTitle">
                        <div class="name">{{author}}</div>
                    </div>
                </div>
                <div class="commentContent" v-if="commentS">{{commentS}}
                </div>
                <div class="noComment" v-else>
                    暂无评价
                </div>
            </div>
        </div>
        <div class="author">
            <div class="productI productT">
                <div class="authorLeft">
                    <div class="commentT">详情 </div>
                </div>
            </div>
            <div class="content" v-html="content">
            </div>
        </div>
         <!-- <div class="lastSection"></div> -->
        <!-- <div class="footer">
            <div class="footerLeft">
                <div class="footerOne" @click="clickDownload">
                    <img src="../assets/customer.png" alt="">
                    <div>客服</div>
                </div>
                <div class="footerTwo" @click="clickDownload">
                    <img src="../assets/favi.png" alt="">
                    <div>收藏</div>
                </div>
            </div>
            <div class="footerRight">
                <div class="footerLike" @click="clickDownload">
                    加入购物车
                </div>
                <div class="footerBuy" @click="clickDownload">
                    立即购买
                </div>
            </div>
        </div> -->
        <!-- <img src="../assets/cc.jpg" alt=""> -->
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import 'swiper/dist/css/swiper.css'
    // import headerS from './header'
    import {
        getProduct,
        getWx
    } from '../api/api'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        components: {
            swiper,
            swiperSlide,
            // headerS
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction'
                    }
                },
                deliver: '',
                price: '',
                title: '',
                // content: 'Welcome to Your Vue.js App',
                content: '',
                pics: [],
                promotions: ['满99减15', '满199减35'],
                commentNumber: 0,
                author: '',
                authorImg: '',
                service: '',
                // commentS:'',
                commentS: ''
            }
        },
        created() {
            // document.title = this.title
            // console.log(wx)
            // let id = this.getParameter('id')
            // console.log(id)
            this.fetchData()
            this.wechatConfig()
            //调接口获取数据this.this.fetchData()
        },
        methods: {
            fetchData() {
                let dl = document.location.href.split('/')
                let id = dl[dl.length - 1];
                getProduct(id).then(res => {
                    // console.log(res)
                    let data = res.data;
                    this.pics = data.topPics.map(item => {
                        return {
                            src: `${this.apiUrl}/attach/img/${item.id}`
                        }
                    })
                    document.title = data.name
                    this.title = data.name;
                    this.price = data.minPrice + '-' + data.maxPrice;
                    this.service = data.supportsName;
                    this.deliver = data.deliveryFee;
                    this.commentNumber = data.evaCount;
                    this.content = data.description;
                    let com = data.evaluation
                    if (com) {
                        this.author = com.user.nickname
                        this.authorImg = `${this.apiUrl}/attach/img/${com.user.avatarId}/square`;
                        this.commentS = com.content;
                    }
                })
            },
            // getParameter(sProp) {
            //     var re = new RegExp(sProp + "=([^\&]*)", "i");
            //     var a = re.exec(document.location.search);
            //     if (a == null)
            //         return null;
            //     return a[1];
            // },
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
                getWx({ //接口
                    url: url
                }).then((response) => {
                    // this.$wechat.config(JSON.parse(response.data.data))
                    //api调接口之后配置
                    let data = response;
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
                            imgUrl: _this.pics[0].src, // 分享图标
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
                            imgUrl: _this.pics[0].src, // 分享图标
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
    .productShare {
        background: #F2F2F2;
        height: inherit;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .articleTitle {
        font-size: 24px;
        color: #212121;
        padding: .4rem 0 0.2rem 0;
    }
    .swiperOption {
        width: 10rem;
        height: 10rem;
        /* margin-top: 1.6rem; */
    }
    .slide-1 {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .slideImg {
        width: 10rem;
        height: 10rem;
    }
    .swiper-pagination .swiper-pagination-bullet-active {
        background: #04BE02;
        width: .4rem;
        border-radius: .3rem;
    }
    .swiper-pagination-fraction {
        text-align: center;
        color: white;
        padding: .1rem;
        background: rgba(54, 54, 54, 0.50);
        left: 87%;
        width: 1.2rem;
        border-radius: 11px;
        font-size: 10px;
    }
    .swiper-pagination-fraction span {
        font-size: 10px;
    }
    .promotionList {
        width: 2.08rem;
        height: .453333rem;
        background: url('../assets/prom.png') center/100%;
        text-align: center;
        color: white;
    }
    .mr2 {
        margin-right: .2rem
    }
    .productTitle {
        padding: 0 .4rem .25rem;
        background: white;
    }
    .moneyicon {
        font-size: 18px;
        color: #FF5050;
    }
    .moneyprice {
        font-size: 24px;
        color: #FF5050;
        margin-left: .1rem
    }
    .productName {
        font-size: 16px;
        color: #212121;
        font-weight: bold;
        line-height: 22px;
        margin-bottom: .15rem
    }
    .freede {
        font-size: 12px;
        color: #757575;
    }
    .colorg {
        color: #212121;
    }
    .commentT {
        margin-right: .2rem;
        font-size: 14px;
        color: #212121;
        font-weight: bold
    }
    .commentN {
        color: #212121;
        font-size: 14px;
        font-weight: bold
    }
    .author {
        box-sizing: border-box;
        margin: .4rem 0;
        padding: 0.1rem .4rem;
        background: white;
    }
    .productI {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.2rem 0 .1rem;
    }
    .productT {
        padding: .2rem 0;
    }
    .authorImg {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        margin-right: .266667rem;
    }
    .mt2 {
        margin-top: .2rem;
    }
    .commentContent {
        font-size: 14px;
        color: #363636;
        line-height: 26px;
        margin: .3rem 0 .2rem;
    }
    .noComment {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #363636;
    }
    .authorLeft {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #757575;
    }
    .authorRight {
        display: flex;
        align-items: center;
    }
    .authorTitle {
        display: flex;
        flex-direction: column;
    }
    .authorTitle .name {
        font-size: 14px;
        color: #757575;
    }
    .authorTitle .time {
        color: #BDBDBD;
    }
    .focus {
        font-size: 12px;
        color: #757575;
        margin-right: .25rem;
    }
    .allcomment {
        font-size: 14px;
        color: #FF5050;
        margin-right: .2rem;
    }
    .right-arrowR {
        width: 8px;
        height: 8px;
        border-top: 1px solid #FF5050;
        border-right: 1px solid #FF5050;
        transform: rotate(45deg);
    }
    .right-arrow {
        width: 8px;
        height: 8px;
        border-top: 1px solid #757575;
        border-right: 1px solid #757575;
        transform: rotate(45deg);
    }
    /* .footer {
        width: 100%;
        height: 1.306667rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        display: flex;
        background: white;
    }
    .footerLeft {
        flex: 0 0 35%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 .3rem;
    }
    .footerRight {
        flex: 0 0 65%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerOne,
    .footerTwo {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .footerOne img {
        width: .56rem;
        height: .56rem;
        margin-bottom: .05rem;
    }
    .footerTwo img {
        width: .56rem;
        height: .56rem;
        margin-bottom: .05rem;
    }
    .footerOne div,
    .footerTwo div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike {
        font-size: 14px;
        color: #573426;
        width: 100%;
        height: 100%;
        text-align: center;
        background: #FFCA18;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerBuy {
        font-size: 14px;
        color: #FFFFFF;
        width: 100%;
        height: 100%;
        background: #FF5050;
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    .content {
        font-size: 14px;
        margin-bottom: 1.6rem;
        margin-top: .1rem;
    }
    .content img, .content video {
        max-width: 100%;
    }
     /* .lastSection {
        width: 100%;
        height: 1.4rem;
        background: #F2F2F2
    } */
</style>
