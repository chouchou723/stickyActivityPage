<template>
        <div class="header">
            <div class="headerLeft">
                <img src="../assets/logo.png" alt="" class="headerImg">
                <div class="authorTitle">
                    <div class="headername">下载艺下APP</div>
                    <div class="headernameT">发现身边的艺术玩伴</div>
                </div>
            </div>
            <div class="authorRight">
                <div class="headerDown" @click="clickDownload">
                    点击下载
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created() {
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
    .header {
        width: 100%;
        height: 1.6rem;
        position: fixed;
        top: 0;
        padding: 0 .4rem;
        display: flex;
        background: rgba(0, 0, 0, 0.8);
        justify-content: space-between;
        align-items: center;
        z-index: 10;
    }
    .headerLeft {
        display: flex;
        align-items: center;
    }
    .headerImg {
        width: 1.173333rem;
        height: 1.173333rem;
        border-radius: 8px;
        margin-right: .266667rem
    }
    .headerDown {
        width: 2.24rem;
        height: .8rem;
        font-size: 14px;
        color: #725f1e;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fad142;
        border-radius: 2px;
    }
    .headername {
        font-size: 15px;
        color: white;
        line-height: .56rem;
    }
    .headernameT {
        font-size: 13px;
        color: white;
    }
</style>
