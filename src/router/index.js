import Vue from 'vue'
import Router from 'vue-router'
// import register from '@/components/pages/register' //注册
// import forgetPass from '@/components/pages/forgetPass' //忘记密码

// import guide from '@/components/pages/guide' //引导页
// import guide1 from '@/components/pages/guide1' //引导页1
// import guide2 from '@/components/pages/guide2' //引导页2
// import guide3 from '@/components/pages/guide3' //引导页3
// import guide4 from '@/components/pages/guide4' //引导页4

// import user from '@/components/pages/user' //个人中心 我的
// import myOrder from '@/components/pages/myOrder' //订单
// import all from '@/components/pages/myOrderall' //全部订单
// import paying from '@/components/pages/myOrderpaying' //待付款
// //import payingDetail from '@/components/pages/payingDetail' //待付款详情页
// import traving from '@/components/pages/myOrdertraving' //待出游
// import evaling from '@/components/pages/myOrderevaling' //待评价
// import cancel from '@/components/pages/myOrdercancel' //取消/退款
// import ident from '@/components/pages/ident' //认证
// import tips from '@/components/pages/tips' //消息
// import syTips from '@/components/pages/systemNotes' //系统消息
// import tips2 from '@/components/pages/tips2' //提醒
// import set from '@/components/pages/set' //设置
// import nickName from '@/components/pages/changeNickName' //更改昵称
// import changePass from '@/components/pages/changePass' //更改密码
// import changeSign from '@/components/pages/changeSign' //更改个性签名
// import bank from '@/components/pages/bank' //银行卡管理
// import addBank from '@/components/pages/addBank' //添加银行卡1
// import addBank2 from '@/components/pages/addBank2' //添加银行卡2
// import addBank3 from '@/components/pages/addBank3' //添加银行卡3
// import changeBank from '@/components/pages/changeBank' //更换银行卡1
// import changeBank2 from '@/components/pages/changeBank2' //更换银行卡2
// import changeBank3 from '@/components/pages/changeBank3' //更换银行卡3

// import kefu from '@/components/pages/kefu' //客服


// import find from '@/components/pages/find' //发现
// import integral from '@/components/pages/integral' //积分专区
// import integralDetail from '@/components/pages/integralDetail' //积分详情
// import seckill from '@/components/pages/seckill' //秒杀专区
// import seckillDetail from '@/components/pages/seckillDetail' //秒杀专区详情页
// import payStyle from '@/components/pages/payStyle' //支付方式
// import info from '@/components/pages/info' //墨鱼资讯
// import infoDetail from '@/components/pages/infoDetail' //墨鱼资讯详情页
// import recom from '@/components/pages/recom' //热门推荐
// import recomDetail from '@/components/pages/recomDetail' //热门推荐详情页

// import HelloWorld from '@/components/pages/count'
// import moyu from '@/components/pages/moyu'
// import moyudetail from '@/components/pages/moyudetail'
// import test from '@/components/pages/test'
// import test2 from '@/components/pages/test2'
// // import index from '@/components/pages/index'
// import footer from '@/components/component/footer'
// import login from '@/components/pages/login'

