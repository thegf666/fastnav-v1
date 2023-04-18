<template>
    <div class="AddWeb">
        <!-- swiper -->
        <div class="swiper-box" v-if="fn.showBanner">
            <el-carousel trigger="click" :interval="6000" class="swiper">
                <el-carousel-item>
                    <img src="../assets/images/swiper-1.png" class="img">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../assets/images/swiper-2.png" class="img">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 用户添加网站 -->
        <div class="user-add-web" v-if="fn.showAddWeb">
            <a v-for="(value) in userAddWeb" :key="value.id" :href="value.url" class="web-iterm" target="_blank">
                <el-button v-show="isDelWeb" @click.prevent="delWeb(value.id)" type="danger" icon="el-icon-close" circle
                           class="img"></el-button>
                <img v-show="!isDelWeb" :src="value.img" class="img">
                <div class="title">{{ value.title }}</div>
            </a>
            <div class="web-iterm" @click="showAddBox = true">
                <el-button type="primary" icon="el-icon-plus" circle class="img"></el-button>
                <div class="title">添加</div>
            </div>

            <div class="web-iterm" @click="isDelWeb=!isDelWeb">
                <el-button icon="el-icon-minus" circle class="img"></el-button>
                <div class="title">删除</div>
            </div>
        </div>

        <el-dialog class="add-box" title="添加我的网址" :visible.sync="showAddBox" center :append-to-body="true"
                   :close-on-click-modal="false" :show-close="false">

            <div style="margin-bottom: 30px;text-align: center;">
                <div class="black">个人添加的网址保存在本地，清除浏览器缓存时会被清空。</div>
                <el-link @click="exportWebList()" type="success" style="margin-right: 25px">导出配置</el-link>
                <el-link @click="importWebList()" type="success">导入配置</el-link>
            </div>

            <el-input v-model="add.title" placeholder="请输入名称" style="margin:5px"></el-input>
            <el-input v-model="add.url" placeholder="请输入网址" style="margin:5px"></el-input>
            <el-input v-model="add.img" placeholder="请输入网站logo地址" style="margin:5px">
                <el-upload slot="append" action="#" :http-request="getImgBase64" :show-file-list="false">
                    <el-button style="color:#555;">点击上传</el-button>
                </el-upload>
            </el-input>
            <!-- 预览 -->
            <a :href="add.url" class="preview" target="_blank">
                <el-avatar :src="add.img" :size="45"></el-avatar>
                <div class="black" style="margin-top: 8px">{{ add.title ? add.title : "预览" }}</div>
            </a>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showAddBox = false;">取 消</el-button>
            <el-button type="primary" @click="getAdd()">确 定</el-button>
      </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: "AddWeb",
    data() {
        return {
            userAddWeb: JSON.parse(localStorage.getItem("userAddWeb")),
            showAddBox: false,
            isDelWeb: false,
            mobile: {
                is: false,
            },
            swiperList: [
                '../assets/images/swiper-1.png',
                '../assets/images/swiper-2.png',
            ],
            add: {
                id: '',
                title: '',
                url: '',
                img: ''
            },
        }
    },
    methods: {
        delWeb(id) {
            let w = JSON.parse(localStorage.getItem("userAddWeb"));
            let newList = []
            for (let value of w) {
                if (value.id != id) {
                    newList.push(value)
                }
            }
            console.log(newList)
            localStorage.setItem("userAddWeb", JSON.stringify(newList));
            this.userAddWeb = JSON.parse(localStorage.getItem("userAddWeb"));
        },
        getImgBase64(data) {
            console.log(data)
            if (data.file.size / 1024 > 300) {
                this.$message({message: '图片太大，请裁剪后低于300Kb，并且是正方形', type: 'error'})
                return;
            }
            this.getBase64(data.file).then(resBase64 => {
                //直接拿到base64信息
                this.add.img = resBase64;
                console.log(resBase64)
            })
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                let fileResult = "";
                reader.readAsDataURL(file);
                //开始转
                reader.onload = function () {
                    fileResult = reader.result;
                };
                //转 失败
                reader.onerror = function (error) {
                    reject(error);
                };
                //转 结束  咱就 resolve 出去
                reader.onloadend = function () {
                    resolve(fileResult);
                };
            });
        },
        getAdd() {
            if (!this.add.title) {
                this.$message({message: '请输入网站名称', type: 'error'})
                return;
            }
            if (!this.add.url || !/http/i.test(this.add.url)) {
                this.$message({message: '请输入http开头的网站链接，如：https://aicangshu.net', type: 'error'})
                return;
            }
            if (!this.add.img || !/http|data:image/i.test(this.add.img)) {
                this.$message({
                    message: '请输入http开头的网站logo地址，如：https://www.aicangshu.net/favicon.png',
                    type: 'error'
                })
                return;
            }
            let w = JSON.parse(localStorage.getItem("userAddWeb"));
            this.add.id = Date.now();
            w.push(this.add);
            localStorage.setItem("userAddWeb", JSON.stringify(w));
            Object.keys(this.add).forEach((key) => {
                this.add[key] = '';
            })
            this.showAddBox = false;
            this.userAddWeb = JSON.parse(localStorage.getItem("userAddWeb"));
        },
        exportWebList() {
            if (!navigator.clipboard) {
                this.$message({message: '导出失败，请联系我们', type: 'error'})
                return
            }
            navigator.clipboard.writeText(localStorage.getItem("userAddWeb")).then(() => {
                this.$message({message: '已复制到剪切板，请自行粘贴保存到笔记中', type: 'success'})
            })
        },
        importWebList() {
            this.$prompt('导入之前先把当前的配置导出，备份一份！以免发生错误无法恢复！', '导入配置', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\[/,
                inputErrorMessage: '配置不正确'
            }).then(({value}) => {
                localStorage.setItem("userAddWeb", value)
                this.userAddWeb = JSON.parse(localStorage.getItem("userAddWeb"));
                this.showAddBox = false;
                this.$message({type: 'success', message: '导入成功'});
            }).catch(() => {
                this.$message({type: 'info', message: '取消输入'});
            });
        }
    }
}
</script>

<style>

.swiper {
    border-radius: 5px
}

.swiper .el-carousel__container {
    height: 180px;
}

.el-upload__input {
    display: none !important;
}

.swiper .img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 100%;
}

.add-box .el-dialog {
    width: 500px;
}

.user-add-web {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 15px 0;
}

.user-add-web .web-iterm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
}

.user-add-web .web-iterm .img {
    width: 45px;
    height: 45px;
    border-radius: 999px;
    /*background: #fff;*/
    /*border: 1px solid #e9e9e9;*/
    margin-bottom: 6px;
}

.user-add-web .web-iterm .title {
    /*color: #606266;*/
}

.preview {
    display: flex;
    flex-direction: column;
    width: 100px;
    align-items: center;
    margin: 40px auto 0;
}

@media (max-width: 768px) {
    .swiper-box .el-carousel__container {
        height: 140px;
    }

    .add-box .el-dialog {
        width: 85%;
    }
}
</style>
