<template>
    <div class="ticketShare" id="ticketShare" ref="groups" @scroll="handleScroll">
        <headerS></headerS>
        <!-- <div style="width:100%;height:.6rem;background:#F2F2F2"></div> -->
        <div class="ticketBG" :style='`background:url(${backgroundbg})  no-repeat top/cover`'>
            <div class="ticketContent">
                <img :src="backgroundbg" alt="" class="ticketImg">
                <div class="contentDiv">
                    <div class="contentTitle">{{ticketInfo.title}}</div>
                    <div>
                        <div class="contentDate">{{ticketInfo.date}}</div>
                        <div class="contentDate mt1">{{ticketInfo.time}}</div>
                    </div>
                    <div class="contentSale">
                        <div class="contentDate">已售{{ticketInfo.sale}}份</div>
                        <div class="contentPrice">{{ticketInfo.price}}</div>
                    </div>
                </div>
            </div>
            <div class="ticketAdd">
                <div>
                    <div class="addMain"><span>{{ticketInfo.gym}}</span><img src="../assets/greyT.png" alt="" class="greyT"></div>
                    <div class="addDetail">{{ticketInfo.add}}</div>
                </div>
                <div class="addIcon">
                    <img src="../assets/navi.png" alt="" class="navicon">
                </div>
            </div>
        </div>
        <!-- <div class="productTitle">
                                                                                            <div class="ticketI" @click="goto('#intro')"><span :class="isAct==='#intro'?'ticketAct':''">简介</span></div>
                                                                                            <div class="ticketI" @click="goto('#comment')"><span :class="isAct==='#comment'?'ticketAct':''">点评</span></div>
                                                                                            <div class="ticketI" @click="goto('#actvity')"><span :class="isAct==='#actvity'?'ticketAct':''">活动须知</span></div>
                                                                                        </div> -->
        <div v-sticky="{ zIndex: 100, stickyTop: stickyTop}" class="sss">
            <div class="productTitle">
                <div class="ticketI" @click="goto('intro')"><span :class="activeIndex === 0?'ticketAct':''">简介</span></div>
                <div class="ticketI" @click="goto('comment')"><span :class="activeIndex === 1?'ticketAct':''">点评</span></div>
                <div class="ticketI" @click="goto('actvity')"><span :class="activeIndex === 2?'ticketAct':''">活动须知</span></div>
            </div>
        </div>
        <div :class="['ticketIntro',isAll?'ticketAll':'ticketIntroMore']" ref="intro">
            <div class="allIntro" v-html="ticketIntroContent"></div>
            <div class="seeMore" @click='seeMoreC' v-if="!isAll">查看全部简介 <img src="../assets/seemore.png" alt="" class="seeIcon"></div>
        </div>
        <div class="author" ref="comment">
            <div class="productI">
                <div class="authorLeft">
                    <div class="commentT">点评</div>
                    <div class="commentN">({{commentNumber}}条)</div>
                </div>
                <div class="authorRight" @click="clickDownload">
                    <div class="allcomment">
                        去点评<img src="../assets/add.png" alt="" class="addicon">
                    </div>
                </div>
            </div>
            <div class="singleComment" v-for="(comment,index) in commentList" :key="'cc'+index" v-if="commentList.length!==0" @click="clickDownload">
                <div style="display:flex;justify-content:space-between">
                    <div class="authorLeft mt2">
                        <img :src="`${apiUrl}/attach/img/${comment.author.avatarId}/square`" alt="" class="authorImg">
                        <div class="authorTitle">
                            <div class="name">{{comment.author.nickname}}</div>
                            <div class="time">{{changeYear(comment.createdDate)}}</div>
                        </div>
                    </div>
                    <div class="authorRight" @click="clickDownload">
                        <div class="likecomment">
                            {{comment.likeCount}}<img src="../assets/like.png" alt="" class="likeicon">
                        </div>
                    </div>
                </div>
                <div class="commentContent">{{comment.content}}
                </div>
            </div>
            <div class="seeAllComent" v-if="commentList.length!==0">查看全部点评 <img src="../assets/seemore.png" alt="" class="rotate90">
            </div>
            <div class="noComment" v-if="commentList.length===0">
                暂无点评
            </div>
        </div>
        <div class="author" ref="actvity">
            <div class="productI">
                <div class="authorLeft">
                    <div class="commentT">活动须知</div>
                </div>
            </div>
            <div class="noticeComent" v-html="noticeList" v-if="noticeList"></div>
            <!-- <ul class="noticeComent" v-if="noticeList.length!==0">
                                        <li class="singleNotice" v-for="(notice,index) in noticeList" :key="'not'+index">
                                            <div>{{notice}}</div>
                                        </li>
                                    </ul> -->
            <div class="noComment" v-if="!noticeList">
                暂无活动须知
            </div>
        </div>
        <div class="author">
            <div class="productI">
                <div class="authorLeft">
                    <div class="commentT">推荐展览</div>
                </div>
            </div>
            <div class="ticketContentFour" v-for="(exh,index) in exhList" :key="'cc'+index" v-if="exhList.length!==0" @click="clickDownload">
                <img :src="`${apiUrl}/attach/img/${exh.mainPic.id}`" alt="" class="ticketImg">
                <div class="contentDiv">
                    <div class="contentTitle colorB">{{exh.name}}</div>
                    <div>
                        <div class="contentDate colorG">{{changeDate(exh.startDay)}}-{{changeDate(exh.endDay)}}</div>
                        <div class="contentDate colorG mt1">{{exh.landmark.name}}&nbsp;&nbsp;&nbsp;{{exh.distance}}</div>
                    </div>
                    <div class="contentSale">
                        <div class="contentDate colorG">已售{{exh.soldNum}}份</div>
                        <div class="contentPrice">{{exh.price}}</div>
                    </div>
                </div>
            </div>
            <div class="noComment" v-if="exhList.length===0">
                暂无推荐展览
            </div>
            <div class="seeAllComent bt1" v-if="exhList.length!==0" @click="clickDownload">查看全部展览 <img src="../assets/seemore.png" alt="" class="rotate90">
            </div>
        </div>
        <div class="lastSection"></div>
        <div class="footer">
            <div class="footerLeft">
                <div class="footerOne" @click="clickDownload">
                    <img src="../assets/service.png" alt="">
                    <div>售前咨询</div>
                </div>
            </div>
            <div class="footerRight">
                <div class="footerLike" @click="clickDownload">
                    约展
                </div>
                <div class="footerBuy" @click="clickDownload">
                    立即购买
                </div>
            </div>
        </div>
        <!-- <img src="../assets/cc.jpg" alt=""> -->
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import VueSticky from './stickS/index.js'
    import throttle from './stickS/throttle.js'
    import headerS from './header'
    import {
        getTicket,
        getWx
    } from '../api/api'
    // const throttle = function(delay, action) {
    //     var last = 0;
    //     return function() {
    //         var curr = +new Date()
    //         if (curr - last > delay) {
    //             action.apply(this, arguments)
    //             last = curr
    //         }
    //     }
    // }
    export default {
        components: {
            headerS
        },
        directives: {
            'sticky': VueSticky,
        },
        data() {
            return {
                // isAct: '#intro',
                ticketInfo: {
                    title: '',
                    date: '',
                    time: '',
                    sale: '',
                    price: '',
                    gym: '',
                    add: ''
                },
                backgroundbg: '',
                commentNumber: 0,
                ticketIntroContent: '',
                // isAct: '#intro',
                exhList: [{
                    name: '',
                    startDay: '',
                    endDay: '',
                    landmark: {},
                    price: '',
                    distance: '',
                    soldNum: '',
                    mainPic: {}
                }],
                // commentList:[],
                commentList: [{
                    author: {},
                    createdDate: '',
                    content: '',
                    likeCount: 0,
                }],
                noticeList: '',
                isAll: false,
                shareDesc: '',
                box: '',
                activeIndex: 0,
                scrollTopDelimiters: []
            }
        },
        created() {
            // document.title = this.ticketInfo.title
            // let id = this.getParameter('id')
            // console.log(id)
            this.fetchData()
            this.wechatConfig()
        },
        mounted() {
            this.calculateScrollTopDelimiters()
        },
        updated() {
            this.calculateScrollTopDelimiters()
        },
        methods: {
            handleScroll: throttle(function(e) {
                const $groups = this.$refs.groups;
                const basicH = 1.6 * this.basic + 1.15 * this.basic;
                const scrollTop = $groups.scrollTop + basicH;
                const lowerBound = this.scrollTopDelimiters[0];
                const upperBound = this.scrollTopDelimiters[1];
                const bottomBound = this.scrollTopDelimiters[2];
                const activeIndex = (() => {
                    if (scrollTop < lowerBound) {
                        return 0
                    } else if(lowerBound <= scrollTop && scrollTop < upperBound){
                        return 1
                    } else if(upperBound <= scrollTop &&scrollTop < bottomBound){
                        return 2
                    }else{
                        return 3
                    }
                    
                })();
                this.activeIndex = activeIndex;
            }),
            calculateScrollTopDelimiters() {
                this.scrollTopDelimiters = [];
                let br = this.$refs.comment.offsetTop-50;
                let cr = this.$refs.actvity.offsetTop-50;
                let dr = cr + this.$refs.actvity.offsetHeight;
                this.scrollTopDelimiters = [br, cr, dr];
                // console.log(1,this.scrollTopDelimiters)
            },
            fetchData() {
                let dl = document.location.href.split('/')
                let id = dl[dl.length - 1];
                getTicket(id).then(res => {
                    // console.log(res)
                    let data = res.data;
                    document.title = data.name
                    this.ticketInfo = {
                        title: data.name,
                        date: `${this.changeDate(data.startDay)}-${this.changeDate(data.endDay)}`,
                        time: data.friendlyOpenDay,
                        sale: data.soldNum,
                        price: data.price,
                        gym: data.landmarkName,
                        add: data.landmarkAddr
                    }
                    this.backgroundbg = `${this.apiUrl}/attach/img/${data.mainPic.id}`
                    this.ticketIntroContent = data.description;
                    this.noticeList = data.notes || '';
                    this.commentNumber = data.evaluationCount;
                    this.commentList = data.evaluations;
                    this.exhList = data.commendExhibitions;
                })
            },
            changeDate(date) {
                // let d = date.substring(0, 10);
                return date.replace(/-/g, '.')
            },
            changeYear(data) {
                let d = data.substring(0, 10);
                return d.replace(/-/, '年').replace(/-/, '月') + '日'
            },
            // getParameter(sProp) {
            //     var re = new RegExp(sProp + "=([^\&]*)", "i");
            //     var a = re.exec(document.location.search);
            //     if (a == null)
            //         return null;
            //     return a[1];
            // },
            seeMoreC() {
                this.isAll = true;
            },
            // changeCss(el, type) {
            //     let a = document.getElementById(el);
            //     let ii = document.getElementById('ii');
            //     let cc = document.getElementById('cc');
            //     let aa = document.getElementById('aa');
            //     if (type === 'else') {
            //         ii.className = ''
            //         cc.className = ''
            //         aa.className = ''
            //         return
            //     }
            //     if (a.className.indexOf('ticketAct') < 0) {
            //         ii.className = ''
            //         cc.className = ''
            //         aa.className = ''
            //         a.className += ' ticketAct'
            //     }
            // },
            // changeAct() {
            //     let basicH = 1.6 * this.basic + 1.15 * this.basic;
            //     let ar = document.getElementById('intro').getBoundingClientRect();
            //     let br = document.getElementById('comment').getBoundingClientRect();
            //     let cr = document.getElementById('actvity').getBoundingClientRect();
            //     let aT = ar.top;
            //     let aB = ar.bottom;
            //     let bT = br.top;
            //     let bB = br.bottom;
            //     let cT = cr.top;
            //     let cB = cr.bottom;
            //     if (aT > basicH || aB - basicH > 20) {
            //         this.changeCss('ii')
            //     } else if (bT - basicH < 40 && bB - basicH > 20) {
            //         this.changeCss('cc')
            //     } else if (cT - basicH < 40 && cB - basicH > 20) {
            //         this.changeCss('aa')
            //     } else {
            //         this.changeCss('', 'else')
            //     }
            // },
            goto(type) {
                let a = this.$refs[type].offsetTop;
                let final = a - (1.6 * this.basic + 1.15 * this.basic);
                // this.isAct = type;
                this.smoothUp(final)
            },
            smoothUp(final) {
                let now = this.$refs.groups.scrollTop; //document.documentElement.scrollTop || document.body.scrollTop;
                let speed = Math.floor((now - final) / 8);
                if (now - final > 10 || final - now > 10) {
                    this.$refs.groups.scrollTop -= speed;
                    // document.documentElement.scrollTop -= speed;
                    window.requestAnimationFrame(this.smoothUp.bind(this, final))
                }
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
                getWx({ //接口
                    url: url
                }).then((response) => {
                    // this.$wechat.config(JSON.parse(response.data.data))
                    //api调接口之后配置
                    let data = response.data;
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
                    wx.ready(function() {
                        //              alert(window.location.href.split('#')[0]);
                        //分享到朋友/qq
                        wx.updateAppMessageShareData({
                            title: _this.ticketInfo.title, // 分享标题
                            desc: document.getElementsByClassName('content')[0].textContent || _this.title, // 分享描述
                            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.backgroundbg, // 分享图标
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
                            title: _this.ticketInfo.title, // 分享标题
                            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.backgroundbg, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
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
        },
        computed: {
            basic() {
                let htmlFZ = document.getElementsByTagName("html")[0].style.fontSize;
                let basic = htmlFZ.split('px')[0];
                return basic;
            },
            stickyTop() {
                return 1.6 * this.basic;
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ticketShare {
        background: #F2F2F2;
        height: inherit;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .ticketBG {
        height: 6.826667rem;
        width: 100%;
        position: relative;
        margin-bottom: 1.3rem;
    }
    .ticketBG::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        /* padding-top: 1rem; */
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.50)), color-stop(100%, #000000));
        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.50) 0%, #000000 100%);
    }
    .ticketContent {
        display: flex;
        padding: 0 .4rem;
        position: absolute;
        top: 1.9rem;
        z-index: 1;
        width: 100%;
    }
    .ticketContentFour {
        display: flex;
        padding: .4rem 0;
        position: relative;
        height: 4.586667rem;
        width: 100%;
        /* top: 1.9rem; */
        /* z-index: 1; */
    }
    .mt1 {
        margin-top: .1rem;
    }
    .ticketImg {
        flex: 0 0 2.666667rem;
        height: 3.733333rem;
        width: 2.666667rem;
    }
    .contentDiv {
        margin-left: .4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        flex: 1;
    }
    .contentTitle {
        font-size: 14px;
        color: #FFFFFF;
        line-height: 20px;
    }
    .contentDate {
        font-size: 11px;
        color: #FFFFFF;
    }
    .contentSale {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .bt1 {
        border-top: 1px solid #F8F8F8
    }
    .contentPrice {
        font-size: 16px;
        color: #FF5050;
    }
    .ticketAdd {
        width: 92%;
        position: absolute;
        bottom: -1rem;
        height: 1.6rem;
        background: white;
        z-index: 2;
        left: .4rem;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .4rem;
    }
    .addMain {
        font-size: 12px;
        color: #363636;
        margin-bottom: .2rem;
    }
    .greyT {
        width: .213333rem;
        height: .266667rem;
        margin-left: .15rem;
    }
    .addDetail {
        font-size: 12px;
        color: #757575;
    }
    .addIcon {
        flex: 0 0 17%;
        border-left: 1px solid #F2F2F2;
        text-align: right;
        padding-right: .1rem;
    }
    .navicon {
        width: .8rem;
        height: .8rem;
    }
    .productTitle {
        padding: 0 .4rem;
        background: white;
        font-size: 14px;
        color: #363636;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1.146667rem;
        margin-bottom: 0.1rem;
        /* position: relative; */
        /* position: sticky;
                                                                                        top: 1.6rem; */
        /* z-index: 100; */
    }
    .sss {
        position: relative;
    }
    .sss::after,
    .productTitle::after {
        content: '';
        width: 100%;
        height: 3px;
        background: #F2F2F2;
        position: absolute;
        bottom: -3px;
        z-index: 2;
        left: 0;
    }
    .ticketI {
        height: 100%;
        line-height: 1.146667rem;
        flex: 0 0 20%;
        text-align: center;
    }
    .ticketAct {
        color: #F87062;
        border-bottom: 3px solid #F87062;
        display: inline-block;
        position: relative;
        z-index: 3;
    }
    .ticketIntro {
        width: 100%;
        height: 6rem;
        background: white;
        padding: 0.4rem 0.4rem 0;
        font-size: 13px;
        color: #757575;
        line-height: 26px;
        position: relative;
        overflow: hidden;
    }
    .allIntro img {
        max-width: 100%;
    }
    .ticketAll {
        height: auto;
        padding-bottom: .4rem;
    }
    .ticketIntroMore::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.5rem;
        padding-top: 2rem;
        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), color-stop(60%, #fff));
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 60%);
    }
    .seeMore {
        font-size: 14px;
        line-height: 50px;
        color: #363636;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .seeIcon {
        width: .4rem;
        margin-left: .1rem;
    }
    .colorB {
        color: #363636;
    }
    .colorG {
        color: #757575;
    }
    .noticeComent {
        margin: .4rem 0;
        /* padding-inline-start: .4rem; */
        list-style: none;
    }
    .singleNotice {
        font-size: 14px;
        color: #757575;
        line-height: 26px;
    }
    .commentT {
        margin-right: .2rem;
        font-size: 14px;
        /* color: #212121; */
        /* font-weight: 600 */
    }
    .commentN {
        font-size: 14px;
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
        padding: 0.2rem 0 .3rem;
        border-bottom: 1px solid #F8F8F8;
    }
    .singleComment {
        margin-top: .5rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #F8F8F8
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
        color: #757575;
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
        font-size: 12px;
        color: #757575;
    }
    .authorTitle .time {
        font-size: 9px;
        color: #757575;
    }
    .seeAllComent {
        height: 1.333333rem;
        width: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #363636;
    }
    .rotate90 {
        width: .3rem;
        margin-left: .1rem;
        transform: rotate(-90deg);
    }
    .allcomment {
        font-size: 14px;
        color: #363636;
        margin-right: .2rem;
    }
    .likecomment {
        font-size: 14px;
        color: #757575;
    }
    .addicon {
        width: .266667rem;
        margin-left: .1rem;
    }
    .likeicon {
        margin-left: .2rem;
        width: .48rem;
    }
    .footer {
        width: 100%;
        height: 1.6rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        padding: 0 0 0 .4rem;
        display: flex;
        background: white;
        z-index: 100;
    }
    .footerLeft {
        flex: 0 0 25%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .3rem;
    }
    .footerRight {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: .3rem;
    }
    .footerOne {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .footerOne img {
        width: .533333rem;
        height: .533333rem;
        margin-bottom: .05rem;
    }
    .footerOne div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike {
        font-size: 14px;
        color: #573426;
        width: 100%;
        height: 1.066667rem;
        text-align: center;
        background: #FFCA18;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        margin-right: .3rem;
    }
    .footerBuy {
        font-size: 14px;
        color: #FFFFFF;
        width: 100%;
        height: 1.066667rem;
        background: #FF5050;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
    }
    .lastSection {
        width: 100%;
        height: 1.4rem;
        background: #F2F2F2
    }
</style>
