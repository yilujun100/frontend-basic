import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
library.add(fas)

function App() {
    const [show, setShow] = useState(false)
    return (
        <div className="App">
            <header className="App-header">
                <Icon icon="arrow-down" theme="primary" size="10x" />
                <Menu defaultIndex="0" onSelect={index => alert(index)} mode="vertical" defaultOpenSubMenus={['2']}>
					<MenuItem>cool link</MenuItem>
					<MenuItem disabled>cool link 2</MenuItem>
					<SubMenu title="dropdown">
						<MenuItem>dropdown 1</MenuItem>
						<MenuItem>dropdown 2</MenuItem>
					</SubMenu>
					<MenuItem>cool link 3</MenuItem>
				</Menu>
				<Button onClick={(e) => {e.preventDefault(); alert(123);}}>Hello</Button>
				<Button disabled>Disabled Button</Button>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
				<Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello</Button>
				<Button btnType={ButtonType.Link} href="http://baidu.com">Baidu Link</Button>
				<Button btnType={ButtonType.Link} href="http://baidu.com" disabled>Baidu Link</Button>
                <Button size={ButtonSize.Large} onClick={() => {setShow(!show)}}>Toggle</Button>
				<Transition
					in={show}
					timeout={300}
					animation="zoom-in-left"
				>
					<div>
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
					</div>
				</Transition>
				<Transition
					in={show}
					timeout={300}
					animation="zoom-in-left"
					wrapper
				>
					<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>A Large Button</Button>
				</Transition>
            </header>
        </div>
    )
}

export default App
