// interface 接口
// 主要有两个功能：
// 1.对对象的形状(shape)进行描述
// 2.对类(class)进行抽象
// Duck Typing(鸭子类型)

interface Person {
    readonly id: number;
    name: string;
    age?: number;
}

let chris: Person = {
    id: 1234,
    name: 'chris',
    age: 20
}