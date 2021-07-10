console.log(123456);
const arr = [1, 2, 3, 4, 5, 6];

const res = arr.reduce(function (prev, cur) {
    return prev + cur;
});
console.log(res);