"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.isLeap = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
// Home page
app.get('/', (req, res) => {
    const home = "Welcome To Nodejs Training";
    res.json({ home });
});
app.get('/:datatype', (req, res) => {
    let variable = req.params.datatype;
    res.json({
        message: variable,
        source: typeof (variable)
    });
});
// Split 
app.get('/split/:string', (req, res) => {
    const orignalString = req.params.string;
    const revisedString = orignalString.split('_').join(' ');
    res.json({ revisedString });
});
// Concat
app.get('/concat/:params1/:params2', (req, res) => {
    const params1 = req.params.params1;
    const params2 = req.params.params2;
    const revisedString = params1 + params2;
    res.json({ revisedString });
});
// Leap year 
function isLeap(year) {
    return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
}
exports.isLeap = isLeap;
app.get('/leap-year/:year', (req, res) => {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
        return res.status(400).json({
            error: 'Invalid year. Please provide a valid year.'
        });
    }
    let isLeapYear = false;
    if (year % 4 === 0) {
        if (year % 100 !== 0 || year % 400 === 0) {
            isLeapYear = true;
        }
    }
    res.json({ year, isLeapYear });
});
// Shakehand Problem
const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
];
const REVERSE_COMMAND = 16;
const commands = (command) => {
    let secret = COMMANDS.filter((_, i) => command & (1 << i));
    if (command & REVERSE_COMMAND) {
        secret = secret.reverse();
    }
    return secret;
};
exports.commands = commands;
app.get('/secret-handshake/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number) || number < 1 || number > 31) {
        return res.status(400).json({
            error: 'Invalid year. Please provide a number between 1 and 31.'
        });
    }
    const handshake = (0, exports.commands)(number);
    res.json({ number, handshake });
});
app.listen(port, () => {
    console.log(`The server is runinng on the port ${port}`);
});
//# sourceMappingURL=app.js.map