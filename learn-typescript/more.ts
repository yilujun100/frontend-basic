// type aliases: 类型别名
// 有些类型（比如函数）写起来比较繁琐，这个时候我们可以使用类型别名来指定数据类型
// 类型别名最常见的使用场景是在联合类型
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
    return x + y
}
const sum2: PlusType = sum

type NameResolver = () => string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
    if (typeof n === 'string') {
        return n
    } else {
        return n()
    }
}

// type assertion: 类型断言
// 当ts不确定一个联合类型的变量到底是什么类型的时候，我们只能访问此联合类型的所有类型里公用的属性或方法，
// 而有时我们确实需要在还不确定类型的时候就访问其中一个类型的属性和方法，这个时候我们可以使用类型断言
function getLength(input: string | number): number {
    // const str = input as String
    // if (str.length) {
    //     return str.length
    // } else {
    //     const number = input as Number
    //     return number.toString().length
    // }
    if((<string>input).length) {
        return (<string>input).length
    } else {
        return input.toString().length
    }
}

// 声明文件
// 当我们使用第三方库的时候，我们需要引入它的声明文件，才能获得对应的代码补全、接口提示等等功能
// 假如我们要使用jQuery，通常我们会在html中通过script标签引入jQuery，然后就可以使用$和jQuery全局变量了
// 但是，在ts编译器中它并不知道$（或jQuery）是什么东西，这时候，我们需要使用某种语法来帮助它来定义它的类型
// jQuery('#foo')
// declare var jQuery: (selector: string) => any
// 通常我们会定义一个声明文件（必须以.d.ts结尾）
// 有时候，我们还是没有办法获得jQuery定义，这时我们需要配置一下tsc

// 第三方声明文件
// @types/jquery
// jQuery('#abc').xxx