import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
                <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                </p>
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
