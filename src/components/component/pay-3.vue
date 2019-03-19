<template>
     <div class="pay">
     
        <div class="limit-time">
           <div>限时{{str}}</div> 
           <div>价格：￥{{$route.params.price}}</div>
        </div>
        <button :class="[isDisab ?'col':'','van-button']" @click="qwe" :disabled='isDisab'><!---->
            <span class="van-button__text">立即抢购</span>
        </button>
    </div>
</template>

<script>
    export default {
        // props:['msPrice'],
        data(){
            return {
                time:'',
                endTime:'1533081600000',
                str:'',
                timer:null,
                isDisab:true,
                
                // msPrice:'35.20'
            }
        },
        created(){
           this.timeDown()
        },
        methods:{
            timeDown(){
                    var dd,hh,mm,ss;
                    this.time = parseInt(this.endTime) - new Date().getTime();
                    if(this.time <=0){
                        clearInterval(this.timer)
                        this.isDisab = false;
                        return '秒杀已结束'
                    }else{
                        dd = Math.floor(this.time/1000/60/60/24)
                        hh = Math.floor(this.time/1000/60/60%24)
                        mm = Math.floor(this.time/1000/60%60)
                        ss = Math.floor(this.time/1000%60)
                        this.str = `${dd}:${hh}:${mm}:${ss}`
                    }
                    this.timer = setInterval(this.timeDown,1000)
            },
            qwe(){
                console.log(1)
            }
        }
    }
</script>

<style scoped lang='less'>
    @colf44:#f44;
    .pay{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        height: 50px;
        font-size: 16px;
        -webkit-box-align: center;
        align-items: center;
        background-color: #fff;
        user-select: none;
        .limit-time{
            flex: 1;
            height: 50px;
            font-size: 14px;
            color: @colf44;
            text-align: left;
            div{
                height: 25px;
                text-indent: 2em;
                &:first-child{
                    line-height: 30px;
                }
                &:last-child{
                    line-height: 20px;
                }
            }
        }
        .van-button {
            display: inline-block;
            position: relative;
            width: 110px;
            height: 100%;
            line-height: 43px;
            box-sizing: border-box;
            border-radius: 0;
            // padding: 0 15px;
            color: #fff;
            background-color:@colf44;
            border: 1px solid @colf44;
            text-align: center;
            -webkit-appearance: none;
            font-size: 14px;
        }       
        .col{
            background-color: #ccc;
            border: 1px solid #ccc;
        }
    }
  
</style>