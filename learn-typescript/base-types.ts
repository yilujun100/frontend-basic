// 基本类型
let isDone: boolean = false

let age: number = 20
let binaryNumber: number = 0b1111

let firstName: string = 'chris'
let message: string = `Hello, ${firstName}, age is ${age}`

let u: undefined = undefined
let n: null = null

let num: number = undefined // undefined、null是所有类型的子类型

// 任意类型
let notSure: any = 4
notSure = 'maybe it is a string'
notSure = true

notSure.myName
notSure.getName()

// 联合类型
let numberOrString: number | string = 123
numberOrString = 'abc'

// 数组
let arrOfNumbers: number[] = [1, 2, 3, 4]
arrOfNumbers.push(5)

// 类数组
function test() {
    console.log(arguments)
    // arguments.length
    // arguments[1]
    // arguments.forEach
}

// 元组
let user: [string, number] = ['chris', 1]
