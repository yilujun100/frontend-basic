import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { ButtonSize, ButtonType } from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    <>
        <Button size={ButtonSize.Large}>large button</Button>
        <Button size={ButtonSize.Small}>small button</Button>
    </>
)

const buttonWithType = () => (
    <>
        <Button btnType={ButtonType.Primary}>primary button</Button>
        <Button btnType={ButtonType.Danger}>danger button</Button>
        <Button btnType={ButtonType.Link} href="https://google.com">link button</Button>
    </>
)
storiesOf('Button Component', module)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)
