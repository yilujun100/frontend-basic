test('测试文件名称', () => {
    const src = new (require('../index'))()
    const ret = src.getTestFileName('/abc/class.js')
    console.log('getSourceName', ret)
    expect(ret)
        .toBe('/abc/__test__/class.spec.js')
})