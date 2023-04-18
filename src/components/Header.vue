<template>
    <div class="head-box">
        <div class="head">
            <a class="left" href="/">
                <img src="../assets/images/logo-2.png" height="40px" alt="" v-if="fn.showLogo"/>
                <div class="logoText" v-if="fn.logoText">{{fn.logoText}}</div>
            </a>
            <div class="right">
                <a :href="fn.connect.href" target="_blank">
                    <el-button type="primary" size="mini" plain>{{ fn.connect.text }}</el-button>
                </a>
            </div>
        </div>
        <div class="fixed-menu">
            <el-button type="primary" icon="el-icon-caret-top" size="small" @click="toTop()"></el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data(){
        return{

        }
    },
    methods: {
        toTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style>

.head-box {
    /*background: #fff;*/
    margin-bottom: 30px;
    border-bottom: 1px solid #ffffff24;
}

.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    max-width: 1200px;
    margin: 0 auto;
}

.head .left{
    display: flex;
    align-items: center;
}

.head .left .logoText{
    margin-left: 8px;
    font-size: 24px;
    color: #fff;
}


.fixed-menu {
    position: fixed;
    right: 10px;
    bottom: 50%;
    z-index: 999;
}

.fixed-menu .el-button {
    padding: 6px;
    font-size: 17px;
    border-radius: 2px;
}

@media (max-width: 768px) {
    .head {
        padding: 0 10px;
    }

    .fixed-menu {
        display: none;
    }
}
</style>
