<template>
    <div>
        <el-tabs tab-position="top" class="nav-list" stretch>
            <el-tab-pane v-for="(item,iIndex) in items" :key="iIndex" lazy class="66666666">
                <!-- slot 导航目录-->
                <span slot="label" class="nav-h">
                    <i :class="item.icon" style="margin-right: 7px"></i>
                    <span>{{ item.name }}</span>
                </span>
                <!-- 导航内容-->
                <div class="nav-content">
                    <div v-if="fn.navStyle===1" class="url-list-1">
                        <a v-for="(web,wIndex) in item.web" :key="wIndex" class="url-box" :href="web.url" target="_blank">
                            <el-tooltip placement="bottom" width="300" trigger="hover" :disabled="showTip" :content="web.desc"
                                        transition="" open-delay="200" :enterable=false popper-class="tooltip">

                                <div class="url">
                                    <el-image class="u-logo" :src="web.logo" fit="cover" lazy>
                                        <div slot="error" class="u-logo-none">
                                            <span>{{ web.title | $firstText}}</span>
                                        </div>
                                    </el-image>
                                    <div class="u-content">
                                        <div class="u-title">{{ web.title }}</div>
                                        <div class="u-desc">{{ web.desc }}</div>
                                    </div>
                                </div>

                            </el-tooltip>
                        </a>
                    </div>

                    <div v-if="fn.navStyle===2" class="url-list-card">
                        <div v-for="(web,wIndex) in item.web" :key="wIndex" class="card-box">
                            <div class="card">
                                <el-image class="u-screen" :src="web.screenshot" lazy></el-image>
                                <div class="card-content">
                                    <div class="card-title">{{ web.title }}</div>
                                    <div class="card-desc">{{ web.desc | descSub }}</div>
                                    <div class="card-button">
                                        <!--<el-button @click="addToWeb(iIndex,wIndex)" size="small" type="info" plain
                                                   icon="el-icon-circle-plus-outline"></el-button>-->
                                        <a :href="web.url" target="_blank" style="flex:1;"><el-button type="primary" size="small"
                                                   icon="el-icon-position" style="width: 100%"></el-button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import itemsData from "../assets/data.json";

export default {
    name: "NavList",
    data() {
        return {
            items: itemsData,
            showTip:!this.fn.showTip
        }
    },
    methods: {
        addToWeb(iIndex, wIndex) {
            console.log(this.items[iIndex].web[wIndex])
            this.$message({
                message: '开发中..',
                type: 'info'
            })
        }
    },
    filters: {
        descSub(value) {
            return value.slice(0, 70)
        }
    }
}
</script>

<style>

/*.nav-list .tooltip {
    background: #c3c3c3;
    border: 0;
}

.tooltip .popper__arrow::after {
    border-bottom-color: #c3c3c3 !important;
    border-top-color: #c3c3c3 !important;
}*/

.tooltip {
    max-width: 300px;
    line-height: 1.7;
}

.nav-list .el-tabs__header {
    margin: 0 0 35px;
    position: sticky;
    top: 0;
    background: #374151;
    z-index: 1;
}

.nav-list .el-tabs__item {
    color: #fff;
    height: 50px;
}

.nav-list .el-tabs__item.is-active {
    color: #409EFF;
    font-size: 16px;
}

.nav-h {
    /*font-size: 18px;
    color: #fff;*/
}

/********************************卡片式********************************/
.url-list-card {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -30px;
}

.url-list-card .card-box {
    width: 33.333%;
}

.url-list-card .card {
    margin: 0 30px 45px;
    background: #373737;
}

.url-list-card .u-screen {
    height: 160px;
    width: 100%;
    background: #fff;
}

.url-list-card .u-screen img {
    object-fit: cover;
    object-position: top;
}

.url-list-card .card-content {
    padding: 10px 15px 15px;
}

.url-list-card .card-title {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
}

.url-list-card .card-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 20px 0;
    height: 38px;
    color: #a1a1a1;
}

.url-list-card .card-button {
    display: flex;
    justify-content: space-between;
}

.url-list-card .card-button button {
    padding: 7px;
    width: 30%;
    font-size: 17px;
    margin-right: 10px;
}

@media (max-width: 768px) {
    .url-list-card {
        margin: 0;
    }

    .url-list-card .card-box {
        width: 50%;
    }

    .url-list-card .card {
        margin: 0 5px 20px;
    }

    .url-list-card .card-content {
        padding: 10px 10px 15px;
    }

    .url-list-card .card-title {
        font-size: 15px;
    }

    .url-list-card .card-desc {
        font-size: 12px;
        height: 32px;
        margin: 15px 0;
    }

    .url-list-card .u-screen {
        height: 80px;
    }


}

/********************************经典导航样式********************************/

.nav-list.el-tabs--left .el-tabs__item.is-left {
    text-align: left;
}

.url-list-1 {
    display: flex;
    flex-wrap: wrap;
}

.url-list-1 .url-box {
    width: 33.333%;
}

.url-list-1 .url {
    display: flex;
    align-items: center;
    background: #1c2128;
    padding: 18px 20px;
    border-radius: 5px;
    margin: 0 20px 30px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.url-list-1 .url:hover {
    cursor: pointer;
    transform: translateY(-6px);
    -webkit-transform: translateY(-6px);
    -moz-transform: translateY(-6px);
    box-shadow: 0px 10px 8px -8px rgba(0, 36, 100, 0.3);
    -webkit-box-shadow: 0px 10px 8px -8px rgba(0, 36, 100, 0.3);
    -moz-box-shadow: 0px 10px 8px -8px rgba(0, 36, 100, 0.3);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.url-list-1 .u-logo {
    width: 40px;
    height: 40px;
    border-radius: 4px;
}

.url-list-1 .u-logo-none {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #374151;
}

.url-list-1 .u-content {
    flex: 1;
    margin-left: 10px;
}

.url-list-1 .u-title {
    font-weight: bold;
}

.url-list-1 .u-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #8c8f97;
    font-size: 12px;
    margin-top: 3px;
}

.tool-tip {
    background: #606060 !important;
}

@media (max-width: 768px) {
    .url-list-1 .url-box {
        width: 100%;
    }

    .nav-h span {
        /*display: none;*/
    }
}


</style>
