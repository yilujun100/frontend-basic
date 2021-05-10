<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <h1>{{count}}</h1>
        <h1>{{double}}</h1>
        <!-- <ul>
            <li v-for="number in numbers" :key="number"><h1>{{number}}</h1></li>
        </ul>
        <h1>{{person.name}}</h1> -->
        <h1>{{greetings}}</h1>
        <button @click="increase">+1</button><br/>
        <button @click="updateGreetings">Update Title</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs, onMounted, onUnmounted, onUpdated, onRenderTriggered, watch } from 'vue'
interface DataProps {
    count: number;
    double: number;
    increase: () => void;
    // numbers: number[];
    // person: { name?: string };
}

export default defineComponent({
  name: 'App',
  setup() { // setup方法是在data、props、computed、methods以及声明周期函数之前运行
    // const count = ref(0) // ref 返回一个响应式对象
    // const double = computed(() => count.value * 2)
    // const increase = () => {
    //     count.value++
    // }
    /* onMounted(() => {
        console.log('mounted')
    })
    onUpdated(() => {
        console.log('updated')
    })
    onRenderTriggered(event => {
        console.log(event)
    }) */
    const data: DataProps = reactive({
        count: 0,
        increase: () => { data.count++ },
        double: computed(() => data.count * 2),
        // numbers: [0, 1, 2],
        // person: {}
    })
    // data.numbers[0] = 5
    // data.person.name = 'yilujun100'
    // 侦测变化(监控响应式数据的变化，并处理副作用一系列逻辑)
    const greetings = ref('')
    const updateGreetings = () => {
        greetings.value += 'Hello! '
    }
    watch([greetings, () => data.count], (newValue, oldValue) => {
        console.log('newVal: ', newValue)
        console.log('oldVal: ', oldValue)
        document.title = 'updated' + greetings.value + data.count
    })
    const refData = toRefs(data)

    return {
        ...refData,
        greetings,
        updateGreetings
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
