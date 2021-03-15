class MathUtils{
    constructor() {}

    static random_choice(choices){
        var i_index = Math.floor(Math.random() * choices.length);
        return choices[i_index];
    }

    static permute(array) {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/46161940
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    static sum(array) {
        let i = 0, sum = 0, len = array.length;

        while (i < len) {
            sum = sum + array[i++];
        }

        return sum;
    }

    static mean(array) {
        let i = 0, sum = 0, len = array.length;

        while (i < len) {
            sum = sum + array[i++];
        }

        return sum / len;
    }

    static multinomial(probs){
        /*
        probs: [nchoices] Array containing possibly unnormalized probabilities for each position. Assumes these values are all nonnegative.
        returns: () an index
         */
        const nchoices = probs.length;

        // Early exit, only one choice
        if(nchoices===1){
            return 0
        }

        // Normalize probabilities
        let total_mass = 0;
        for (let i = 0; i < nchoices; i++){
            total_mass = total_mass + probs[i]
        }
        let probs_normalized = [...probs];
        for (let i = 0; i < nchoices; i++){
            probs_normalized[i] = probs_normalized[i] / total_mass;
        }

        // Calculate the "right" edge of each bin in the range [0, 1]
        let cum_probs = [];
        let cur = 0;
        for (let i = 0; i < nchoices; i++){
            cum_probs.push(cur + probs_normalized[i]);
            cur = cur+probs_normalized[i]
        }
        const sample = Math.random();
        for (let i = 0; i < nchoices; i++){
            if (sample < cum_probs[i]){
                return i
            }
        }

        return (nchoices - 1)
    }
}

// The following snippet randomly initializes the seed for all subsequent Math.random() calls:
// https://github.com/davidbau/seedrandom
!function (a, b, c, d, e, f, g, h, i) {
    function j(a) {
        var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = [];
        for (c || (a = [c++]); d > f;) h[f] = f++;
        for (f = 0; d > f; f++) h[f] = h[g = s & g + a[f % c] + (b = h[f])], h[g] = b;
        (e.g = function (a) {
            for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = s & f + 1], c = c * d + h[s & (h[f] = h[g = s & g + b]) + (h[g] = b)];
            return e.i = f, e.j = g, c
        })(d)
    }

    function k(a, b) {
        var c, d = [], e = typeof a;
        if (b && "object" == e) for (c in a) try {
            d.push(k(a[c], b - 1))
        } catch (f) {
        }
        return d.length ? d : "string" == e ? a : a + "\0"
    }

    function l(a, b) {
        for (var c, d = a + "", e = 0; e < d.length;) b[s & e] = s & (c ^= 19 * b[s & e]) + d.charCodeAt(e++);
        return n(b)
    }

    function m(c) {
        try {
            return o ? n(o.randomBytes(d)) : (a.crypto.getRandomValues(c = new Uint8Array(d)), n(c))
        } catch (e) {
            return [+new Date, a, (c = a.navigator) && c.plugins, a.screen, n(b)]
        }
    }

    function n(a) {
        return String.fromCharCode.apply(0, a)
    }

    var o, p = c.pow(d, e), q = c.pow(2, f), r = 2 * q, s = d - 1, t = c["seed" + i] = function (a, f, g) {
        var h = [];
        f = 1 == f ? {entropy: !0} : f || {};
        var o = l(k(f.entropy ? [a, n(b)] : null == a ? m() : a, 3), h), s = new j(h);
        return l(n(s.S), b), (f.pass || g || function (a, b, d) {
            return d ? (c[i] = a, b) : a
        })(function () {
            for (var a = s.g(e), b = p, c = 0; q > a;) a = (a + c) * d, b *= d, c = s.g(1);
            for (; a >= r;) a /= 2, b /= 2, c >>>= 1;
            return (a + c) / b
        }, o, "global" in f ? f.global : this == c)
    };
    if (l(c[i](), b), g && g.exports) {
        g.exports = t;
        try {
            o = require("crypto")
        } catch (u) {
        }
    } else h && h.amd && h(function () {
        return t
    })
}(this, [], Math, 256, 6, 52, "object" == typeof module && module, "function" == typeof define && define, "random");
Math.seedrandom();
