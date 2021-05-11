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
        <h1>X: {{x}}, Y: {{y}}</h1>
        <button @click="openModal">Open Modal</button><br/>
        <modal :isOpen="modalIsOpen" @close-modal="onModalClose">My modal !!!</modal>
        <h1 v-if="loading">Loading...</h1>
        <!-- dog result -->
        <!-- <img v-if="loaded" :src="result.message" alt=""> -->
        <!-- cat result -->
        <img v-if="loaded" :src="result[0].url" alt="">
        <button @click="increase">+1</button><br/>
        <button @click="updateGreetings">Update Title</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, toRefs, onMounted, onUnmounted, onUpdated, onRenderTriggered, watch } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import Modal from './components/Modal.vue'
interface DataProps {
    count: number;
    double: number;
    increase: () => void;
    // numbers: number[];
    // person: { name?: string };
}
interface DogResult {
    message: string;
    status: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}

export default defineComponent({
  name: 'App',
  components: {
      Modal
  },
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
    const greetings = ref('')
    const updateGreetings = () => {
        greetings.value += 'Hello! '
    }
    // 侦测变化(监控响应式数据的变化，并处理副作用一系列逻辑)
    watch([greetings, () => data.count], (newValue, oldValue) => {
        console.log('newVal: ', newValue)
        console.log('oldVal: ', oldValue)
        document.title = 'updated' + greetings.value + data.count
    })
    // 相比mixin优点：
    // 1.很清楚x,y来源
    // 2.可以给x,y设置别名，这样就避免了命名冲突的风险
    // 3.这部分逻辑可以脱离组件存在, 实现逻辑的复用
    const { x, y } = useMousePosition()
    // const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
        if (result.value) {
            // console.log('value', result.value.message)
            console.log('value', result.value[0].url)
        }
    })
    const refData = toRefs(data)
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }

    return {
        ...refData,
        greetings,
        updateGreetings,
        x,
        y,
        result,
        loading,
        loaded,
        modalIsOpen,
        openModal,
        onModalClose
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
