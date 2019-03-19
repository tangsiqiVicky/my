// 基本url
const baseUrl = "http://47.92.201.37:8080/cuttlefish/" //  甲方版
// const baseUrl = "http://172.16.1.254:8080/cuttlefish/" //穿透
// const baseUrl = "http://192.168.31.13:8081/cuttlefish/"
// const baseUrl = "/cuttlefish/"
// export const ip = "http://47.100.110.119:8585/cuttlefish/app/index.html#/"
export const ip = "http://47.92.201.37:8080/cuttlefish/app/index.html#/"
// export const ip  = "http://172.16.1.254:8080/cuttlefish/app/index.html#/" //穿透
// 添加首页图片前缀路径
// export const url = "http://47.100.110.119:8585"  47服务器版
export const url = "http://47.92.201.37:8080"   //甲方版
// export const url = "http://172.16.1.254:8080/" //穿透
    // 验证手机号是否存在
export const url_1 = baseUrl + "user/checkPhone"
    // 发送验证码
export const url_2 = baseUrl + "user/code"
    // 注册
export const url_3 = baseUrl + "user/register"
    // 登录
export const url_4 = baseUrl + "user/login"
    // 退出
export const url_5 = baseUrl + "user/loginOut"
    // 修改和忘记密码
export const url_6 = baseUrl + "user/forgetPwd"
    // 修改昵称
export const url_7 = baseUrl + "user/changeName"
    // 修改签名
export const url_8 = baseUrl + "user/changeSignature"
    // 客户服务
export const url_9 = baseUrl + "getService"
    // 举报
export const url_10 = baseUrl + "byReport"
    // 关注
export const url_11 = baseUrl + "byRelation"
    // 取消关注
export const url_12 = baseUrl + "cancelRelation"
    // 点赞
export const url_13 = baseUrl + "byLike"
    // 首页
export const url_14 = baseUrl + "getIssues"
    // 发布信息
export const url_15 = baseUrl + "addIssue"
    // 视屏详细信息
export const url_16 = baseUrl + "getIssueInfo"
    // 回复帖子
export const url_17 = baseUrl + "comment"
    // 回复评论
export const url_18 = baseUrl + "commentReply"
    // 发现主页
export const url_19 = baseUrl + "findHome"
    // 资讯更多页
export const url_20 = baseUrl + "moreInfo"
    // 资讯详情页
export const url_21 = baseUrl + "info"
    // 获得秒杀和推荐路线 + 搜索
export const url_22 = baseUrl + "getPaths"
    // 路线详情页
export const url_23 = baseUrl + "pathInfo"
    // 兑换更多页
export const url_24 = baseUrl + "intExchanges"
    // 兑换详情页
export const url_25 = baseUrl + "intExchange"
    // 消息列表
export const url_26 = baseUrl + "getMsgs"
    // 系统消息
export const url_27 = baseUrl + "informs"
    // 兑换下单
export const url_28 = baseUrl + "downExchangeOrder"
    // 倒计时结束
export const url_29 = baseUrl + "updateStatus"
    // 我的页面
export const url_30 = baseUrl + "myHome"
    // 我的发布记录
export const url_31 = baseUrl + "myIssue"
    // 首页我的关注发布记录
export const url_32 = baseUrl + "getMyRelations"
    // 兑换下单记录
export const url_33 = baseUrl + "getExchangeOrders"
    // 获取订单
export const url_34 = baseUrl + "getOrders"
    // 设置评价
export const url_35 = baseUrl + "setLevel"
    // 订单详情页
export const url_36 = baseUrl + "getOrder"
    // 取消订单
export const url_37 = baseUrl + "cancelOrder"
    // 身份认证
export const url_38 = baseUrl + "user/userVerify"
    // 删除记录
export const url_39 = baseUrl + "deleteIssue"
    // 购买下单
export const url_40= baseUrl + "downOrder"
    // 第三方登陆判断是否已绑定
export const url_41= baseUrl + "/user/otherLogin"
    // 第三方登陆绑定
export const url_42= baseUrl + "/user/otherBind"
    // 第三方登陆注册
export const url_43= baseUrl + "/user/otherRegister"
    // 支付宝支付
export const url_44= baseUrl + "/pay/alipay"
    // 支付宝退款
export const url_45= baseUrl + "/pay/refundMoney"
    // 微信支付
export const url_46= baseUrl + "/wxpay/pay"
    // 微信退款
export const url_47= baseUrl + "/wxpay/wxRefund"
    // 积分说明接口
export const url_48= baseUrl + "getLikeNum"

// import store from '../../../vuex/store'
//     import {mapState,mapMutations} from "vuex"
//     ...mapMutations(['setUserData']),
//     this.setUserData(res.data.data)

// const url = {
//     getShoppingMallInfo:BASEURL+'lala',
// }
// module.exports = url
// export { url, url2, url3 }
// import {url_1,url_2,url_3} from  '../../serviceAPI.config.js'
// this.$dialog.alert({
//     message: "账号或密码错误"
// })
// userId: JSON.parse(localStorage["user"]).id,
// if (localStorage["token"]) {
//     if (bool) {
//         this.$toast({
//             mask: true,
//             message: '您已经关注过了',
//             // duration: "50000"
//             duration: "500"
//         });
//     } else {
//         this.axios({}).then(res => {})
//     }
// } else {
//     this.$dialog.confirm({
//         message: '登录才能关注',
//         showCancelButton: true,
//         confirmButtonText: "去登陆",
//     }).then(
//         () => this.$router.push("/login")
//     ).catch(() => {})
// }
