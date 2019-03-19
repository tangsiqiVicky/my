// <template>
//     <div ref="detail" class="detail">
//         <order-back titLeft="图片详情" share="true" @alert="jubao" @share1="showSh">
//         </order-back>
//         <div class="img">
//             <img class="max" :src="info.imgUrl[1]" @click="showImage">
//             <img class="min" :src="info.isLike?love[1]:love[0]" @click="dianzan(info.isLike)">
//         </div>
//         <!-- 作者信息 -->
//         <div class="author">
//             <h3 class="tit">{{info.tit}}</h3>
//             <div class="info">
//                 <div class="avatar">
//                     <img :src="info.avatar">
//                 </div>
//                 <div class="nickName">
//                     <p class="p1">{{info.nickName}}</p>
//                     <p class="p2"><img :src="gkrs">{{info.yuedu}}</p>
//                 </div>
//                 <div class="attention" @click="care(info.isGz)">
//                     <p v-if="info.isGz">已关注</p>
//                     <p v-else class="wp">关注</p>
//                 </div>
//             </div>
//             <p class="sign">个性签名：{{info.sign}}</p>
//         </div>
//         <!-- 推荐 -->
//         <div class="recom" v-if="info.recom.tit">
//             <div class="imgL">
//                 <img :src="info.recom.imgUrl">
//             </div>
//             <div class="txt">
//                 <div class="txt-top">
//                    <div class="txt-top-p">
//                         <p class="p1">{{info.recom.tit}}</p>
//                         <p class="p2">{{info.recom.con}}</p>
//                    </div>
//                    <div class="txt-top-img">
//                        <img :src="recom">
//                    </div>
//                 </div>
               
