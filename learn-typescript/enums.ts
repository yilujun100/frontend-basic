// 枚举
// 在任何项目中我们都会遇到常量，常量是指在程序执行过程中不会被改变的值，在js中我们一般会用const来声明一个常量，
// 但是，有些取值是在一定范围内的一系列常量，比如一周内的七天（周一到周日）、三原色（红黄蓝）、四个方位（上下左右）等等，这些就可以用枚举来表示
// 数字枚举,枚举成员会被赋值从0开始，自动递增的一个数字
// enum Direction {
//     // Up = 10, // 手动赋值
//     Up,
//     Down,
//     Left,
//     Right
// }
// console.log(Direction.Up)
// console.log(Direction[0]) // 枚举还做了一个反向映射，可以把枚举看成是一个数组

// 字符串枚举
// 给每一项添加字符串的值，这样可以更容易处理和调试，因为它们都是提供有意义和可调试的字符串
// 可以用来做一个简单的字符串比较
// enum Direction {
//     Up = 'UP',
//     Down = 'DOWN',
//     Left = 'LEFT',
//     Right = 'RIGHT'
// }
// const value = 'UP'
// if (value === Direction.Up) {
//     console.log('go up!')
// }

// 常量枚举
// 使用常量枚举可以提升性能：当我们调用一个枚举（Direction.Up）的时候，它会直接把值翻译成结果（UP），它会内联枚举的任何用法，并且不会把枚举编译成javascript代码
const enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}
const value = 'UP'
if (value === Direction.Up) {
    console.log('go up!')
}