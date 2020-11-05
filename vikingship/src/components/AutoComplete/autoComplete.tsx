/**
 * AutoComponent 自动补全
 * 支持自定义模板
 * 支持异步请求
 * 支持键盘事件
 */

import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect  } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from './../Input/input'
import Icon from './../Icon/icon'
import useDebounce from './../../hooks/useDebounce'

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
    const [ highlightIndex, setHighlightIndex ] = useState(-1)
    const debouncedValue = useDebounce(inputValue, 300)
    useEffect(() => {
        if (debouncedValue) {
            const results = fetchSuggestions(debouncedValue)
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
    }, [debouncedValue, fetchSuggestions])
    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38:
                highlight(highlightIndex - 1)
                break;
            case 40:
                console.log('down')
                highlight(highlightIndex + 1)
                break;
            case 27:
                setSuggestions([])
                break;
            default:
                break;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }
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
                    suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                        )
                    })
                }
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { loading && <div className="suggestions-loading-icon"><Icon icon="spinner" spin /></div> }
            {suggestions.length > 0 && generateDroopDown()}
        </div>
    )
}

export default AutoComplete;