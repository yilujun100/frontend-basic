import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

const verticalMenu = () => (
    <Menu defaultIndex='0' mode="vertical" onSelect={(index) => {action(`clicked ${index} item`)}} >
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem>
            cool link 2
        </MenuItem>
        <SubMenu title="点击下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

const defaultOpenSubMenu = () => (
    <Menu defaultIndex='0' defaultOpenSubMenus={['2']} mode="vertical" onSelect={(index) => {action(`clicked ${index} item`)}} >
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem>
            cool link 2
        </MenuItem>
        <SubMenu title="默认展开下拉选项">
            <MenuItem>
                下拉选项一
            </MenuItem>
            <MenuItem>
                下拉选项二
            </MenuItem>
        </SubMenu>
    </Menu>
)

storiesOf('Menu', module)
    .add('Menu', defaultMenu)
    .add('纵向的 Menu', verticalMenu)
    .add('默认展开的纵向 Menu', defaultOpenSubMenu)