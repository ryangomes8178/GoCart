import Slick from "./src";
/**
 * Resolve ES6 and CommonJS compatibility issues
 * 1. CommonJS code
 *    const Slick = require('react-native-slick');
 * 2. ES6 code
 *    import Slick from 'react-native-slick';
 */
module.exports = Slick;
module.exports.default = Slick;
