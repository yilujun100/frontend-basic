import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'
// const defaultFileList: UploadFile[] = [
//     { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
//     { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
//     { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
// ]

// 上传前检测文件大小  直接返回布尔值
const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false
    }
    return true
}

// 上传前 改变文件名 返回 promise
// const filePromise = (file: File) => {
//     const newFile = new File([file], 'new_name.docx', { type: file.type })
//     return Promise.resolve(newFile)
// }

const SimpleUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            name="file"
            onChange={action('changed')}
            onProgress={action('progress')}
            onRemove={action('removed')}
            onSuccess={action('success')}
        >
            <Button
                btnType="primary"
                disabled={false}
                size="sm"
            >
                <Icon icon="upload" />
                <span style={{marginLeft: '8px'}}>Click to Upload</span>
            </Button>
        </Upload>
    )
}

const checkFileSizeUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={action('changed')}
            onBeforeUpload={checkFileSize}
        >
            <Button
                btnType="primary"
                disabled={false}
                size="sm"
            >
                <Icon icon="upload" />
                <span style={{marginLeft: '8px'}}>不能传大于50Kb!</span>
            </Button>
        </Upload>
    )
}

const dragUpload = () => {
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            drag
            multiple
            name="filename"
            onChange={action('changed')}
            onRemove={action('removed')}
        >
            <Icon icon="upload" size="4x" theme="secondary" />
            <br/>
            <p>
                点击或者拖动到此区域进行上传
            </p>
        </Upload>
    )
}

storiesOf('Upload', module)
    .add('Upload', SimpleUpload)
    .add('上传前检查文件大小', checkFileSizeUpload)
    .add('拖动上传', dragUpload)