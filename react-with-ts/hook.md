### 什么是 React Hook（Hook是一个特殊的函数，可以让你勾入React特性）

Hook 是React 16.8新增的一个特性，如果你的应用使用的是老版本，需要将React升级到16.8版本

React16.8带来的全新特性，即将替代class组件的写法

我们知道React有两种组件：class组件和function组件

```jsx
// class component
import React from 'react'
import PropTypes from 'prop-types'

class Hello extends React.Component {
    render() {
        const { greeting, firstName } = this.props
        return (
        	<div>
            	{greeting} {firstName}
            </div>
        )
    }
}
export default Hello

// function component
import React from 'react'
import PropTypes from 'prop-types'

function Hello({ greeting, firstName }) {
    return (
    	<div>
        	{greeting} {firstName}
        </div>
    )
}
export default Hello
```

函数型组件在使用上存在一定的局限，在函数型组件内部不能使用state和生命周期的一些钩子函数，那么hooks的推出就是为了打破这个壁垒，使用函数型组件代替class组件的一种写法

那么我们写的class组件是不是以后就不能使用了，我们写的那些class组件是不是都要重写

**没有破坏性改动**

* 完全可选

  你无需重写任何已有代码就可以在一些组件中尝试hook

* 百分之百向后兼容

  class写法完全可用

* 没有计划从 React 移除 class

最重要的是，hook 和现在代码可以同时工作，我们可以渐进式地使用它们，所谓渐进式，就是避免任何大规模的重写，尤其是对于已有的复杂的class组件，我们最好是先在新的不复杂的组件中尝试使用hook。hook不会影响你对React概念的理解，恰恰相反，hook 为已知的 React 概念提供了更直接的 API，比如说 props、state、context、refs、生命周期

### 为什么要使用React Hook

Hook的推出是为了解决我们开发中的一些痛点：

* 组件很难复用状态逻辑

  比如我们有两个组件NewList.js(新闻列表)、UserList.js(用户列表)，在componentDidMount中发送ajax请求，请求成功之后渲染页面，它们的逻辑几乎是相同的，只不过数据源和展示的方法不太一样，一个是列表形式，一个是头像圆圈形式，在没有使用hook时，我们可以使用 HOC 或者时 render Props 来完成这件事件，这两种方法都有一个弊端就是本来我们是一个状态的逻辑，跟界面没有任何关系，但它呢必须嵌套在界面上，HOC会返回一些空的节点，这样会让组件多出很多看起来没用的节点，这样极难理解又耗费性能。你可以使用 hook 从组件中提取一个状态逻辑，而且这些状态逻辑里面是可以单独测试并且复用，hook 使你在无需修改组件结构的情况下完成复用，这使得组件间或社区内共享 hook 变得更便捷

* 复杂组件难以理解，尤其是生命周期函数

  我们知道，组件起初都很简单，但是逐渐就会被各种逻辑和副作用所充斥，每个生命周期常常包含一些不相关的逻辑，比如下面的例子，当一个组件的属性发生变化的时候，重新去取数据，这个时候我们需要在 componentDidMount 和 componentDidUpdate 中都写几乎相同的逻辑来获取数据，同时在 componentDidMount 中我们又有一些其他的逻辑需要处理（比如设置keypress事件监听），我需要在 componentWillUnmount 中将事件清除掉，相关联的代码没法拆分，完全不相关的代码却在同一个方法中组合在一起，这非常容易产生bug并且导致逻辑不一致，为了解决这个问题，hook 将组件中相互关联的部分拆分成更小的函数，比如我们可以把获取数据做成一个 hook，另外一个添加事件做成一个 hook，而并非强制按照生命周期去划分
  
  ```jsx
  componentDidMount() {
      const { id } = this.props
      fetch(`xxx?id=${id}`)
      document.addEventListener('keypress', callback)
  }
  componentDidUpdate() {
      const { id } = this.props
      fetch(`xxx?id=${id}`)
  }
  componentWillUnmount() {
      document.removeEventListener('keypress', callback)
  }
  ```
  
  
  
* React 组件一直是函数，使用 Hook 完全拥抱函数

  除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大障碍，你必须去理解 JavaScript 中 this 的工作方式，不能忘记绑定事件处理器并且它没有稳定的语法提案，这些代码会非常的冗余，为了解决这些问题，hook 使你在非class情况下也可以使用更多的 React 特性，从概念上来讲，React 组件一直更像是函数，而 hook 则拥抱了函数，同时也没有牺牲 React 精神原则，hook 提供了问题解决的方案，无需学习复杂的函数式或者是响应式的编程技术

### useState

```jsx
// LikeButton.tsx 点赞功能
import React, { useState } from 'react'
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    return (
        <>
            <button onClick={() => setLike(like + 1)}> {/* 这里更新状态总是替换它而不是合并它，所以要全部带上 */}
                {like} 👍
            </button>
            <button onClick={() => setOn(!on)}>
                {on ? 'ON' : 'OFF'}
            </button>
        </>
    )
}
export default LikeButton
```

### useEffect

之前我们提过一个概念，就是纯函数，那么什么是纯函数？

纯函数就是输入确定的情况下，那么输出就一定确定，这点和我们的组件总是不谋而合，但是在网络的世界里，整个应用不仅仅全部都是确定的界面，而是有很多其他的内容，比如网络请求、dom操作、订阅数据来源等等，它们做的是和纯函数界面渲染不相关的事情，那么我们就称之为这个函数的副作用。在 React 中有两种常见的副作用：一种是无需清除的 Effect , 另一种是需要清除的 Effect

