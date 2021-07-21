import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: "arrow-down", theme: "primary", size: "10x" }),
            React.createElement(Menu, { defaultIndex: "0", onSelect: function (index) { return alert(index); }, mode: "vertical", defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link 2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "dropdown 1"),
                    React.createElement(MenuItem, null, "dropdown 2")),
                React.createElement(MenuItem, null, "cool link 3")),
            React.createElement(Button, { onClick: function (e) { e.preventDefault(); alert(123); } }, "Hello"),
            React.createElement(Button, { disabled: true }, "Disabled Button"),
            React.createElement(Button, { btnType: "primary", size: "lg" }, "Hello"),
            React.createElement(Button, { btnType: "danger", size: "sm" }, "Hello"),
            React.createElement(Button, { btnType: "link", href: "http://baidu.com" }, "Baidu Link"),
            React.createElement(Button, { btnType: "link", href: "http://baidu.com", disabled: true }, "Baidu Link"),
            React.createElement(Button, { size: "lg", onClick: function () { setShow(!show); } }, "Toggle"),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left" },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."))),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left", wrapper: true },
                React.createElement(Button, { btnType: "primary", size: "lg" }, "A Large Button")),
            React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
}
export default App;
