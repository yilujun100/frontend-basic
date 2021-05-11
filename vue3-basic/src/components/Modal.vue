<template>
    <teleport to="#modal">
        <div id="center" v-if="isOpen">
            <h2><slot>this is a modal</slot></h2>
            <button @click="buttonClick">Close</button>
        </div>
    </teleport>
</template>

<script lang="ts">
/**
 * teleport: 传送门
 * 我们使用组件来表示一切界面中发生的逻辑，不过有一些特例处理起来比较麻烦，比如在某个组件渲染的时候，在某种条件下需要显示一个全局的会话框（Dialog）或者是Modal组件
 * 实现上面我们可能会这样：顶层组件（挂载在顶层DOM节点） ——> 各种子组件 ——> Dialog组件
 * 遇到的问题：
 * Dialog被包裹在其他组件之中，容易被干扰
 * 样式也在其他组件中，容易变得非常混乱
 * 我们既希望在组件中可以选择使用Dialog，Dialog像普通组件一样，但是又希望Dialog内容显示在另外一个地方（顶层另外一个DOM节点）
 * 这样在结构上Dialog就不属于其他组件的一个子组件了，这样就不会互相干扰了。这个时候我们就需要使用teleport
 * teleport就是建立一个传送门，teleport包裹的组件在表现层和其他组件没有任何差异，但是渲染的东西却像经过一个传送门一样出现在另外一个地方
 */
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Modal',
    props: {
        isOpen: Boolean
    },
    emits: { // emits可以更明确的显示自定义事件有哪些
        'close-modal': null
    },
    setup(props, context) {
        const buttonClick = () => {
            context.emit('close-modal')
        }
        return {
            buttonClick
        }
    }
})
</script>

<style>
    #center {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -100px;
        width: 200px;
        height: 200px;
        border: 2px solid black;
        background: #fff;
    }
</style>