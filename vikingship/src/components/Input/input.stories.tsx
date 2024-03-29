import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from './input'
// const ControlledInput = () => {
//     const [value, setValue] = useState()
//     return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}}/>
// }
const defaultInput = () => (
    <div>
        <Input
            style={{width: '420px'}}
            placeholder="漂亮的 Input"
            onChange={action('changed')}
        />
        {/* <ControlledInput /> */}
    </div>
)
const disabledInput = () => (
    <Input
        style={{width: '420px'}}
        placeholder="disabled input"
        disabled
    />
)

const iconInput = () => (
    <Input
        style={{width: '420px'}}
        placeholder="input with icon"
        icon="search"
    />
)

const sizeInput = () => (
    <div>
        <Input
            style={{ width: '420px' }}
            defaultValue="large size"
            size="lg"
        />
        <Input
            style={{ width: '420px' }}
            placeholder="small size"
            size="sm"
        />
    </div>
)

const pandInput = () => (
    <div>
        <Input
            style={{ width: '420px' }}
            defaultValue="prepend text"
            prepend="https://"
        />
        <Input
            style={{ width: '420px' }}
            defaultValue="google"
            append=".com"
        />
    </div>
)


storiesOf('Input', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)
