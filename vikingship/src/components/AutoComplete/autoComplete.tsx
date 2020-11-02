/**
 * AutoComponent 自动补全
 * 支持自定义模板
 * 支持异步请求
 * 支持键盘事件
 */

import React, { FC, useState, ChangeEvent, ReactElement  } from 'react'
import Input, { InputProps } from './../Input/input'
import Icon from './../Icon/icon'

interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } =  props
    const [ inputValue, setInputValue ] = useState(value)
    const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
    const [ loading, setLoading ] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestions(value)
            if (results instanceof Promise) {
                console.log('triggered')
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
    }
    console.log(suggestions)
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDroopDown = () => {
        return (
            <ul>
                {
                    suggestions.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                    ))
                }
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            />
            { loading && <div className="suggestions-loading-icon"><Icon icon="spinner" spin /></div> }
            {suggestions.length > 0 && generateDroopDown()}
        </div>
    )
}

export default AutoComplete;