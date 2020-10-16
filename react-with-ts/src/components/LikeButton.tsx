import React, { useState, useEffect, useRef, useContext } from 'react'
import useMousePosition from './../hooks/useMousePosition'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
    // const [like, setLike] = useState(0)
    // return (
    //     <button onClick={() => setLike(like + 1)}>
    //         {like} 👍
    //     </button>
    // )

    // 添加一个开关状态
    // const [obj, setObj] = useState({ like: 0, on: true })
    // return (
    //     <>
    //     <button onClick={() => setObj({ like: obj.like + 1, on: obj.on })}> {/* 这里更新状态总是替换它而不是合并它，所以要全部带上 */}
    //         {obj.like} 👍
    //     </button>
    //     <button onClick={() => setObj({ like: obj.like, on: !obj.on })}>
    //         {obj.on ? 'ON' : 'OFF'}
    //     </button>
    //     </>
    // )

    // 将多个state拆分
    // 把单独的state拆开还有一个好处，在后期把一些相关的逻辑抽取到一个自定义hook变得更加容易
    // 把所有的state放在同一个useState中调用或者把每个字段对应一个单独的useState调用两种方式
    // 把相关state组合到独立的变量，组件就会变得更加可读
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    const likeRef = useRef(0)
    const didMountRef = useRef(false)
    const domRef = useRef<HTMLInputElement>(null)
    // const positions = useMousePosition()
    const theme = useContext(ThemeContext)
    console.log(theme)
    const style = {
        background: theme.background,
        color: theme.color
    }
    useEffect(() => {
        console.log('document title effect is running')
        document.title = `点击了${like}次`
    }, [like, on])
    useEffect(() => {
        if (didMountRef.current) {
            console.log('this is updated')
        } else {
            didMountRef.current = true
        }
    })
    useEffect(() => {
        if (domRef && domRef.current) {
            domRef.current.focus()
        }
    })
    function handleAlertClick() {
        setTimeout(() => {
            alert('you clicked on ' + likeRef.current)
        }, 3000)
    }
    return (
        <>
            {/* <h2>X: {positions.x}, Y: {positions.y}</h2> */}
            <input type="text" ref={domRef} />
            <button style={style} onClick={() => {setLike(like + 1); likeRef.current++}}> {/* 这里更新状态总是替换它而不是合并它，所以要全部带上 */}
                {like} 👍
            </button>
            {/* <button onClick={() => setOn(!on)}>
                {on ? 'ON' : 'OFF'}
            </button> */}
            <button onClick={handleAlertClick}>
                Alert!
            </button>
        </>
    )
}
export default LikeButton