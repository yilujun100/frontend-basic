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
            // 清除组件的Effect
            console.log('remove effect', positions.x)
            document.removeEventListener('click', updateMouse)
        }
    }, []) // 控制 useEffect 执行
    // 现在每次渲染都会执行相关的useEffect，这种做法可能会导致相关的性能问题，这是一种很常见的需求，所以它被内置到了useEffect API中，如果某些特定值在两次重复渲染之间没有发生变化，
    // 你可以通知React跳过对useEffect的调用，这时我们可以传递第二个参数：依赖项
    // 如果我们指向useEffect执行一次，那么我们可以在useEffect第二个参数中传入一个空数组，表示不依赖props或state中的任意值，所以它永远都不会重复执行
    console.log('before render', positions.x)
    return (
        <p>X: {positions.x}, Y: {positions.y}</p>
    )
}

export default MouseTracker