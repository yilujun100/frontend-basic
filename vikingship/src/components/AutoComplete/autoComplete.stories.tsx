import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const SimpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
        return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            placeholder="输入湖人队球员英文名试试"
        />
    )
}

const CustomDropdownOptions = () => {
    const lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 }
    ]
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(item => item.value.includes(query))
    }
    const renderOption = (item: DataSourceType) => {
        const itemWithNumber = item as DataSourceType<LakerPlayerProps>
        return (
            <>
                <b>名字: {itemWithNumber.value}</b>
                <span>球衣号码: {itemWithNumber.number}</span>
            </>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            placeholder="输入湖人队球员英文,自定义下拉模版"
            renderOption={renderOption}
        />
    )
}

const AsyncFetch = () => {
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log(items)
                return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
            })
    }
    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GithubUserProps>
        return (
            <>
                <b>Name: {itemWithGithub.value}</b>
                <span>Url: {itemWithGithub.url}</span>
            </>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            placeholder="输入 Github 用户名试试"
            onSelect={action('selected')}
            renderOption={renderOption}
        />
    )
}

storiesOf('AutoComplete', module)
    .add('AutoComplete', SimpleComplete)
    .add('自定义下拉选项', CustomDropdownOptions)
    .add('异步请求Github用户名', AsyncFetch)