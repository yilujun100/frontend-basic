import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { addDecorator, addParameters } from '@storybook/react'
// 引入样式文件
import '../src/styles/index.scss';
// fix info style
import './fix_info_style.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
const wrapperStyle: React.CSSProperties = {
    padding: "20px 40px",
    width: "500px",
}
const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
    info: {
        inline: true,
        header: false,
    }
})