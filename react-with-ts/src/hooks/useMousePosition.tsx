// 使用自定义hook-重构MouseTracker
// 注意：
// 1.自定义hook名称必须以use开头(不遵循的话，无法判断某个函数是否包含对其内部的hook调用)
// 2.两个组件中使用相同的hook不会共享state(每次使用自定义hook的时候，其中所有state的effect都是完全隔离的)
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