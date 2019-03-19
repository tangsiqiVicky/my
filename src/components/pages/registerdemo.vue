<template>
    <div>
        <div class="gg" @click="gg">
            哈哈
        </div>
        <div class="name">
            <input type="text" placeholder="请输入姓名" v-model="name">
        </div>
        <div class="name">
            <input type="password" placeholder="请输入密码" v-model="pass">
        </div>
        <van-button type='primary' :text='log' @click="login">

        </van-button>
        <p>
            666+{{userData}}
        </p>
        <p>
            777+{{count}}
        </p>
        <van-button type='danger' :text='log' @click="login2">

        </van-button>
         <van-button type='danger' :text='log2' @click="login3">

        </van-button>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '../../../vuex/store'
    import {mapState,mapMutations} from "vuex"
    export default {
        data(){
            return {
                name:'',
                pass:'',
                log:'登陆',
                log2:'注销'
            }
        },
        store
        ,
        methods:{
            ...mapMutations(['setUserData']),
            gg(){
                this.$router.go(-1);
            },
             login(){
                 axios({
                    method:'get',
                    // data:{dd:"1"},
                    url:'https://www.easy-mock.com/mock/5b28e329e0859d132780ff31/example_copy/token'
                }).then(
                    res=>{
                        console.log(res); 
                        this.setUserData(res.data.data)
                    }
                )
             },
             login2(){
                 console.log(1)
                if(!this.userData){
                    console.log(2)
                     this.$router.push('/')
                     
                }else{
                    axios({
                     method:'get',
                     // data:{dd:"1"},
                     url:'https://www.easy-mock.com/mock/5b28e329e0859d132780ff31/example_copy/token'
                }).then(
                     res=>{
                        console.log(res); 
                       
                    }
                )
                }
             }
             ,
             login3(){
                 console.log(1)
                if(!this.userData){
                    console.log(2)
                     this.$router.push('/')
                     
                }else{
                    axios({
                     method:'get',
                     // data:{dd:"1"},
                     url:'https://www.easy-mock.com/mock/5b28e329e0859d132780ff31/example_copy/token'
                }).then(
                     res=>{
                        console.log(res); 
                        this.setUserData(null)
                        
                    }
                )
                }
             }
        }
        ,
        //  computed:{
        //         count(){
        //             return this.$store.state.a.count;
        //             }
        //  },
        computed:{
           
            ...mapState(['userData','count']),
        }
    }
</script>

<style scoped rel='stylesheet/less' lang='less'>
    .name{
        width: 6.6rem;
       
        margin: 100px auto;
        input{
            display: block;
            width: 6.6rem;
            height: 0.9rem;
            line-height: 0.9rem;
            border: 1px solid #ededed;
            outline: none;
            text-indent: 2em;
        }
    }
</style>