//                 <div class="txt-bottom">
//                     <span class="s1">￥{{info.recom.price}}/人</span>
//                     <span class="s2">{{info.recom.num}}已购买</span>
//                 </div>
//             </div>
//         </div>
//         <reply :comment="com.comment" @change1="changCommmer"></reply>
//         <print @submit1="addComment" @submit2="canComment" ref="inp"></print>
//         <popup1 :report="isReport" @changeIsre='changeIs'></popup1>
//         <share1 ref='share'></share1>
//     </div>
// </template>
// <script>
//     import orderBack from '@/components/component/orderBack'
//     import reply from '@/components/component/reply'
//     import print from '@/components/component/print'
//     import popup1 from '@/components/component/popup-1'
//     import share1 from '@/components/component/share-1'
//     import {
//         ImagePreview
//     } from 'vant';
//     export default {
//         components: {
//             orderBack,
//             print,
//             reply,
//             popup1,
//             share1
//         },
//         data() {
//             return {
//                 isReport: false,
//                 type: 0, //判断是回复谁
//                 love: [require("../../../static/images/weidianzan.png"), require("../../../static/images/yidianzan.png")],
//                 gkrs: require("../../../static/images/guankanrenshu.png"),
//                 recom:require("../../../static/images/tuijian.png"),
//                 info: {
//                     imgUrl: [
//                         require("../../../static/images/889.jpg"),
//                         require("../../../static/images/tupianDe.png"),
//                         require("../../../static/images/tupianDe.png")
//                     ],
//                     isLike: false,
//                     isGz: false,
//                     tit: "神界大陆可视对讲",
//                     avatar: require("../../../static/images/touxiangmini.png"),
//                     nickName: "知秋一叶",
//                     yuedu: 6546,
//                     sign: "收款打款实力打脸",
//                     recom:{
//                         imgUrl:require("../../../static/images/tuijiantupian.png"),
//                         tit:"七日游",
//                         con:"明日依山尽,黄河入海流，欲穷千里目，更上一层楼",
//                         price:"4564",
//                         num:"5465"
//                     }
//                 },
//                 data1: {},
//                 com: {
//                     // commenter: '评论之王', //当前评论人，这里会从接口拿
//                     // type: 0, //评论人，这里会从session拿
//                     // oldComment: null, //上一级评论人，这里会从session拿
//                     // chosedIndex: -1, //评论人所在层数，这里会从session拿
//                     // article: {
//                     //     title: '被评论的文章',
//                     //     time: '2018-07-12',
//                     //     read: 50,
//                     //     content: '当归是一种我们生活中经常使用到的药材，具有很好的活血补血以及调经止痛等功效，另外对女性月经不调或者是血虚等情况具有很好的治疗效果。日常生活中，很多人喜欢将当归泡水喝，这样不仅操作更加的简单，同时还能'
//                     // },
//                     comment: [{
//                             avatar: require("../../../static/images/touxiangmini.png"),
//                             nickName: "知秋一叶",
//                             time: "2018-06-02",
//                             con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                             reply: [{
//                                     responder: "蛤蛤蛤",
//                                     reviewer: "知秋一叶",
//                                     time: "2018-06-02",
//                                     con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                                 },
//                                 {
//                                     responder: "蛤蛤蛤",
//                                     reviewer: "知秋一叶",
//                                     time: "2018-06-02",
//                                     con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                                 },
//                             ]
//                         },
//                         {
//                             avatar: require("../../../static/images/touxiangmini.png"),
//                             nickName: "知秋一叶",
//                             time: "2018-06-02",
//                             con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                             reply: [{
//                                     responder: "蛤蛤蛤",
//                                     reviewer: "知秋一叶",
//                                     time: "2018-06-02",
//                                     con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                                 },
//                                 {
//                                     responder: "蛤蛤蛤",
//                                     reviewer: "知秋一叶",
//                                     time: "2018-06-02",
//                                     con: "世界顶级撒凯迪拉克索拉卡大家圣诞节垃圾了骄傲索拉卡大家拉克丝加大了",
//                                 },
//                             ]
//                         }
//                     ]
//                 }
//             }
//         },
//         mounted() {
//             var heig = document.documentElement.getBoundingClientRect().height
//             // console.log(heig)
//             this.$nextTick(res => this.$refs.detail.style.minHeight = `${heig}px`)
//         },
//         methods: {
//             showImage() {
//                 let showI = ImagePreview(this.info.imgUrl)
//             },
//             showSh(data) {
//                 this.$refs.share.change2()
//             },
//             changeIs(data) {
//                 if (!data) {
//                     this.isReport = !this.isReport
//                 }
//             },
//             jubao(data) {
//                 this.isReport = true
//             },
//             care(){
//                 if (localStorage["token"]) {
//                     if (bool) {
//                         this.$toast({
//                             mask: true,
//                             message: '您已经关注过了',
//                             // duration: "50000"
//                             duration: "500"
//                         });
//                     } else {
//                         this.axios({}).then(res => {})
//                     }
//                 } else {
//                     this.$dialog.confirm({
//                         message: '登录才能关注',
//                         showCancelButton: true,
//                         confirmButtonText: "去登陆",
//                     }).then(
//                         () => this.$router.push("/login")
//                     ).catch(() => {})
//                 }
//             },
//             dianzan(bool) {
//                 if (localStorage["token"]) {
//                     if (bool) {
//                         this.$toast({
//                             mask: true,
//                             message: '您已经点过赞了',
//                             // duration: "50000"
//                             duration: "500"
//                         });
//                     } else {
//                         this.axios({}).then(res => {})
//                     }
//                 } else {
//                     this.$dialog.confirm({
//                         message: '登录才能点赞',
//                         showCancelButton: true,
//                         confirmButtonText: "去登陆",
//                     }).then(
//                         () => this.$router.push("/login")
//                     ).catch(() => {})
//                 }
//             },
//             //添加评论
//             addComment(data) {
//                 alert(data)
//                 if (this.type == 0) {
//                 } else {
//                 }
//                 // if(this.type == 0){
//                 //     this.comment.push({
//                 //         name:'评论者啦',
//                 //         time:'2018-07-13',
//                 //         content:data,
//                 //         reply:[]
//                 //     })
//                 // }else if(this.type ==1){
//                 //     this.comment[this.chosedIndex].reply.push({
//                 //         responder:'二级评论者啦',
//                 //         reviewers:this.comment[this.chosedIndex].name,
//                 //         time:'2018-07-13',
//                 //         content:data
//                 //     })
//                 //     this.type=0
//                 // }
//             },
//             canComment(data) {
//                 this.type = 0
//                 // if(this.type == 0){
//                 //     this.comment.push({
//                 //         name:'评论者啦',
//                 //         time:'2018-07-13',
//                 //         content:data,
//                 //         reply:[]
//                 //     })
//                 // }else if(this.type ==1){
//                 //     this.comment[this.chosedIndex].reply.push({
//                 //         responder:'二级评论者啦',
//                 //         reviewers:this.comment[this.chosedIndex].name,
//                 //         time:'2018-07-13',
//                 //         content:data
//                 //     })
//                 //     this.type=0
//                 // }
//             },
//             // 检测到点击了别人的评论
//             changCommmer(name, index) {
//                 this.type = 1
//                 this.data1.name = name //被评论者名字
//                 this.$refs.inp.auto()
//                 // this.chosedIndex = index
//                 // this.type = 1;
//             }
//             // cancelCommit(data){
//             //     this.type=0
//             // }
//         }
//     }
// </script>

