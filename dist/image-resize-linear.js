(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ImageResizeLinear = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageResizeLinear;
(function (ImageResizeLinear) {
    'use strict';
    function linear(from, to) {
        var sw = (from.width < to.width) ? ((from.width - 1) / to.width) : (from.width / to.width);
        var sh = (from.height < to.height) ? ((from.height - 1) / to.height) : (from.height / to.height);
        // sw > 2 => linear(from, {width: Math.floor(from.height/2), height:to.height, data: new Uint8Array(...),});
        var w = from.width * from.channels;
        var lw = from.width - 1;
        var lh = from.height - 1;
        var fx, fy, fx0, fy0;
        var rx, ry, rx1, ry1;
        var p1, p2, p3, p4;
        var w1, w2, w3, w4;
        for (var ty = 0; ty < to.height; ty++) {
            for (var tx = 0; tx < to.width; tx++) {
                fx = tx * sw;
                fy = ty * sh;
                fx0 = Math.floor(fx);
                fy0 = Math.floor(fy);
                p1 = fx0 * from.channels + fy0 * w;
                p2 = p1 + ((fx0 < lw) ? from.channels : 0);
                p3 = p1 + ((fy0 < lh) ? w : 0);
                p4 = p3 + ((fx0 < lw) ? from.channels : 0);
                rx = fx - fx0;
                ry = fy - fy0;
                rx1 = 1.0 - rx;
                ry1 = 1.0 - ry;
                w1 = rx1 * ry1;
                w2 = rx * ry1;
                w3 = rx1 * ry;
                w4 = rx * ry;
                for (var c = 0; c < from.channels; c++) {
                    to.data[(tx + ty * to.width) * from.channels + c] = w1 * from.data[p1 + c] + w2 * from.data[p2 + c] + w3 * from.data[p3 + c] + w4 * from.data[p4 + c];
                }
            }
        }
    }
    ImageResizeLinear.linear = linear;
})(ImageResizeLinear || (ImageResizeLinear = {}));
module.exports = ImageResizeLinear;

},{}]},{},[1])(1)
});