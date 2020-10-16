// 在JavaScript中，函数是一等公民，那么什么是一等公民？
// 函数和其他类型的对象一样，都平等，可以作为参数、可以存入数组、可以被另外一个函数返回、可以被赋值给另外一个变量等等
// 函数声明
// function add(x: number, y: number, z: number = 10): number {
//     if (typeof z === 'number') {
//         return x + y + z
//     }
//     return x + y
// }

// let result = add(2, 3, 5)

const add = function(x: number, y: number, z: number = 10): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

const add2: (x: number, y: number, z?: number) => number = add // 注意：这里的箭头不是es6中的箭头函数，而是ts中声明函数类型返回值的方法

// 类型推断: ts在我们没有明确指定类型的时候，推测出一个类型
// let str = 'str'
// str = 123