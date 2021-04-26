import typeOf from "../src/demo"

test('typeOf 123 should be Number', () => {
    expect(typeOf(123)).toBe('Number')
})
