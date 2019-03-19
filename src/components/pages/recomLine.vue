<template>
    <div ref="line" class="line">
        <hd-title go="true" title="推荐路线"></hd-title>
        <van-radio-group v-model="radio" class="top">
            <van-cell-group>
                <van-cell class="tit" :title="item.title" clickable @click="sec(index,item.title)" v-for="(item,index) in info" :key="index">
                    <van-radio :name="index" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="button">
            <van-button type="primary" size="large" @click="luxian">确认路线</van-button>
        </div>
        
    </div>
</template>

<script>
    import hdTitle from '@/components/component/hdTitle'
    import store from '../../../vuex/store'
    import {mapState,mapMutations} from "vuex"
    import {url_22} from  '../../serviceAPI.config.js'
    export default {
        components: {
            hdTitle
        },
        data() {
            return {
                radio: "",
                id:null,
                title:"",
                info: [
                   
                ]
            }
        },
        store,

        methods: {
            ...mapMutations(['setRecomLx','setRecomLxT']),
            sec(index,tit) {
                this.radio = index
                this.id = this.info[index].id
                this.title = tit
            },
            luxian(){
                localStorage.setItem("luxian",this.id)
                this.setRecomLx(this.id)
                this.setRecomLxT(this.title)
                this.$router.go(-1)
            },
            
        },
        created(){
             this.$toast.loading({
                mask: true,
                message: '加载中...',
                // duration: "50000"
                duration: "50000"
            });
             this.axios({
                    method: 'get',
                    params: {
                        pageNum: 1,
                        type: 0
                    },
                    url: url_22
                }).then(res=>{
                    if(res.data.code ==100){
                        this.$toast.clear()
                        this.info = res.data.data
                        console.log(res)
                    }
                    
                })
        },
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.line.style.minHeight = `${heig}px`)
        }
    }
</script>

<style scoped lang="less">
    .line {
        background-color: #f6f6f7;
        .top {
            margin-top: 0.1rem;
            .tit {
                text-align: left!important;
            }
        }
        .button{
            width: 4rem;
            margin:0.4rem auto;
        }
    }
</style>