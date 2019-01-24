<template>
    <div>
        <div class="footer" v-if="comp==='tickets'">
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
        <div class="footer1" v-if="comp==='goods'">
            <div class="footerLeft1">
                <div class="footerOne1" @click="clickDownload">
                    <img src="../assets/customer.png" alt="">
                    <div>客服</div>
                </div>
                <div class="footerTwo1" @click="clickDownload">
                    <img src="../assets/favi.png" alt="">
                    <div>收藏</div>
                </div>
            </div>
            <div class="footerRight1">
                <div class="footerLike1" @click="clickDownload">
                    加入购物车
                </div>
                <div class="footerBuy1" @click="clickDownload">
                    立即购买
                </div>
            </div>
        </div>
        <div class="footer2" v-if="comp==='articles'">
            <div class="footerLeft2">
                <div class="footerOne2" @click="clickDownload">
                    <img src="../assets/good.png" alt="">
                    <div>点赞</div>
                </div>
                <div class="footerTwo2" @click="clickDownload">
                    <img src="../assets/fav.png" alt="">
                    <div>收藏</div>
                </div>
                <div class="footerThree2" @click="clickDownload">
                    <img src="../assets/comment.png" alt="">
                    <div>评论</div>
                </div>
            </div>
            <div class="footerRight2">
                <div class="footerLike2" @click="clickDownload">
                    我喜欢
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            comp: {
                type: String,
                default: ''
            }
        },
        methods: {
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
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    .footer1 {
        width: 100%;
        height: 1.306667rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        /* padding: 0 0 0 .4rem; */
        display: flex;
        background: white;
    }
    .footerLeft1 {
        flex: 0 0 35%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .3rem;
    }
    .footerRight1 {
        flex: 0 0 65%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerOne1,
    .footerTwo1 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .footerOne1 img {
        width: .56rem;
        height: .56rem;
        margin-bottom: .05rem;
    }
    .footerTwo1 img {
        width: .56rem;
        height: .56rem;
        margin-bottom: .05rem;
    }
    .footerOne1 div,
    .footerTwo1 div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike1 {
        font-size: 14px;
        color: #573426;
        width: 100%;
        height: 1.306667rem;
        text-align: center;
        background: #FFCA18;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerBuy1 {
        font-size: 14px;
        color: #FFFFFF;
        width: 100%;
        height: 1.306667rem;
        background: #FF5050;
        display: flex;
        align-items: center;
        justify-content: center;
    }
      .footer2 {
        width: 100%;
        height: 1.6rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        padding: 0 .4rem;
        display: flex;
        background: white;
    }
    .footerLeft2 {
        height: 100%;
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .3rem;
    }
    .footerRight2 {
        /* height: 100%; */
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerOne2,
    .footerTwo2,
    .footerThree2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 65%;
    }
    .footerOne2 img {
        /* width: .506667rem; */
        height: .44rem;
        /* margin-bottom: .15rem; */
    }
    .footerTwo2 img {
        /* width: .5rem; */
        height: .48rem;
        /* margin-bottom: .15rem; */
    }
    .footerThree2 img {
        /* width: .48rem; */
        height: .48rem;
        /* margin-bottom: .15rem; */
    }
    .footerOne2 div,
    .footerTwo2 div,
    .footerThree2 div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike2 {
        font-size: 14px;
        color: #573426;
        width: 100%;
        /* text-align: center; */
        /* padding: 0.25rem 0; */
        background: #FFCA18;
        border-radius: 3px;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
