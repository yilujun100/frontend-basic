import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 必选参数, 上传的地址 */
    action: string;
    /** 上传的文件列表 */
    defaultFileList?: UploadFile[];
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
     * @param file
     */
    onBeforeUpload?: (file: File) => boolean | Promise<File>;
    /** 文件上传时的钩子 */
    onProgress?: (percentage: number, file: File) => void;
    /** 文件上传成功时的钩子 */
    onSuccess?: (data: any, file: File) => void;
    /** 文件上传失败时的钩子 */
    onError?: (err: any, file: File) => void;
    /** 文件状态改变时的钩子，上传成功或者失败时都会被调用 */
    onChange?: (file: File) => void;
    /** 文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /** 设置上传的请求头部 */
    headers?: {[key: string]: any};
    /** 上传的文件字段名 */
    name?: string;
    /** 上传时附带的额外参数 */
    data?: {[key: string]: any};
    /** 支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /** 可选参数, 接受上传的文件类型 */
    accept?: string;
    /** 是否支持多选文件 */
    multiple?: boolean;
    /** 是否支持拖拽上传 */
    drag?: boolean;
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'vikingship-ui'
 * ~~~
 */
export const Upload: FC<UploadProps> = props => {
    const {
        action,
        defaultFileList,
        onBeforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!onBeforeUpload) {
                post(file)
            } else {
                const result = onBeforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + '_upload_file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList]) // 这个方式返回是空的
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            // 上传进度计算
            onUploadProgress: e => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            updateFileList(_file, { status: 'success', response: res.data })
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    return (
        <div
            className="viking-upload-component"
        >
            <div
                className="viking-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                {drag ?
                    <Dragger onFile={files => {uploadFiles(files)}}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="viking-file-input"
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    // name: 'file'
}
export default Upload;