// <style scoped lang="less">
//     .detail {
//         background-color: #f6f6f7;
//         .img {
//             position: relative;
//             width: 7.5rem;
//             height: 6.86rem;
//             margin: 0.1rem auto;
//             overflow: hidden;
//             .max {
//                 width: auto;
//                 max-width: 7.5rem;
//                 height: auto;
//                 margin: auto;
//             }
//             .min {
//                 position: absolute;
//                 width: 0.41rem;
//                 height: 0.36rem;
//                 bottom: 0.3rem;
//                 right: 0.2rem;
//                 z-index: 99;
//             }
//         }
//         .author {
//             padding: 0.2rem;
//             background-color: white;
//             .tit {
//                 font-family: PingFang-SC-Regular;
//                 font-size: 0.3rem;
//                 color: black;
//                 font-weight: bold;
//                 text-align: left;
//                 text-indent: 0.18rem;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//             }
//             .sign {
//                 margin-top: 0.12rem;
//                 font-family: PingFang-SC-Regular;
//                 font-size: 0.24rem;
//                 color: #b8b8b9;
//                 text-align: left;
//                 text-indent: 0.18rem;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//             }
//             .info {
//                 display: flex;
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 white-space: nowrap;
//                 margin-top: 0.1rem;
//                 .avatar {
//                     width: 0.54rem;
//                     height: 0.54rm;
//                     img {
//                         width: 0.54rem;
//                         height: 0.54rm;
//                     }
//                 }
//                 .nickName {
//                     width: 5rem;
//                     text-align: left;
//                     margin-left: 0.2rem;
//                     p {
//                         height: 0.24rem;
//                         margin-top: 0.15rem;
//                         line-height: 0.24rem;
//                     }
//                     .p1 {
//                         font-family: PingFang-SC-Light;
//                         font-size: 0.24rem;
//                     }
//                     .p2 {
//                         display: none;
//                         font-family: PingFang-SC-Light;
//                         font-size: 0.24rem;
//                         vertical-align: middle;
//                         img {
//                             width: 0.33rem;
//                             height: 0.18rem;
//                             vertical-align: middle;
//                             margin-right: 3px;
//                         }
//                     }
//                 }
//                 .attention {
//                     // width: 0.95rem;
//                     // height: 0.42rem;
//                     p{
//                         padding: 0.11rem 0.28rem;
//                         background-color: #0394d3;
//                         border-radius: 0.1rem;
//                         font-family: PingFang-SC-Regular;
//                         font-size: 0.2rem;
//                         line-height: 1;
//                         color: white;
//                     }
//                     .wp{
//                         border:1px dashed#0394d3;
//                         color:#0394d3;
//                         background-color: #fff;
//                     }
                    
//                 }
//             }
//         }
//         .recom{
//             display: flex;
//             margin-top: 0.1rem;
//             padding: 0.1rem;
//             background-color: white;
//             .imgL{
//                 width: 1.22rem;
//                 margin-right: 0.2rem;
//                 img{
//                     display: block;
//                     width: 1.22rem;
//                     height: 1.22rem;
//                 }
//             }
//             .txt{
//                 flex: 1;
//                 .txt-top{
//                     display: flex;
//                     .txt-top-p{
//                         width: 5rem;
//                         text-align: left;
//                         .p1{
//                             font-size: 0.24rem;
//                         }
//                         .p2{
//                             font-size: 0.21rem;
//                             overflow: hidden;
//                             text-overflow: ellipsis;
//                             white-space: nowrap;
//                         }
//                     }
//                     .txt-top-img{
//                         flex: 1;
//                         img{
//                             width: 0.41rem;
//                             height: 0.46rem;
//                         }
//                     }
//                 }
//                 .txt-bottom{
//                     text-align: right;
//                     .s1{
//                         font-family: PingFang-SC-Regular;
// 	                    font-size: 0.24rem;
// 	                    color: #ff5342;
//                     }
//                     .s2{
//                         height: 0.18rem;
// 	                    font-family: PingFang-SC-Light;
//                         font-size: 0.18rem;
//                         color: #b8b8b9;
//                         margin-left: 0.6rem;
//                         padding-right: 0.15rem;
//                     }
//                 }
//             }
//         }
//     }
// </style>