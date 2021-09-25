import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
    .add('welcome', () => {
        return (
            <>
                <h1>欢迎来到 vikingship-ui 组件库</h1>
                <h2>使用 React + TypesScript 从零到一打造一套UI组件库</h2>
                <h3>安装试试</h3>
                <code>
                npm install vikingship-ui --save
                </code>
            </>
        )
  }, { info : { disable: true }})