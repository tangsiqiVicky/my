<template>
    <div>
        <div id="demo">
            <button v-on:click="show = !show">
                    Toggle
                </button>
            <transition name="fade">
                <p v-if="show">hello</p>
            </transition>
        </div>
        <div class="demo2">
            <transition name="fade2" @click="ff">
                <p v-if="show">world</p>
            </transition>
        </div>
        <div class="demo3">
            <transition name="fade3">
                <p v-if="show">worldsaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
            </transition>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated rotateInDownRight" leave-active-class="animated swing">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            ff() {
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: .5s;
    }
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        color: aqua;
    }
    .fade-enter-to,
    .fade-leave {
        color: brown;
    }
    .fade2-enter-active {
        transition: all 0.5s ease;
    }
    .fade2-leave-active {
        transition: all 1s ease;
    }
    .fade2-enter,
    .fade2-leave-to {
        /* opacity: 0; */
        transform: translateX(10px)
    }
    .fade3-enter-active {
        animation: scal 1s ease;
    }
    .fade3-leave-active {
        animation: scal 2s ease reverse;
    }
    @keyframes scal {
        0% {
            transform: scale(0)
        }
        50% {
            transform: scale(1.5)
        }
        100% {
            transform: scale(1)
        }
    }
</style>