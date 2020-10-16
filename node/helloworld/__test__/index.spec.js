test('测试Hello World', () => {
    const ret = require('../index')
    // console.log('helloworld', helloworld)
    expect(ret)
        .toBe('Hello world')
})