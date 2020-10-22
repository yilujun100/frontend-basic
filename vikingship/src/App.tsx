import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
