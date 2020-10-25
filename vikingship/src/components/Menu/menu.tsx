import React, { FC, createContext, useState, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical' // 字符串字面量类型
type SelectCallback =  (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?: string;      // 默认 active 的菜单项的索引值
    className?: string;         // 自定义class
    mode?: MenuMode;            // 菜单类型 横向或者纵向
    style?: CSSProperties;
    onSelect?: SelectCallback;  // 点击菜单项触发的回调函数
    defaultOpenSubMenus?: string[]; // 设置子菜单的默认展开，只在纵向模式下生效
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback,
    mode?: MenuMode,
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: FC<MenuProps> = props => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
    const [ currentActive, setActive ] = useState(defaultIndex)
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu