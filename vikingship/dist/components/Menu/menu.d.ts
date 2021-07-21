import React, { FC, CSSProperties } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    /**自定义class */
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: CSSProperties;
    /**点击菜单项触发的回调函数 */
    onSelect?: SelectCallback;
    /**设置子菜单的默认展开，只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'vikingship'
 * ~~~
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
