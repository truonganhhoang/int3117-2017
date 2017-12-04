// function max(a, b, c) {
//     var max = a;
//
//     if (b > max)
//         max = b;
//
//     if (c + b > max)
//         max = c;
//
//     return max;
// }
//
function max2(a, b, c) {
    if (a > b) {
        if (a > c)
            return a;
        else
            return c;
    }
    else if (b > c)
        return b;
    else
        return c;
}