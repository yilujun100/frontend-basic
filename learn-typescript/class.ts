// 在es5中，是没有类的概念，要实现继承是通过构造函数+原型链
// es6中引入了类，为我们实现继承提供了新的方式（底层实现还是原型链）
// 面向对象：
// 类（Class）：定义了一切事物的抽象特点
// 对象（Object）：类的实例，通过new来生成
// 面向对象（OOP）三大特性：封装、继承、多态
// 封装：将对数据的操作细节隐藏起来，只暴露对外的接口，外界调用端不需要知道细节，就能通过对外提供的接口来访问对象
// 继承：子类继承父类，子类除了拥有了父类的所有特性外，还有一些更加具体的特性
// 多态：多态是由继承而产生的相关的不同的类对同一个方法可以有不同的响应，比如：猫和狗可能都继承Animal动物，但是它们分别实现了自己吃的方法eat，此时针对某一个实例，我们无需了解它是猫还是狗，
//      我们可以直接调用eat方法，程序就会自动判断出来应该如何正确执行eat方法

// class中的修饰符
// 修饰符：有时候我们需要给类上的属性还有方法提供权限管理，因为有些内容我们不愿意暴露给外部使用，这个时候需要使用到修饰符
// ts为我们提供了3种访问修饰符：
// 1.public: 共有的，可以在任何地方被访问到
// 2.private 私有的，只在类中被访问到，其他地方包括子类无法访问
// 3.protected 受保护的，只在类以及它的子类中能访问
// readonly 只读属性
// static 静态属性
// 为什么要有静态属性和方法：是因为这里面的定义和实例的状态没有太大关系
class Animal {
    name: string;
    static categoies: string[] = ['mammal', 'bird']
    static isAnimal(a) {
        return a instanceof Animal
    }
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}

console.log(Animal.categoies)
const snake = new Animal('lily')
console.log(Animal.isAnimal(snake))
console.log(snake.name)
snake.name = 'lucy'
console.log(snake.run())

class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}
const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())
console.log(xiaobao.bark())

class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log(this.name)
    }
    run() {
        return 'Meow, ' + super.run()
    }
}
const maomao = new Cat('maomao')
console.log(maomao.run())

// 类和接口
// 之前我们学习过接口可以用于描述对象的形状，它里面有什么样的属性和方法等等，接口的另外一个用途是对类的一部分行为进行抽象
// 在面向对象的世界中，一个类只能继承自另外一个类，有时候不同类之间会有一些共有的特性，使用子类继承父类的方法很难完成，
// 这个时候我们可以把这些共有的特性提取成接口，然后使用implements的关键字来实现，这样大大提高了面向对象的灵活性

// 开启或关闭收音机
interface Radio {
    switchRadio(): void;
}
// 检查电池容量
interface Battery {
    checkBatteryStatus();
}
// 接口之间还可以实现继承
interface RadioWithBattery extends Radio {
    checkBatteryStatus();
}
class Car implements Radio {
    switchRadio() {

    }
}

class Cellphone implements RadioWithBattery {
    switchRadio() {

    }
    checkBatteryStatus() {

    }
}