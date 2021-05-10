<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <h1>{{count}}</h1>
        <h1>{{double}}</h1>
        <button @click="increase">+1</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs } from 'vue'
interface DataProps {
    count: number;
    double: number;
    increase: () => void;
}

export default defineComponent({
  name: 'App',
  setup() { // setup方法是在data、props、computed、methods以及声明周期函数之前运行
    // const count = ref(0) // ref 返回一个响应式对象
    // const double = computed(() => count.value * 2)
    // const increase = () => {
    //     count.value++
    // }
    const data: DataProps = reactive({
        count: 0,
        increase: () => { data.count++ },
        double: computed(() => data.count * 2)
    })
    const refData = toRefs(data)

    return {
        ...refData
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
