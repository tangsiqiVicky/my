<template>
    <div>
        <van-popup v-model="report" position="bottom" :overlay='oo' @click-overlay="change" :close-on-click-overlay="hh">
            <div class="con">
                <van-nav-bar title="举报" left-text="返回" right-text="确定" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in list" :key="index" :title="item" clickable @click="toggle(index)">
                            <van-checkbox :name="index" ref="checkbox"></van-checkbox>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {url_10} from  '../../serviceAPI.config.js'
    export default {
        props: ['report','id'],
        data() {
            return {
                // show:false,
                // icon: {
                //         pic:'../../../static/img/images/kuang.png',
                //         picSelect:'../../../static/img/images/lankuang.png'
                // },
                list: ['色情、暴力、血腥违法', '垃圾广告信息', '政治敏感', '垃圾视频', '辱骂、歧视、挑衅内容'],
                result: [],
                resultD:[],
                oo: true,
                hh: false
            }
        },
        methods: {
            onClickLeft() {
                this.$emit("changeIsre", false)
                this.result = []
            },
            onClickRight() {
                if (this.result.length > 0) {
                    for(let item of this.result){
                        this.resultD.push(this.list[item])
                    }
                    this.axios({
                        method: "post",
                        data: {
                            userId: JSON.parse(localStorage["user"]).id,
                            issueId: this.id,
                            type: this.resultD.join()
                        },
                        url:url_10
                    }).then(
                        res => {
                            console.log(res)
                            if (res.data.code == 100) {
                                this.$toast({
                                    message: "举报成功",
                                    duration: 1000
                                })
                            }else if(res.data.code == 200){
                                 this.resultD = []
                                  this.$toast({
                                    message: res.data.msg,
                                    duration: 1000
                                })
                            }
                        }
                    )
                    console.log(this.result)
                }
                this.result = []
                this.$emit("changeIsre", false)
            },
            toggle(index) {
                this.$refs.checkbox[index].toggle()
            },
            change() {
                console.log(1)
                this.$emit("changeIsre", false)
                // this.report = !this.report;
                this.result = []
            }
        }
    }
</script>

<style>
    .van-cell__title {
        width: 6.5rem!important;
        text-align: left;
        text-indent: 2em;
    }
    .van-cell__value {
        width: 1rem!important;
    }
    .van-cell__title,.van-cell__value {
        flex: auto!important;
    }
</style>