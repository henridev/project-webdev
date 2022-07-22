

// A buffer is an area of memory.
// you don't interact directly with memory every day.
// It represents a fixed-size chunk of memory (can't be resized)
// It is allocated outside of the V8 JavaScript engine.
// You can think of a buffer like an array of integers, which each represent a byte of data.
// help devs deal with binary data

// const buf = Buffer.from('Hey!')
const bufSize = Buffer.alloc(1024)
//or
const bufSizeUnsafe = Buffer.allocUnsafe(1024)


// the Buffer created by alloc will be initialized with zeroes
// the one created by allocUnsafe will be uninitialized.
// would be quite fast in comparison to alloc,
// the allocated segment of memory may contain old data which
// could potentially be sensitive. Older data, if present in the memory,
// can be accessed or leaked when the Buffer memory is read.
// This is what really makes allocUnsafe unsafe and extra care
// must be taken while using it.

// A buffer, being an array of bytes, can be accessed like an array:s

const buf = Buffer.from('Hey!')
console.log(buf[0]) //72
console.log(buf[1]) //101
console.log(buf[2]) //121

// Those numbers are the UTF-8 bytes that identify the characters
// in the buffer (H → 72, e → 101, y → 121). This happens because Buffer.
// from() uses UTF-8 by default.
// Keep in mind that some characters may occupy more than one byte in the buffer (é → 195 169).

// uses UTF-8 by default.w
console.log(buf.toString())


const buf = Buffer.alloc(4)
buf.write('Hey!')