* 无需清除的 Effect

  我们只想在React 更新 DOM之后运行一些额外的代码，比如说发送一个网络请求、手动变更DOM、记录日志，这些都是常见的无需清除的操作，因为我们在执行完操作之后就可以完全忽略掉它们

  ```jsx
  // 使用 useEffect 使用 DOM 完成标题更新
  // class 组件，我们需要在componentDidMount和componentDidUpdate两个生命周期方法中添加重复的代码，这是因为很多情况下，我们希望组件加载和更新执行同样的操作，在概念上说，我们希望它在每次渲染之后执行，但class组件没有提供这样的方法，即使我们提取出一个地方，我们还是需要在两个地方调用
  componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
  }
  
  componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
  }
  
  // useEffect会在每次渲染之后执行，默认情况下，它在第一次渲染和每次渲染之后都执行，这样很符合我们的思考模式，不会考虑到底是挂载还是更新
  import React, { useState, useEffect } from 'react'
  const LikeButton: React.FC = () => {
      const [like, setLike] = useState(0)
      const [on, setOn] = useState(true)
      useEffect(() => {
          document.title = `点击了${like}次`
      })
      return (
          <>
              <button onClick={() => setLike(like + 1)}> {/* 这里更新状态总是替换它而不是合并它，所以要全部带上 */}
                  {like} 👍
              </button>
              <button onClick={() => setOn(!on)}>
                  {on ? 'ON' : 'OFF'}
              </button>
          </>
      )
  }
  export default LikeButton
  ```

* 需要清除的 Effect

  有一些 Effect 是需要清除的，例如添加DOM事件等等，这种情况下清除工作是非常重要的，可以防止引起内存泄漏

  ```jsx
  // 使用 useEffect 完成一个鼠标跟踪器
  // 在 class 中的实现
  componentDidMount() {
      document.addEventListener('click', this.updateMouse)
  }
  componentWillUnmount() {
      document.removeEvenetListener('click', this.updateMouse)
  }
  ```

  ```jsx
  import React, { useState, useEffect } from 'react'
  
  const MouseTracker: React.FC = () => {
      const [positions, setPositions] = useState({ x: 0, y: 0 })
      useEffect(() => {
          console.log('add effect', positions.x)
          const updateMouse = (e: MouseEvent) => {
              console.log('inner')
              setPositions({ x: e.clientX, y: e.clientY })
          }
          document.addEventListener('click', updateMouse)
          return () => {
              console.log('remove effect', positions.x)
              document.removeEventListener('click', updateMouse)
          }
      })
      console.log('before render', positions.x)
      return (
          <p>X: {positions.x}, Y: {positions.y}</p>
      )
  }
  
  export default MouseTracker
  ```

### 自定义hook重构MouseTracker

hook 最吸引人的一个特性是它可以将组件逻辑提取到可重用的函数中，目前为止，在 React 中，有两种流行的方式来共享组件之间的状态逻辑，render props 和 HOC

```jsx
// 使用自定义hook-重构MouseTracker
// 注意：
// 1.自定义hook名称必须以use开头
import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('add effect', positions.x)
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            console.log('remove effect', positions.x)
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    return positions
}

export default useMousePosition
```

### HOC

在异步请求中，最常用的一个需求是显示隐藏loading的状态，发送请求的时候显示loading的图标或文字，加载完毕之后隐藏掉。假如我们一直有类似的需求，那么重复的逻辑我们就需要提取出来。

在没有hook出现之前，我们看看HOC是如何完成的

HOC(Higher order component)

高阶组件HOC是React中对组件进行逻辑重用的一种高级技术，但高阶组件本身并不是React API，它只是一种模式，这种模式是由React自生的组合性质产生的。

高阶组件就是一个函数，接受一个组件作为参数，返回一个新的组件

```jsx
// higher order component
// HOC存在的一些弊端：
// 1.要不断地添加界面结构，loading的显示隐藏，它是一段逻辑代码，但是现在我们必须给它添加节点
// 2.难以理解
// 3.数据源难以追踪，被包裹的组件DogShow中的data，不知道它是从哪来的，是干什么的，我们必须去研究包裹它的高阶组件才可以
import React from 'react'
import axios from 'axios'

interface ILoaderState {
    data: any,
    isLoading: boolean
}
interface ILoaderProps {
    data: any
}
const withLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
    return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
        constructor(props: any) {
            super(props)
            this.state = {
                data: null,
                isLoading: false
            }
        }
        componentDidMount() {
            this.setState({
                isLoading: true
            })
            axios.get(url).then(result => {
                this.setState({
                    data: result.data,
                    isLoading: false
                })
            })
        }
        render() {
            const { data, isLoading } = this.state
            return (
                <>
                    { (isLoading || !data) ? <p>data is loading</p> :
                        <WrappedComponent {...this.props as P} data={data} />
                    }
                </>
            )
        }
    }
}
```

```jsx
// App.tsx
interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC<{data: IShowResult}> = ({ data }) => {
  return (
    <>
      <h2>Dog show: {data.status}</h2>
      <img src={data.message} />
    </>
  )
}

function App() {
    const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
    return (
    	<div className="App">
            <WrappedDogShow />
    	</div>
  	);
}
export default App;
```

使用hook来实现

```jsx
// 我们可以把一些重复的代码提取到hook中，像调用函数一样调用，它的结果也非常的明晰，我们看它到底在干什么，然后我们就可以使用它的返回结果做我们想完成的事情，而且非常利于理解
import { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(url).then(result => {
            setData(result.data)
            setLoading(false)
        })
    }, deps)
    return [data, loading]
}

export default useURLLoader
```



### useRef

在组件中的任意一次渲染，props和state都始终保持不变，也就是说每次渲染它们都是相对独立的，那么怎样在几次渲染之间产生关系，这个时候我们就需要使用useRef