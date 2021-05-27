import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App: React.FC = () => {
    const [title, setTitle] = useState('')
    const postData = {
        title: 'my title',
        body: 'hello man'
    }
    useEffect(() => {
        // get 请求
        /* axios.get('https://jsonplaceholder.typicode.com/posts/1', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        })
            .then(res => {
                setTitle(res.data.title)
            }) */
        // post 请求
        axios.post('https://jsonplaceholder.typicode.com/posts', postData)
            .then(res => {
                setTitle(res.data.title)
            })
    })
    return (
        <div className="App">
            <header className="App-header">
                <h1>{title}</h1>
            </header>
        </div>
    )
}

export default App
