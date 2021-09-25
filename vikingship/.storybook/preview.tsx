import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas)
// 引入样式文件
import '../src/styles/index.scss';
// fix info style
import './fix_info_style.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
const wrapperStyle: React.CSSProperties = {
    padding: "20px 40px",
    // width: "500px",
}
// 定义内容居中的组件
const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)
// 添加全局修饰器
addDecorator(storyWrapper)
// 添加显示组件信息
addDecorator(withInfo)
// 添加配置
addParameters({
    info: {
        inline: true, // 直接显示信息，不需要点击图标
        header: false // 不显示头部，比较好看
    }
})
const loaderFn = () => {
    const allExports = [require('../src/welcome.stories.tsx')];
    const req = require.context('../src/components', true, /\.stories\.tsx$/);
    req.keys().forEach(fname => allExports.push(req(fname)));
    return allExports;
};
// automatically import all files ending in *.stories.js
configure(loaderFn, module);