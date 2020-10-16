// 泛型
// 在定义函数、接口、类的时候，我们不予事先指定数据类型，而是在使用的时候才指定类型的一种特征
// 可以把泛型理解成一个占位符或者是变量，在使用的时候可以把定义好的类型像参数一样传入，然后它可以原封不动的给我们输出
// function echo(arg: any): any {
//     return arg
// }
// const result: string = echo(123)

function echo<T>(arg: T): T {
    return arg
}

// const str: string = 'str'
// const result = echo(str)
const result = echo(true) // 类型推论

// 泛型可以传入多个值
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])



// 约束泛型
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以我们不能随意操作属性和方法
// 我们可以对泛型进行一个约束，只允许这个函数传入那些包含length属性的变量
// 关键是在泛型中使用extends这个关键字，就可以让传入的值满足我们特定的约束条件，而不是想传入啥就传入啥
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
const arrs = echoWithArr([1, 2, 3])

interface IWithLength {
    length: number
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
const str = echoWithLength('str')
const obj = echoWithLength({ length: 10, width: 10 })
const arr2 = echoWithLength([1, 2, 3])



// 泛型在类和接口中的使用
// 先抛出问题
// 第二次pop的时候返回的是一个string类型，不能调用number下面的toFixed方法
// class Queue {
//     private data = [];
//     push(item) {
//         return this.data.push(item)
//     }
//     pop() {
//         return this.data.shift()
//     }
// }
// const queue = new Queue()
// queue.push(1)
// queue.push('str')
// console.log(queue.pop().toFixed())
// console.log(queue.pop().toFixed())

// 推入什么类型，弹出什么类型，这个时候我们可以使用使用泛型
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.shift()
    }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

const queue2 = new Queue<string>()
queue2.push('str')
console.log(queue2.pop().length)

interface KeyPair<T, U> {
    key: T;
    value: U;
}
let kp1: KeyPair<number, string> = { key: 123, value: 'str' }
let kp2: KeyPair<string, number> = { key: 'test', value: 123 }

// 声明数组的两种方式
let arr: number[] = [1, 2, 3]
let arrTwo: Array<number> = [1, 2, 3]

// 使用interface来描述函数的类型
interface IPlus<T> {
    (a: T, b: T): T
}
function plus(a: number, b: number): number {
    return a + b
}
function connect(a: string, b: string): string {
    return a + b
}
const a: IPlus<number> = plus
const b: IPlus<string> = connect

// 总结：我们了解了泛型类和interface的两种用法，它可以创建相对来说很灵活的类，在实例化类的时候，可以动态的传入你想要的参数，
// 也可以创建灵活的interface，随着传入的参数不同，可以适配多变的object,甚至可以说是函数，使用这种形式就实现了泛型的意义