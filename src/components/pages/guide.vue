<template>
    <div ref="guide">
        <!-- vue-touch提供的滑动事件指令，可以参考vue-touch文档 -->
        <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
            <router-view></router-view>
        </v-touch>
        <!-- 页面底部的圆点导航 -->
        <ul class="circle-nav">
            <li :class="{'nav-current':$route.name==='guide1'||$route.name==='guide'}"></li>
            <li :class="{'nav-current':$route.name==='guide2'}"></li>
            <li :class="{'nav-current':$route.name==='guide3'}"></li>
            <li :class="{'nav-current':$route.name==='guide4'}"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        mounted() {
            var heig = document.documentElement.getBoundingClientRect().height
            // console.log(heig)
            this.$nextTick(res => this.$refs.guide.style.height = `${heig}px`)
        },
        methods: {
            onSwipeLeft() {
                switch (this.$route.name) {
                    case "guide":
                    case "guide1":
                        this.$router.push({
                            name: "guide2"
                        })
                        break
                    case "guide2":
                        this.$router.push({
                            name: "guide3"
                        })
                        break
                    case "guide3":
                        this.$router.push({
                            name: "guide4"
                        })
                        break
                    case "guide4":
                        localStorage.setItem("isguide", "yes")
                        this.$router.push({
                            name: "moyu1"
                        })
                        break
                }
            },
            onSwipeRight() {
                switch (this.$route.name) {
                    case "guide":
                    case "guide1":
                        this.$toast({
                            message: '不能左滑啦',
                            duration: 1200
                        });
                        break
                    case "guide2":
                        this.$router.back()
                        break
                    case "guide3":
                        this.$router.back()
                        break
                    case "guide4":
                        this.$router.back()
                        break
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .circle-nav {
        position: fixed;
        bottom: 10px;
        width: 100%;
        max-width: inherit;
        text-align: center;
        padding: 0;
        opacity: 0.75;
        li {
            display: inline-block;
            width: 7px;
            height: 7px;
            border: 1px solid black;
            background-color: white;
            border-radius: 50%;
            margin: 5px;
           
        }
         .nav-current {
                background-color: rgba(0,0,0,0.5);
            }
    }
</style>