import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
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
				<Button btnType="primary" size="lg">Hello</Button>
				<Button btnType="danger" size="sm">Hello</Button>
				<Button btnType="link" href="http://baidu.com">Baidu Link</Button>
				<Button btnType="link" href="http://baidu.com" disabled>Baidu Link</Button>
                <Button size="lg" onClick={() => {setShow(!show)}}>Toggle</Button>
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
					<Button btnType="primary" size="lg">A Large Button</Button>
				</Transition>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
