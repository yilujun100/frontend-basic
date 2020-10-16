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

export default withLoader