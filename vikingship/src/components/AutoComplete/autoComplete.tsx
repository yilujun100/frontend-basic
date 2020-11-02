/**
 * AutoComponent 自动补全
 * 支持自定义模板
 * 支持异步请求
 * 支持键盘事件
 */

import React, { FC, useState, ChangeEvent } from 'react'
import Input, { InputProps } from './../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => string[];
    onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        ...restProps
    } =  props
    const [ inputValue, setInputValue ] = useState(value)
    const [ suggestions, setSuggestions ] = useState<string[]>([])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestions(value)
            setSuggestions(results)
        } else {
            setSuggestions([])
        }
    }
    console.log(suggestions)
    const handleSelect = (item: string) => {
        setInputValue(item)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const generateDroopDown = () => {
        return (
            <ul>
                {
                    suggestions.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>{item}</li>
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
            {suggestions.length > 0 && generateDroopDown()}
        </div>
    )
}

export default AutoComplete;