<!--
    异步请求的困境：
    在web中，有非常多的异步请求，在发起异步请求时，我们往往需要判断这些请求的状态，然后根据这些请求是否完毕展示不同的界面
    在vue3中新推出了一个内置组件Suspense,它是一个特殊组件，会有两个template slot,刚开始会渲染fallback内容，直到达到某个条件以后才会渲染正式的内容
    如果使用Suspense,在setup函数中需要返回一个promise
    Suspense可以非常方便的为我们针对异步请求的页面进行个性化定制
-->
<template>
    <h1>{{result}}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return new Promise(resolve => {
            setTimeout(() => {
                return resolve({
                    result: 42
                })
            }, 3000)
        })
    }
})
</script>
<style scoped>
</style>