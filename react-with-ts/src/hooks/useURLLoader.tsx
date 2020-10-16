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