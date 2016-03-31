// ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
{
    let a = 10;
    var b = 1;
}

console.log(a);
console.log(b);

// 上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

for (let i = 0; i < arr.length; i++) {

}

console.log(i);


// 上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。
// 如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    }
}

a[6](); // 输出10

// 只在块级作用域里面有用

// 上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    };
}

a[6](); // 输出6

// -----------------------------------------------


// 面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。

console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;

// 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

// ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。
var tmp = 123;
if (true) {
    tmp = 'abc';
    let tmp;
}

if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

// 上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

// “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

{
    typeof x; // ReferenceError
    let x;
}

// 上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。

// 作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

typeof undeclared_variable // "undefined"

// 上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。