// import comment from '@/components/pages/comment'
// import logout from '@/components/pages/logout'
// import shopping from '@/components/pages/shopping'
// import pay3 from '@/components/component/pay-3'
// import p4 from '@/components/component/p4'
// import popup1 from '@/components/component/popup-1'
// import swiper from '@/components/component/swiper'
// import aweSwiper from '@/components/component/aweSwiper'
// import likes from '@/components/component/likes'
// import animate from '@/components/component/animate'
// import { resolve } from 'path';
Vue.use(Router)
export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: "/guide",
            beforeEnter: (to, from, next) => {
                if (localStorage.isguide) {
                    next({ path: "/index" })
                } else {
                    next()
                }
            }
        },
        {
            path: '/guide',
            component: resolve => require(['@/components/pages/guide'], resolve),
            meta: {
                show: false,
                guide: true,
                cname: "导航页"
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.isguide) {
                    next({ path: "/index" })
                } else {
                    next()
                }
            },
            children: [{
                    path: '/',
                    redirect: "guide1",
                    meta: {
                        show: false,
                        guide: true,
                        cname: "导航页"
                    },
                    beforeEnter: (to, from, next) => {
                        if (localStorage.isguide) {
                            next({ path: "/index" })
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'guide1',
                    name: 'guide1',
                    component: resolve => require(['@/components/pages/guide1'], resolve),
                    meta: {
                        show: false,
                        guide: true,
                        cname: "导航页"
                    },
                    beforeEnter: (to, from, next) => {
                        if (localStorage.isguide) {
                            next({ path: "/index" })
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'guide2',
                    name: 'guide2',
                    component: resolve => require(['@/components/pages/guide2'], resolve),
                    meta: {
                        show: false,
                        guide: true,
                        cname: "导航页"
                    },
                    beforeEnter: (to, from, next) => {
                        if (localStorage.isguide) {
                            next({ path: "/index" })
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'guide3',
                    name: 'guide3',
                    component: resolve => require(['@/components/pages/guide3'], resolve),
                    meta: {
                        show: false,
                        guide: true,
                        cname: "导航页"
                    },
                    beforeEnter: (to, from, next) => {
                        if (localStorage.isguide) {
                            next({ path: "/index" })
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'guide4',
                    name: 'guide4',
                    component: resolve => require(['@/components/pages/guide4'], resolve),
                    meta: {
                        show: false,
                        guide: true,
                        cname: "导航页"
                    },
                    beforeEnter: (to, from, next) => {
                        if (localStorage.isguide) {
                            next({ path: "/index" })
                        } else {
                            next()
                        }
                    },
                },
            ]
        },
        {
            path: '/index',
            component: resolve => require(['@/components/pages/index'], resolve),
            meta: {
                show: true,
                cname: '一级页面墨鱼',
                bar: 1
            },
            children: [{
                    path: "moyu1",
                    name: "moyu1",
                    component: resolve => require(['@/components/pages/moyu1'], resolve),
                    meta: {
                        show: true,
                        cname: '二级页面',
                        login: false,
                        bar: 1
                    }
                },
                {
                    path: "/",
                    redirect: 'moyu1',
                    bar: 1
                },
                {
                    path: "moyu2",
                    name: "moyu2",
                    component: resolve => require(['@/components/pages/moyu2'], resolve),
                    meta: {
                        show: true,
                        cname: '二级页面',
                        login: true,
                        bar: 1
                    }
                }
            ]
        },
        // {
        //     path: "/moImgDe",
        //     name: "moImgDe",
        //     component: resolve => require(['@/components/pages/moImgDe'], resolve),
        //     meta: {
        //         show: false,
        //         cname: '二级页面墨鱼详情页',
        //         login: false
        //     }
        // },
        {
            path: "/moViDe",
            name: "moViDe",
            component: resolve => require(['@/components/pages/moViDe'], resolve),
            meta: {
                show: false,
                cname: '二级页面墨鱼详情页',
                login: false
            }
        },
        {
            path: '/publish',
            name: 'publish',
            component: resolve => require(['@/components/pages/publish'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面发布页"
            }
        },
        {
            path: '/publish2',
            name: 'publish2',
            component: resolve => require(['@/components/pages/publish2'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面发布页"
            }
        },
        {
            path: '/find',
            name: 'find',
            component: resolve => require(['@/components/pages/find'], resolve),
            meta: {
                show: true,
                login: false,
                cname: "一级页面发现页",
            }

        },
        {
            path: '/search',
            name: 'search',
            component: resolve => require(['@/components/pages/search'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面搜索页"
            }
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/components/pages/register'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "一级页面注册页"
            }
        },
        {
            path: '/registerBind',
            name: 'registerBind',
            component: resolve => require(['@/components/pages/registerBind'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "一级页面绑定注册页"
            }
        },
        {
            path: '/bind',
            name: 'bind',
            component: resolve => require(['@/components/pages/bind'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面登录绑定"
            }
        },
        {
            path: '/forgetPass',
            name: 'forgetPass',
            component: resolve => require(['@/components/pages/forgetPass'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "一级页面忘记密码"
            }
        },
        {
            path: '/changePass',
            name: 'changePass',
            component: resolve => require(['@/components/pages/changePass'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面更改密码"
            }
        },
        {
            path: '/changeSign',
            name: 'changeSign',
            component: resolve => require(['@/components/pages/changeSign'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面更改签名"
            }
        },
        {
            path: '/bank',
            name: 'bank',
            component: resolve => require(['@/components/pages/bank'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面银行卡管理"
            }
        },
        {
            path: '/addBank',
            // name: 'addBank',
            component: resolve => require(['@/components/pages/addBank'], resolve),
            children: [{
                    path: '/',
                    name: 'addBank2',
                    component: resolve => require(['@/components/pages/addBank2'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: "三级页面银行卡管理"
                    }
                },
                {
                    path: 'addBank2',
                    redirect: "/addBank"
                },
                {
                    path: 'addBank3',
                    name: 'addBank3',
                    component: resolve => require(['@/components/pages/addBank3'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: "三级页面银行卡管理"
                    }
                }
            ]
        },
        {
            path: '/changeBank',
            // name: 'addBank',
            component: resolve => require(['@/components/pages/changeBank'], resolve),
            children: [{
                    path: '/',
                    name: 'changeBank2',
                    component: resolve => require(['@/components/pages/changeBank2'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: "三级页面银行卡管理"
                    }
                },
                {
                    path: 'changeBank2',
                    redirect: "/changeBank"
                },
                {
                    path: 'changeBank3',
                    name: 'changeBank3',
                    component: resolve => require(['@/components/pages/changeBank3'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: "三级页面银行卡管理"
                    }
                }
            ]
        },
        {
            path: '/publish',
            name: 'publish',
            component: resolve => require(['@/components/pages/publish'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面发布"
            }
        },
        // {
        //     path: '/map',
        //     name: 'map',
        //     component: resolve => require(['@/components/pages/map'], resolve),
        //     meta: {
        //         show: false,
        //         login: false,
        //         cname: "三级页面地图"
        //     }
        // },
        {
            path: '/map2',
            name: 'map2',
            component: resolve => require(['@/components/pages/map2'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "三级页面地图"
            }
        },
        {
            path: '/recomLine',
            name: 'recomLine',
            component: resolve => require(['@/components/pages/recomLine'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "三级页面发布推荐路线"
            }
        },
        {
            path: '/user',
            name: 'user',
            component: resolve => require(['@/components/pages/user'], resolve),
            meta: {
                show: true,
                login: true,
                cname: "一级页面个人中心",
            }
        },
        {
            path: '/ident',
            name: 'ident',
            component: resolve => require(['@/components/pages/ident'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面认证"
            }
        },
        {
            path: '/pubLishDe',
            name: 'pubLishDe',
            component: resolve => require(['@/components/pages/pubLishDe'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面发布记录"
            }
        },
        {
            path: '/getInter',
            name: 'getInter',
            component: resolve => require(['@/components/pages/getInter'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面积分介绍"
            }
        },
        {
            path: '/tips',
            name: 'tips',
            component: resolve => require(['@/components/pages/tips'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面消息"
            }
        },
        {
            path: '/tips2',
            name: 'tips2',
            component: resolve => require(['@/components/pages/tips2'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "三级页面消息"
            }
        },
        {
            path: '/syTips',
            name: 'syTips',
            component: resolve => require(['@/components/pages/systemNotes'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "三级页面系统消息"
            }
        },
        {
            path: '/set',
            name: 'set',
            component: resolve => require(['@/components/pages/set'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面设置"
            }
        },
        {
            path: '/nickName',
            name: 'nickName',
            component: resolve => require(['@/components/pages/changeNickName'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面昵称"
            }
        },
        {
            path: '/kefu',
            name: 'kefu',
            component: resolve => require(['@/components/pages/kefu'], resolve),
            meta: {
                show: true,
                login: false,
                cname: "一级页面客服",
            }
        },
        {
            path: '/integral',
            name: 'integral',
            component: resolve => require(['@/components/pages/integral'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面积分兑换"
            }
        },
        {
            path: '/integralDetail',
            name: 'integralDetail',
            component: resolve => require(['@/components/pages/integralDetail'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "三级页面积分兑换详情页"
            }
        },
        {
            path: '/seckill',
            name: 'seckill',
            component: resolve => require(['@/components/pages/seckill'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面秒杀"
            }
        },
        {
            path: '/seckillDetail',
            name: 'seckillDetail',
            component: resolve => require(['@/components/pages/seckillDetail'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面秒杀详情页"
            }
        },
        {
            path: '/payStyle',
            name: 'payStyle',
            component: resolve => require(['@/components/pages/payStyle'], resolve),
            meta: {
                show: false,
                login: true,
                cname: "二级页面付款方式"
            }
        },
        {
            path: '/info',
            name: 'info',
            component: resolve => require(['@/components/pages/info'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面资讯"
            }
        },
        {
            path: '/infoDetail',
            name: 'infoDetail',
            component: resolve => require(['@/components/pages/infoDetail'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "三级页面资讯详情页"
            }
        },
        {
            path: '/recom',
            name: 'recom',
            component: resolve => require(['@/components/pages/recom'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面推荐"
            }
        },
        {
            path: '/recomDetail',
            name: 'recomDetail',
            component: resolve => require(['@/components/pages/recomDetail'], resolve),
            meta: {
                show: false,
                login: false,
                cname: "二级页面推荐详情页"
            }
        },
        {
            path: '/order',
            name: 'order',
            component: resolve => require(['@/components/pages/order'], resolve),
            meta: {
                show: false,
                login: true,
                cname: '二级页面订单',
            }
        },
        {
            path: '/orderInte',
            name: 'orderInte',
            component: resolve => require(['@/components/pages/orderInte'], resolve),
            meta: {
                show: false,
                login: true,
                cname: '二级页面个人兑换订单更多页',
            }
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: resolve => require(['@/components/pages/myOrder'], resolve),
            meta: {
                show: false,
                login: true,
                cname: '二级页面个人订单',
            },
            children: [{
                    path: '/',
                    redirect: "all"
                },
                {
                    path: 'all',
                    name: "all",
                    component: resolve => require(['@/components/pages/myOrderall'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: '二级页面个人全部订单',
                    },
                },
                {
                    path: 'paying',
                    name: "paying",
                    component: resolve => require(['@/components/pages/myOrderpaying'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: '二级页面个人待付款订单',
                    }
                },
                {
                    path: 'traving',
                    name: "traving",
                    component: resolve => require(['@/components/pages/myOrdertraving'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: '二级页面个人待旅游订单',
                    }
                },
                {
                    path: 'evaling',
                    name: "evaling",
                    component: resolve => require(['@/components/pages/myOrderevaling'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: '二级页面个人待评价订单',
                    }
                },
                {
                    path: 'cancel',
                    name: "cancel",
                    component: resolve => require(['@/components/pages/myOrdercancel'], resolve),
                    meta: {
                        show: false,
                        login: true,
                        cname: '二级页面个人取消订单',
                    }
                }
            ]
        },
        {
            path: '/payingDetail',
            name: 'payingDetail',
            component: resolve => require(['@/components/pages/payingDetail'], resolve),
            meta: {
                show: false,
                login: true,
                cname: '二级页面个人订单详情页',
            }
        },

        // {
        //     path: '/likes',
        //     name: 'likes',
        //     component: likes
        // },
        // {
        //     path: '/aweSwiper',
        //     name: 'aweSwiper',
        //     component: aweSwiper
        // },
        // {
        //     path: '/test2',
        //     name: 'test2',
        //     component: test2
        // },
        // {
        //     path: '/logout',
        //     name: 'logout',
        //     component: logout
        // },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/pages/login'], resolve),
            meta: {
                show: false,
                login: false,
                cname: '一级登录页',
            }
        },
        // {
        //     path: '/comment',
        //     name: 'comment',
        //     component: comment
        // },
        // {
        //     path: '/shopping',
        //     name: 'shopping',
        //     component: shopping
        // },
        // {
        //     path: '/pay3',
        //     name: 'pay3',
        //     component: pay3
        // },
        // {
        //     path: '/p4',
        //     name: 'p4',
        //     component: p4
        // },
        // {
        //     path: '/popup1',
        //     name: 'popup1',
        //     component: popup1
        // },
        {
            path: '**',
            redirect: '/index'
        }
    ]
})