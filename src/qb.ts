// @ts-nocheck

// qb.js remastered for nodejs
import readline from "readline-sync";

class Console {
    _x = 0;
    onMessage = (m: string): any => {};
    onClear = (): any => {};
    cls() {
        this.onClear();
    }
    print(...args) {
        this.onMessage(...args);
    }
    getKeyFromBuffer() {
        const input = readline.question("").charCodeAt(0);

        return input;
    }
    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
    }
    locate() {}
    input(onInputDone) {
        const res = readline.question("");
        return onInputDone(res);
    }
    color() {}
    reset() {
        this.onClear();
    }
}

function DebugConsole() {}

DebugConsole.prototype.print = function (str) {
    if (!this.console) this.console = new Console();
    this.console.print(str);
};

DebugConsole.prototype.printf = function () {
    function convert(match, nosign) {
        if (nosign) {
            match.sign = "";
        } else {
            match.sign = match.negative ? "-" : match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left) {
            if (match.pad == "0" || nosign) {
                return match.sign + pad + match.argument;
            } else {
                return pad + match.sign + match.argument;
            }
        } else {
            if (match.pad == "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, " ");
            } else {
                return match.sign + match.argument + pad;
            }
        }
    }

    if (typeof arguments == "undefined") {
        return;
    }
    if (arguments.length < 1) {
        return;
    }
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    if (typeof args[0] != "string") {
        return;
    }
    if (typeof RegExp == "undefined") {
        return;
    }

    var string = args[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = [];
    var strings = [];
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = "";
    var match = null;
    var substitution;

    for (;;) {
        match = exp.exec(string);
        if (!match) {
            break;
        }
        if (match[9]) {
            convCount += 1;
        }

        stringPosStart = matchPosEnd;
        stringPosEnd = exp.lastIndex - match[0].length;
        strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

        matchPosEnd = exp.lastIndex;
        matches[matches.length] = {
            match: match[0],
            left: match[3] ? true : false,
            sign: match[4] || "",
            pad: match[5] || " ",
            min: match[6] || 0,
            precision: match[8],
            code: match[9] || "%",
            negative: parseInt(args[convCount], 10) < 0 ? true : false,
            argument: String(args[convCount])
        };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (args.length - 1 < convCount) {
        return;
    }

    var i = null;

    for (i = 0; i < matches.length; i++) {
        if (matches[i].code == "%") {
            substitution = "%";
        } else if (matches[i].code == "b") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(2));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "c") {
            matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument, 10)), 10)));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "d") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "f") {
            matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "o") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(8));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "s") {
            matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length);
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "x") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "X") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]).toUpperCase();
        } else {
            substitution = matches[i].match;
        }

        newString += strings[i];
        newString += substitution;
    }

    newString += strings[i];
    this.print(newString);
};

function sprintf() {
    var args = arguments;
    if (args.length == 1 && args[0] instanceof Array) {
        args = args[0];
    }
    var format = args[0];
    var output = "";

    var segments = format.split(/%[^%]/);
    for (var i = 0; i < segments.length; i++) {
        output += segments[i];
        if (args[i + 1] !== undefined) {
            output += args[i + 1];
        }
    }

    return output;
}

function DebugConsole() {}

DebugConsole.prototype.print = function (str) {
    console.log(str);
};

DebugConsole.prototype.printf = function () {
    function convert(match, nosign) {
        if (nosign) {
            match.sign = "";
        } else {
            match.sign = match.negative ? "-" : match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left) {
            if (match.pad == "0" || nosign) {
                return match.sign + pad + match.argument;
            } else {
                return pad + match.sign + match.argument;
            }
        } else {
            if (match.pad == "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, " ");
            } else {
                return match.sign + match.argument + pad;
            }
        }
    }

    if (typeof arguments == "undefined") {
        return;
    }
    if (arguments.length < 1) {
        return;
    }
    var args = arguments;
    if (args[0] instanceof Array) {
        args = args[0];
    }
    if (typeof args[0] != "string") {
        return;
    }
    if (typeof RegExp == "undefined") {
        return;
    }

    var string = args[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = [];
    var strings = [];
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = "";
    var match = null;
    var substitution;

    for (;;) {
        match = exp.exec(string);
        if (!match) {
            break;
        }
        if (match[9]) {
            convCount += 1;
        }

        stringPosStart = matchPosEnd;
        stringPosEnd = exp.lastIndex - match[0].length;
        strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

        matchPosEnd = exp.lastIndex;
        matches[matches.length] = {
            match: match[0],
            left: match[3] ? true : false,
            sign: match[4] || "",
            pad: match[5] || " ",
            min: match[6] || 0,
            precision: match[8],
            code: match[9] || "%",
            negative: parseInt(args[convCount], 10) < 0 ? true : false,
            argument: String(args[convCount])
        };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (args.length - 1 < convCount) {
        return;
    }

    var i = null;

    for (i = 0; i < matches.length; i++) {
        if (matches[i].code == "%") {
            substitution = "%";
        } else if (matches[i].code == "b") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(2));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "c") {
            matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument, 10)), 10)));
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "d") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "f") {
            matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "o") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(8));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "s") {
            matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length);
            substitution = convert(matches[i], true);
        } else if (matches[i].code == "x") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]);
        } else if (matches[i].code == "X") {
            matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
            substitution = convert(matches[i]).toUpperCase();
        } else {
            substitution = matches[i].match;
        }

        newString += strings[i];
        newString += substitution;
    }

    newString += strings[i];
    this.print(newString);
};

function sprintf() {
    var args = arguments;
    if (args.length == 1 && args[0] instanceof Array) {
        args = args[0];
    }
    var format = args[0];
    var output = "";

    var segments = format.split(/%[^%]/);
    for (var i = 0; i < segments.length; i++) {
        output += segments[i];
        if (args[i + 1] !== undefined) {
            output += args[i + 1];
        }
    }

    return output;
}

var NextRuleId = 0;

function Rule(name, symbols, action) {
    this.id = NextRuleId++;

    this.name = name;

    this.symbols = symbols;

    this.action = action;
}

Rule.prototype = {
    toString: function () {
        var str = this.name + ":";

        for (var i = 0; i < this.symbols.length; i++) {
            str += " " + this.symbols[i];
        }

        if (0 && this.action) {
            str += " action=" + this.action;
        }

        return str;
    }
};

function RuleSet() {
    this.rules = {};

    this.terminals = [];

    this.terminalsAdded = {};

    this.first = {};

    this.eatWhiteSpace = true;

    if (this.eatWhiteSpace) {
        this.joinExpr = " *";
    } else {
        this.joinExpr = "";
    }

    this.EOF_TOKEN = "'EOF'";

    this.addRule("_start", ["start", this.EOF_TOKEN]);
}

RuleSet.prototype = {
    EPSILON: {
        toString: function () {
            return "EPSILON";
        }
    },

    toString: function () {
        var str = "";
        for (var name in this.rules) {
            var rules = this.rules[name];
            for (var i = 0; i < rules.length; i++) {
                str += rules[i].toString() + "\n";
            }
        }

        return str;
    },

    check: function (errors) {
        var size = errors.length;

        for (var ruleName in this.rules) {
            var rules = this.rules[ruleName];
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];

                for (var j = 0; j < rule.symbols.length; j++) {
                    var symbol = rule.symbols[j];
                    if (symbol.length === 0) {
                        errors.push("Error: Rule '" + ruleName + "' contains a zero length symbol: " + symbol);
                    } else if (symbol[0] != "'") {
                        if (this.rules[symbol] === undefined) {
                            errors.push("Error: Rule'" + ruleName + "' contains an undefined symbol: " + symbol);
                        }
                    } else {
                    }
                }
            }
        }
        return errors.length - size;
    },

    optimize: function () {
        var changed = 1;

        while (changed) {
            changed = 0;

            for (var name in this.rules) {
                var rules = this.rules[name];

                if (rules.length == 1 && rules[0].name != "_start" && !rules[0].action) {
                    this.replaceRule(rules[0].name, rules[0].symbols);
                    changed |= 1;
                }
            }
        }
    },

    innerExpr: function (symbol) {
        return symbol.substr(1, symbol.length - 2);
    },

    replaceRule: function (name, newSymbols) {
        delete this.rules[name];
        for (var ruleName in this.rules) {
            var rules = this.rules[ruleName];
            for (var i = 0; i < rules.length; i++) {
                for (var j = 0; j < rules[i].symbols.length; j++) {
                    if (rules[i].symbols[j] == name) {
                        rules[i].symbols.splice(j, 1);
                        for (var k = 0; k < newSymbols.length; k++) {
                            rules[i].symbols.splice(j + k, 0, newSymbols[k]);
                        }
                        j += newSymbols.length - 1;
                    }
                }
            }
        }
    },

    addRule: function (name, symbols, action) {
        if (this.rules[name] === undefined) {
            this.rules[name] = [];
        }

        this.rules[name].push(new Rule(name, symbols, action));
        for (var i = 0; i < symbols.length; i++) {
            if (symbols.length > 0 && symbols[i][0] == "'" && !this.terminalsAdded[symbols[i]]) {
                this.terminalsAdded[symbols[i]] = 1;
                this.terminals.push(symbols[i]);
            }
        }
    },

    addToken: function (name, re) {
        this.addRule(name, ["'" + re + "'"]);
    },

    computeFirst: function () {
        this.first = {};
        var name;
        for (name in this.rules) {
            this.first[name] = {};
        }

        var changed = 1;
        var self = this;

        function addFirst(name, token) {
            var ret = !(token in self.first[name]);
            self.first[name][token] = 1;
            return ret;
        }

        function merge(destName, sourceName) {
            var ret = 0;
            for (var token in self.first[sourceName]) {
                ret |= addFirst(destName, token);
            }
            return ret;
        }

        while (changed) {
            changed = 0;

            for (name in this.rules) {
                var rules = this.rules[name];

                for (var i = 0; i < rules.length; i++) {
                    if (rules[i].symbols.length === 0) {
                        changed |= addFirst(name, this.EPSILON);
                    }

                    for (var j = 0; j < rules[i].symbols.length; j++) {
                        if (rules[i].symbols[j][0] == "'") {
                            changed |= addFirst(name, rules[i].symbols[j]);
                            break;
                        } else {
                            changed |= merge(name, rules[i].symbols[j]);

                            if (this.first[rules[i].symbols[j]][this.EPSILON] !== 1) {
                                break;
                            }
                        }
                    }
                }
            }
        }
    },

    computeFollow: function () {
        var name;
        this.follow = {};
        for (name in this.rules) {
            this.follow[name] = {};
        }

        var changed = 1;

        while (changed) {
            changed = 0;
            var f;
            for (name in this.rules) {
                var rules = this.rules[name];
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    for (var j = 0; j < rule.symbols.length; j++) {
                        if (rule.symbols[j][0] === "'") {
                            continue;
                        }

                        var follow = this.follow[rule.symbols[j]];

                        if (j == rule.symbols.length - 1) {
                            if (rule.symbols[j][0] != "'" && rule.symbols[j] != name) {
                                for (f in this.follow[name]) {
                                    if (f !== this.EPSILON) {
                                        changed |= follow[f] === undefined;
                                        follow[f] = 1;
                                    }
                                }
                            }
                        } else if (rule.symbols[j + 1][0] == "'" || rule.symbols[j + 1] === this.EOF_TOKEN) {
                            changed |= follow[rule.symbols[j + 1]] === undefined;
                            follow[rule.symbols[j + 1]] = 1;
                        } else {
                            for (f in this.first[rule.symbols[j + 1]]) {
                                if (f !== this.EPSILON) {
                                    changed |= follow[f] === undefined;
                                    follow[f] = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    finalize: function () {
        this.optimize();
        this.computeFirst();
        this.computeFollow();
    },

    createTokenizer: function () {
        var tokenizer = new Tokenizer();
        tokenizer.ignore("[ \t\r\u001a]+");

        for (var i = 0; i < this.terminals.length; i++) {
            tokenizer.addToken(this.terminals[i], this.innerExpr(this.terminals[i]));
        }

        tokenizer.EOF_TOKEN = this.EOF_TOKEN;
        return tokenizer;
    }
};

function RuleParser() {
    this.nextRuleId = 0;

    this.buildSet = new RuleSet();

    var rules = new RuleSet();

    var self = this;

    rules.addRule("start", ["rule"]);
    rules.addRule("identifier", ["'[A-Za-z0-9_]+'"]);
    rules.addRule("terminal", ["''([^'\\\\]|\\\\.)*''"]);
    rules.addRule("expr", ["or_expr"]);
    rules.addRule("rule", ["identifier", "':'", "expr"], function (args) {
        self.buildSet.addRule(args[0], args[2], self.action);
        return args[0];
    });
    rules.addRule("rule", ["identifier", "':'"], function (args) {
        self.buildSet.addRule(args[0], [], self.action);
        return args[0];
    });
    rules.addRule("or_expr", ["or_expr", "'\\|'", "cat_expr"], function (args) {
        var name = "_" + self.nextRuleId++;
        self.buildSet.addRule(name, args[0]);
        self.buildSet.addRule(name, args[2]);
        return [name];
    });
    rules.addRule("or_expr", ["cat_expr"]);
    rules.addRule("cat_expr", ["cat_expr", "list_expr"], function (args) {
        args[0].push(args[1]);
        return args[0];
    });
    rules.addRule("cat_expr", ["list_expr"], function (args) {
        return [args[0]];
    });

    rules.addRule("list_expr", ["kleene_expr"]);
    rules.addRule("list_expr", ["'\\['", "kleene_expr", "','", "kleene_expr", "'\\]'"], function (args) {
        var nameOpt = "_" + self.nextRuleId++;
        var name = "_" + self.nextRuleId++;

        self.buildSet.addRule(nameOpt, [name]);

        self.buildSet.addRule(nameOpt, [], function (args) {
            return [];
        });

        self.buildSet.addRule(name, [args[1]], function (args) {
            return args;
        });

        self.buildSet.addRule(name, [name, args[3], args[1]], function (args) {
            args[0].push(args[2]);
            return args[0];
        });

        return nameOpt;
    });

    rules.addRule("kleene_expr", ["basic_expr", "'[\\+\\*\\?]'"], function (args) {
        var name = "_" + self.nextRuleId++;

        if (args[1] == "*") {
            self.buildSet.addRule(name, [name, args[0]], function (args) {
                args[0].push(args[1]);
                return args[0];
            });
            self.buildSet.addRule(name, [], function (args) {
                return [];
            });
        } else if (args[1] == "?") {
            self.buildSet.addRule(name, [args[0]]);
            self.buildSet.addRule(name, [], function (args) {
                return null;
            });
        } else if (args[1] == "+") {
            var name2 = "_" + self.nextRuleId++;
            self.buildSet.addRule(name, [name2, args[0]]);
            self.buildSet.addRule(name2, [name2, args[0]]);
            self.buildSet.addRule(name2, []);
        }

        return name;
    });
    rules.addRule("kleene_expr", ["basic_expr"]);
    rules.addRule("basic_expr", ["identifier"]);
    rules.addRule("basic_expr", ["'\\('", "expr", "'\\)'"], function (args) {
        var name = "_" + self.nextRuleId++;
        self.buildSet.addRule(name, args[1]);
        return name;
    });

    rules.addRule("basic_expr", ["terminal"]);

    rules.finalize();

    this.parser = new EarleyParser(rules);
}

RuleParser.prototype = {
    addToken: function (name, re) {
        this.buildSet.addToken(name, re);
    },

    addRule: function (str, action) {
        this.action = action;
        this.parser.parse(str);
    }
};

function ImageManipulator(imageData) {
    this.image = imageData;
}

ImageManipulator.prototype = {
    get: function (x, y) {
        return this.image.data[this.image.width * y + x];
    },

    put: function (x, y, clr) {
        this.image.data[this.image.width * y + x] = clr;
    }
};

function NullType() {
    this.name = ":NULL";
}

NullType.prototype = {
    createInstance: function () {
        return null;
    },

    copy: function (value) {
        return value;
    }
};

function DeriveTypeNameFromVariable(name) {
    switch (name[name.length - 1]) {
        case "$":
            return "STRING";
        case "%":
            return "INTEGER";
        case "&":
            return "LONG";
        case "#":
            return "DOUBLE";
        case "!":
            return "SINGLE";
    }
    return null;
}

function IntegerType() {
    this.name = "INTEGER";
}

IntegerType.prototype = {
    createInstance: function () {
        return 0;
    },

    copy: function (value) {
        return (Math.round(value + 32768) & 65535) - 32768;
    }
};

function SingleType() {
    this.name = "SINGLE";
}

SingleType.prototype = {
    createInstance: function () {
        return 0.0;
    },

    copy: function (value) {
        return value;
    }
};

function DoubleType() {
    this.name = "DOUBLE";
}

DoubleType.prototype = {
    createInstance: function () {
        return 0.0;
    },

    copy: function (value) {
        return value;
    }
};

function StringType() {
    this.name = "STRING";
}

StringType.prototype = {
    createInstance: function () {
        return "";
    },

    copy: function (value) {
        return value;
    }
};

function AnyType() {
    this.name = "ANY";
}

function ScalarVariable(type, value) {
    this.type = type;
    this.value = value;
}

ScalarVariable.prototype.copy = function () {
    return new ScalarVariable(this.type, this.type.copy(this.value));
};

function ArrayType(elementType) {
    this.elementType = elementType;
    this.name = "ARRAY OF " + elementType.name;
}

ArrayType.prototype = {};

function UserType(name, members) {
    this.name = name;

    this.members = members;
}

UserType.prototype = {
    createInstance: function () {
        var user = {};

        for (var name in this.members) {
            user[name] = new ScalarVariable(this.members[name], this.members[name].createInstance());
        }

        return user;
    },

    copy: function (value) {
        var newValue = {};
        for (var key in value) {
            newValue[key] = value[key].copy();
        }

        return newValue;
    }
};

function Dimension(lower, upper) {
    this.lower = lower;
    this.upper = upper;
}

function ArrayVariable(type, dimensions) {
    this.type = type;
    this.dimensions = dimensions;
    this.values = [];
    var totalSize = 1;
    var i;

    for (i = 0; i < this.dimensions.length; i++) {
        totalSize *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
    }

    for (i = 0; i < totalSize; i++) {
        this.values.push(new ScalarVariable(this.type, this.type.createInstance()));
    }
}

ArrayVariable.prototype.copy = function () {
    return this;
};

ArrayVariable.prototype.getIndex = function (indexes) {
    var mult = 1;
    var index = 0;

    for (var i = this.dimensions.length - 1; i >= 0; i--) {
        index += (indexes[i] - this.dimensions[i].lower) * mult;
        mult *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
    }
    return index;
};

ArrayVariable.prototype.assign = function (indexes, value) {
    var index = this.getIndex(indexes);

    this.values[index] = value;
};

ArrayVariable.prototype.access = function (indexes, value) {
    var index = this.getIndex(indexes);

    return this.values[index];
};

function IsNumericType(type) {
    return type.name == "INTEGER" || type.name == "SINGLE" || type.name == "DOUBLE";
}

function IsStringType(type) {
    return type.name == "STRING";
}

function IsArrayType(type) {
    return type instanceof ArrayType;
}

function IsUserType(type) {
    return type instanceof UserType;
}

function IsNullType(type) {
    return type instanceof NullType;
}

function AreTypesCompatible(type1, type2) {
    return (
        type1.name == type2.name ||
        (IsNumericType(type1) && IsNumericType(type2)) ||
        (IsArrayType(type1) && IsArrayType(type2) && (type1.elementType.name == "ANY" || type2.elementType.name == "ANY")) ||
        (!IsArrayType(type1) && !IsArrayType(type2) && (type1.name == "ANY" || type2.name == "ANY"))
    );
}

function TraceBuffer() {
    this.MAX_LINES = 200;
    this.lines = [];
}

TraceBuffer.prototype = {
    toString: function () {
        return this.lines.join("");
    },

    printf: function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var str = sprintf(args);
        this.lines.push(str);
        if (this.lines.length > this.MAX_LINES) {
            this.lines.shift();
        }
        dbg.printf("%s", str);
    }
};

function StackFrame(pc) {
    this.pc = pc;

    this.variables = {};
}

var globalMachine;

function VirtualMachine(cons) {
    this.stack = [];

    this.pc = 0;

    this.callstack = [];

    this.cons = cons;

    this.instructions = [];

    this.types = [];

    this.shared = {};

    this.trace = new TraceBuffer();

    this.dataPtr = 0;

    this.data = [];

    this.asyncronous = false;

    this.suspended = false;

    this.interval = null;

    this.INTERVAL_MS = 50;

    this.instructionsPerInterval = 2048;

    if (!this.debug) {
        this.printStack = function () {};
        this.trace = { printf: function () {} };
    }

    this.lastRandomNumber = 0;

    globalMachine = this;
}

VirtualMachine.prototype = {
    reset: function (program) {
        if (program) {
            this.instructions = program.instructions;
            this.types = program.types;
            this.defaultType = program.defaultType;
            this.data = program.data;
            this.shared = program.shared;
        }

        this.stack.length = 0;
        this.callstack.length = 0;
        this.callstack.push(new StackFrame(this.instructions.length));
        this.frame = this.callstack[0];
        this.dataPtr = 0;
        this.suspended = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.pc = 0;
        if (program) {
            this.cons.reset(program.testMode);
        } else {
            this.cons.reset();
        }
    },

    run: function (program, synchronous) {
        this.reset(program);
        this.asynchronous = !synchronous;

        if (synchronous) {
            while (this.pc < this.instructions.length) {
                this.runOneInstruction();
            }
        } else {
            this.interval = setInterval(globalMachine.runSome.bind(globalMachine), this.INTERVAL_MS);
        }
    },

    suspend: function () {
        this.suspended = true;
        if (this.asynchronous) {
            clearInterval(this.interval);
        }
    },

    resume: function () {
        this.suspended = false;
        if (this.asynchronous) {
            this.interval = setInterval(globalMachine.runSome.bind(globalMachine), this.INTERVAL_MS);
        }
    },

    runSome: function () {
        var start = new Date().getTime();

        for (var i = 0; i < this.instructionsPerInterval && this.pc < this.instructions.length && !this.suspended; i++) {
            var instr = this.instructions[this.pc++];
            if (this.debug) {
                this.trace.printf("Execute [%s] %s\n", this.pc - 1, instr);
            }
            instr.instr.execute(this, instr.arg);
        }

        if (this.pc === this.instructions.length) {
            clearInterval(this.interval);
        }
    },

    runOneInstruction: function () {
        var instr = this.instructions[this.pc++];
        instr.instr.execute(this, instr.arg);
    },

    setVariable: function (name, value) {
        if (this.shared[name]) {
            this.callstack[0].variables[name] = value;
        } else {
            this.frame.variables[name] = value;
        }
    },

    getVariable: function (name) {
        var frame;
        if (this.shared[name]) {
            frame = this.callstack[0];
        } else {
            frame = this.frame;
        }

        if (frame.variables[name]) {
            return frame.variables[name];
        } else {
            var typeName = DeriveTypeNameFromVariable(name);
            var type;
            if (typeName === null) {
                type = this.defaultType;
            } else {
                type = this.types[typeName];
            }

            var scalar = new ScalarVariable(type, type.createInstance());
            frame.variables[name] = scalar;
            return scalar;
        }
    },

    printStack: function () {
        for (var i = 0; i < this.stack.length; i++) {
            var item = this.stack[i];
            var name = item;
            if (name == "ScalarVariable") {
                name += " " + item.value;
            }
            this.trace.printf("stack[%s]: %s\n", i, name);
        }
    },

    pushScalar: function (value, typeName) {
        this.stack.push(new ScalarVariable(this.types[typeName], value));
    }
};

var SystemFunctions = {
    RND: {
        type: "SINGLE",
        args: ["INTEGER"],
        minArgs: 0,
        action: function (vm) {
            var numArgs = vm.stack.pop();
            var n = 1;
            if (numArgs == 1) {
                n = vm.stack.pop();
            }
            if (n === 0) {
                vm.stack.push(vm.lastRandomNumber);
            } else {
                vm.stack.push(Math.random());
            }
        }
    },

    CHR$: {
        type: "STRING",
        args: ["INTEGER"],
        minArgs: 1,
        action: function (vm) {
            var num = vm.stack.pop();
            vm.stack.push(String.fromCharCode(num));
        }
    },

    INKEY$: {
        type: "STRING",
        args: [],
        minArgs: 0,
        action: function (vm) {
            var code = vm.cons.getKeyFromBuffer();
            var result = "";

            if (code != -1) {
                result = String.fromCharCode(code);
                if (code === 0) {
                    result += String.fromCharCode(vm.cons.getKeyFromBuffer());
                }
            }

            vm.stack.push(result);
        }
    },

    LEN: {
        type: "INTEGER",
        args: ["STRING"],
        minArgs: 1,
        action: function (vm) {
            vm.stack.push(vm.stack.pop().length);
        }
    },

    MID$: {
        type: "STRING",
        args: ["STRING", "INTEGER", "INTEGER"],
        minArgs: 2,
        action: function (vm) {
            var numArgs = vm.stack.pop();
            var len;
            if (numArgs == 3) {
                len = vm.stack.pop();
            }
            var start = vm.stack.pop();
            var str = vm.stack.pop();
            vm.stack.push(str.substr(start - 1, len));
        }
    },

    LEFT$: {
        type: "STRING",
        args: ["STRING", "INTEGER"],
        minArgs: 2,
        action: function (vm) {
            var num = vm.stack.pop();
            var str = vm.stack.pop();
            vm.stack.push(str.substr(0, num));
        }
    },

    RIGHT$: {
        type: "STRING",
        args: ["STRING", "INTEGER"],
        minArgs: 2,
        action: function (vm) {
            var num = vm.stack.pop();
            var str = vm.stack.pop();
            vm.stack.push(str.substr(str.length - num));
        }
    },

    TIMER: {
        type: "INTEGER",
        args: [],
        minArgs: 0,
        action: function (vm) {
            var date = new Date();

            var result = date.getMilliseconds() / 1000 + date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;

            vm.stack.push(result);
        }
    },

    PEEK: {
        type: "INTEGER",
        args: ["INTEGER"],
        minArgs: 1,
        action: function (vm) {
            vm.stack.pop();
            vm.stack.push(0);
        }
    },

    LCASE$: {
        type: "STRING",
        args: ["STRING"],
        minArgs: 1,
        action: function (vm) {
            var str = vm.stack.pop();
            vm.stack.push(str.toLowerCase());
        }
    },

    UCASE$: {
        type: "STRING",
        args: ["STRING"],
        minArgs: 1,
        action: function (vm) {
            vm.stack.push(vm.stack.pop().toUpperCase());
        }
    },

    STR$: {
        type: "STRING",
        args: ["SINGLE"],
        minArgs: 1,
        action: function (vm) {
            var num = vm.stack.pop();
            vm.stack.push("" + num);
        }
    },

    SPACE$: {
        type: "STRING",
        args: ["INTEGER"],
        minArgs: 1,
        action: function (vm) {
            var numSpaces = vm.stack.pop();
            var str = "";
            for (var i = 0; i < numSpaces; i++) {
                str += " ";
            }
            vm.stack.push(str);
        }
    },

    VAL: {
        type: "SINGLE",
        args: ["STRING"],
        minArgs: 1,
        action: function (vm) {
            vm.stack.push(parseFloat(vm.stack.pop()));
        }
    },

    INT: {
        type: "INTEGER",
        args: ["SINGLE"],
        minArgs: 1,
        action: function (vm) {
            vm.stack.push(Math.floor(vm.stack.pop()));
        }
    }
};

var SystemSubroutines = {
    BEEP: {
        action: function (vm) {}
    },

    CLS: {
        action: function (vm) {
            console.clear();
        }
    },

    RANDOMIZE: {
        action: function (vm) {
            vm.stack.pop();
        }
    },

    PLAY: {
        action: function (vm) {
            vm.stack.pop();
        }
    },

    SLEEP: {
        action: function (vm) {
            vm.stack.pop();
        }
    },

    SYSTEM: {
        action: function (vm) {}
    },

    print_using: {
        action: function (vm) {
            var argCount = vm.stack.pop();

            var terminator = vm.stack.pop();

            var args = [];
            for (var i = 0; i < argCount - 1; i++) {
                args.unshift(vm.stack.pop());
            }

            var formatString = args.shift().value;

            var curArg = 0;
            var output = "";

            for (var pos = 0; pos < formatString.length; pos++) {
                var ch = formatString.charAt(pos);

                if (ch === "#") {
                    if (curArg === args.length || !IsNumericType(args[curArg].type)) {
                        dbg.printf("Type mismatch error.\n");
                        break;
                    }

                    var backup_pos = pos;
                    var digitCount = 0;

                    for (; pos < formatString.length; pos++) {
                        ch = formatString.charAt(pos);

                        if (ch === "#") {
                            digitCount++;
                        } else if (ch === ",") {
                        } else {
                            break;
                        }
                    }

                    var argAsString = "" + args[curArg].value;
                    if (argAsString.length > digitCount) {
                        argAsString = argAsString.substr(argAsString.length - digitCount);
                    } else {
                        while (argAsString.length < digitCount) {
                            argAsString = " " + argAsString;
                        }
                    }

                    var curDigit = 0;

                    for (pos = backup_pos; pos < formatString.length; pos++) {
                        ch = formatString.charAt(pos);

                        if (ch === "#") {
                            output += argAsString[curDigit++];
                        } else if (ch === ",") {
                            output += ch;
                        } else {
                            break;
                        }
                    }

                    curArg += 1;
                    pos -= 1;
                } else {
                    output += ch;
                }
            }

            vm.cons.print(output);
            if (terminator === ",") {
                var x = vm.cons.x;
                var spaces = "";
                while (++x % 14) {
                    spaces += " ";
                }
                vm.cons.print(spaces);
            } else if (terminator !== ";") {
                vm.cons.print("\n");
            }
        }
    },

    LOCATE: {
        args: ["INTEGER", "INTEGER"],
        action: function (vm) {
            var col = vm.stack.pop().value;
            var row = vm.stack.pop().value;
            vm.cons.locate(row, col);
        }
    },

    COLOR: {
        args: ["ANY", "ANY"],
        minArgs: 1,
        action: function (vm) {
            var argCount = vm.stack.pop();

            var bg = null;
            if (argCount == 2) {
                bg = vm.stack.pop().value;
            }
            var fg = vm.stack.pop().value;
            vm.cons.color(fg, bg);
        }
    },

    READ: {
        args: ["ANY", "ANY"],
        minArgs: 1,
        action: function (vm) {
            var argCount = vm.stack.pop();
            var args = [];
            var i;

            for (i = 0; i < argCount; i++) {
                args.unshift(vm.stack.pop());
            }

            for (i = 0; i < argCount; i++) {
                vm.trace.printf("READ %s\n", vm.data[vm.dataPtr]);
                args[i].value = vm.data[vm.dataPtr++];
                if (args[i].value === null) {
                    args[i].value = args[i].type.createInstance();
                }
            }
        }
    },

    SCREEN: {
        action: function (vm) {
            vm.stack.pop();
        }
    },

    INPUT: {
        action: function (vm) {
            var argCount = vm.stack.pop();
            var args = [];

            vm.trace.printf("Argcount=%s\n", argCount);

            for (var i = 0; i < argCount; i++) {
                args.unshift(vm.stack.pop());
            }

            vm.suspend();

            vm.cons.input(function (result) {
                vm.resume();
                args[0].value = result;
            });
        }
    },

    SWAP: {
        action: function (vm) {
            var lhs = vm.stack.pop();
            var rhs = vm.stack.pop();
            var temp = lhs.value;
            lhs.value = rhs.value;
            rhs.value = temp;
        }
    },

    WIDTH: {
        action: function (vm) {
            vm.stack.pop();
            vm.stack.pop();
        }
    }
};

var Instructions = {
    FORLOOP: {
        name: "forloop",
        addrLabel: true,
        execute: function (vm, arg) {
            var counter = vm.stack[vm.stack.length - 1];
            var step = vm.stack[vm.stack.length - 2];
            var end = vm.stack[vm.stack.length - 3];

            if ((step < 0 && counter < end) || (step > 0 && counter > end)) {
                vm.stack.length -= 3;
                vm.pc = arg;
            } else {
                vm.stack.pop();
            }
        }
    },

    COPYTOP: {
        name: "copytop",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack[vm.stack.length - 1]);
        }
    },

    RESTORE: {
        name: "restore",
        dataLabel: true,
        execute: function (vm, arg) {
            if (vm.debug) {
                vm.trace.printf("RESTORE to %s\n", arg);
            }
            vm.dataPtr = arg;
        }
    },

    POPVAL: {
        name: "popval",
        execute: function (vm, arg) {
            vm.getVariable(arg).value = vm.stack.pop();
        }
    },

    POP: {
        name: "pop",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.pop();
        }
    },

    PUSHREF: {
        name: "pushref",
        execute: function (vm, arg) {
            vm.stack.push(vm.getVariable(arg));
        }
    },

    PUSHVALUE: {
        name: "pushvalue",
        execute: function (vm, arg) {
            vm.stack.push(vm.getVariable(arg).value);
        }
    },

    PUSHTYPE: {
        name: "pushtype",
        execute: function (vm, arg) {
            vm.stack.push(vm.types[arg]);
        }
    },

    POPVAR: {
        name: "popvar",
        execute: function (vm, arg) {
            vm.setVariable(arg, vm.stack.pop());
        }
    },

    NEW: {
        name: "new",
        execute: function (vm, arg) {
            var type = vm.types[arg];
            vm.stack.push(new ScalarVariable(type, type.copy(vm.stack.pop())));
        }
    },

    END: {
        name: "end",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.pc = vm.instructions.length;
        }
    },

    UNARY_OP: {
        name: "unary_op",
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var value;
            if (arg == "NOT") {
                value = ~rhs;
            } else {
                vm.trace.printf("No such unary operator: %s\n", arg);
            }

            vm.stack.push(value);
        }
    },

    "=": {
        name: "=",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack.pop() === vm.stack.pop() ? -1 : 0);
        }
    },

    "<": {
        name: "<",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs < rhs ? -1 : 0);
        }
    },

    "<=": {
        name: "<=",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs <= rhs ? -1 : 0);
        }
    },

    ">": {
        name: ">",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs > rhs ? -1 : 0);
        }
    },

    ">=": {
        name: ">=",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs >= rhs ? -1 : 0);
        }
    },

    "<>": {
        name: "<>",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack.pop() !== vm.stack.pop() ? -1 : 0);
        }
    },

    AND: {
        name: "and",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack.pop() & vm.stack.pop());
        }
    },

    OR: {
        name: "or",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack.pop() | vm.stack.pop());
        }
    },

    "+": {
        name: "+",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs + rhs);
        }
    },

    "-": {
        name: "-",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs - rhs);
        }
    },

    "*": {
        name: "*",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.stack.push(vm.stack.pop() * vm.stack.pop());
        }
    },

    "/": {
        name: "/",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs / rhs);
        }
    },

    MOD: {
        name: "mod",
        numArgs: 0,
        execute: function (vm, arg) {
            var rhs = vm.stack.pop();
            var lhs = vm.stack.pop();
            vm.stack.push(lhs % rhs);
        }
    },

    BZ: {
        name: "bz",
        addrLabel: true,
        execute: function (vm, arg) {
            var expr = vm.stack.pop();
            if (!expr) {
                vm.pc = arg;
            }
        }
    },

    BNZ: {
        name: "bnz",
        addrLabel: true,
        execute: function (vm, arg) {
            var expr = vm.stack.pop();
            if (expr) {
                vm.pc = arg;
            }
        }
    },

    JMP: {
        name: "jmp",
        addrLabel: true,
        execute: function (vm, arg) {
            vm.pc = arg;
        }
    },

    CALL: {
        name: "call",
        addrLabel: true,
        execute: function (vm, arg) {
            vm.frame = new StackFrame(vm.pc);
            vm.callstack.push(vm.frame);
            vm.pc = arg;
        }
    },

    GOSUB: {
        name: "gosub",
        addrLabel: true,
        execute: function (vm, arg) {
            var oldvariables = vm.frame.variables;
            vm.frame = new StackFrame(vm.pc);
            vm.frame.variables = oldvariables;
            vm.callstack.push(vm.frame);
            vm.pc = arg;
        }
    },

    RET: {
        name: "ret",
        numArgs: 0,
        execute: function (vm, arg) {
            vm.pc = vm.callstack.pop().pc;
            vm.frame = vm.callstack[vm.callstack.length - 1];
        }
    },

    PUSHCONST: {
        name: "pushconst",
        execute: function (vm, arg) {
            vm.stack.push(arg);
        }
    },

    ARRAY_DEREF: {
        name: "array_deref",
        numArgs: 1,
        execute: function (vm, arg) {
            var variable = vm.stack.pop();

            var indexes = [];

            for (var i = 0; i < variable.dimensions.length; i++) {
                indexes.unshift(vm.stack.pop());
            }

            if (arg) {
                vm.stack.push(variable.access(indexes));
            } else {
                vm.stack.push(variable.access(indexes).value);
            }
        }
    },

    MEMBER_DEREF: {
        name: "member_deref",
        execute: function (vm, arg) {
            var userVariable = vm.stack.pop();
            var deref = userVariable[arg];

            vm.stack.push(deref);
        }
    },

    MEMBER_VALUE: {
        name: "member_value",
        execute: function (vm, arg) {
            var userVariable = vm.stack.pop();
            var deref = userVariable[arg];

            vm.stack.push(deref.value);
        }
    },

    ASSIGN: {
        name: "assign",
        numArgs: 0,
        execute: function (vm, arg) {
            var lhs = vm.stack.pop();
            var rhs = vm.stack.pop();

            lhs.value = lhs.type.copy(rhs);
        }
    },

    SYSCALL: {
        name: "syscall",
        execute: function (vm, arg) {
            var variable;
            var type;
            var x;
            var spaces;
            var i;

            if (vm.debug) {
                vm.trace.printf("Execute syscall %s\n", arg);
            }
            if (arg == "print") {
                var num = 1;
                for (i = 0; i < num; i++) {
                    var what = vm.stack.pop();
                    if (vm.debug) {
                        vm.trace.printf("printing %s\n", what);
                    }
                    vm.cons.print("" + what);
                }
            } else if (arg == "alloc_array") {
                type = vm.stack.pop();
                var numDimensions = vm.stack.pop();
                var dimensions = [];
                for (i = 0; i < numDimensions; i++) {
                    var upper = vm.stack.pop();
                    var lower = vm.stack.pop();
                    dimensions.unshift(new Dimension(lower, upper));
                }

                variable = new ArrayVariable(type, dimensions);
                vm.stack.push(variable);
            } else if (arg == "print_comma") {
                x = vm.cons.x;
                spaces = "";
                while (++x % 14) {
                    spaces += " ";
                }
                vm.cons.print(spaces);
            } else if (arg == "print_tab") {
                var col = vm.stack.pop() - 1;
                x = vm.cons.x;
                spaces = "";
                while (++x < col) {
                    spaces += " ";
                }
                vm.cons.print(spaces);
            } else if (arg == "alloc_scalar") {
                type = vm.stack.pop();
                variable = new ScalarVariable(type, type.createInstance());
                vm.stack.push(variable);
            } else if (SystemFunctions[arg]) {
                SystemFunctions[arg].action(vm);
            } else if (SystemSubroutines[arg]) {
                SystemSubroutines[arg].action(vm);
            } else {
                vm.cons.print("Unknown syscall: " + arg);
            }
        }
    }
};

function TypeScope() {
    this.names = {};
}

TypeScope.prototype = {};

function CheckedLabel(name, astNode) {
    this.name = name;
    this.astNode = astNode;
}

function CheckedLoopContext(type, counter) {
    this.type = type;

    this.counter = counter;
}

function TypeChecker(errors) {
    this.declaredSubs = {};
    this.declaredSubs._main = new AstDeclareFunction(new Locus(0, 0), "_main", [], false);

    this.errors = errors;
    this.scopes = [new TypeScope()];
    this.shared = new TypeScope();

    this.labelsUsed = [];
    this.labelsDefined = {};

    this.types = {
        INTEGER: new IntegerType(),
        SINGLE: new SingleType(),
        DOUBLE: new DoubleType(),
        STRING: new StringType(),
        ANY: new AnyType(),
        ":NULL": new NullType()
    };

    this.defaultType = this.types.SINGLE;

    this.loopStack = [];
}

TypeChecker.prototype = {
    error: function () {
        var object = arguments[0];
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var errorStr = "Error at " + object.locus + ": " + sprintf(args);
        this.errors.push(errorStr);
        dbg.print(this.errors.join("\n"));
    },

    removeSuffix: function (name) {
        switch (name[name.length - 1]) {
            case "%":
            case "$":
            case "!":
            case "&":
            case "#":
                return name.substr(0, name.length - 1);
            default:
                return name;
        }
    },

    getTypeFromVariableName: function (name) {
        var type = this.scopes[0].names[name];
        if (type !== undefined) {
            return type;
        }
        type = this.shared.names[name];
        if (type !== undefined) {
            return type;
        }

        type = DeriveTypeNameFromVariable(name);
        if (type !== null) {
            return this.types[type];
        }

        return this.defaultType;
    },

    visitProgram: function (program) {
        var i;
        for (i = 0; i < program.subs.length; i++) {
            program.subs[i].accept(this);
        }

        for (i = 0; i < this.labelsUsed.length; i++) {
            var label = this.labelsUsed[i];
            if (this.labelsDefined[label.name] === undefined) {
                this.error(label.astNode, "Label %s is not defined", label.name);
            }
        }

        for (var name in this.declaredSubs) {
            var func = this.declaredSubs[name];
            if (!func.hasBody && func.used) {
                this.error(func, "SUB or FUNCTION '%s' has no body", name);
            }
        }
    },

    visitDeclareFunction: function (declare) {
        if (this.declaredSubs[declare.name] !== undefined) {
            this.error(declare, "Subroutine %s is already declared on line %s", declare.name, this.declaredSubs[declare.name].locus.line + 1);
        }

        this.declaredSubs[declare.name] = declare;
        declare.args.accept(this);
        if (declare.isFunction) {
            declare.type = this.getTypeFromVariableName(declare.name);
        }
    },

    visitSubroutine: function (sub) {
        var i;
        var self = this;

        function subError(declare) {
            self.error(sub, "Sub or function %s does not match declaration on " + "line %s", sub.name, declare.locus.line + 1);
        }

        if (this.declaredSubs[sub.name] === undefined) {
            this.error(sub, "Subroutine %s is not declared", sub.name);
        } else {
            var declare = this.declaredSubs[sub.name];

            if (declare.isFunction != sub.isFunction) {
                subError(declare);
            }

            if (sub.args.length != declare.args.length) {
                subError(declare);
            } else {
                for (i = 0; i < sub.args.length; i++) {
                    if ((sub.args[i].typeName != declare.args[i].typeName && declare.args[i].typeName != "ANY") || sub.args[i].isArray != declare.args[i].isArray) {
                        subError(declare);
                    }
                }
            }

            declare.hasBody = true;
        }

        this.scopes.unshift(new TypeScope());

        for (i = 0; i < sub.args.length; i++) {
            sub.args[i].accept(this);
            this.scopes[0].names[sub.args[i].name] = sub.args[i].type;
        }

        for (i = 0; i < sub.statements.length; i++) {
            if (!sub.statements[i]) {
                continue;
            }

            if (sub.statements[i].accept === undefined) {
                dbg.printf("ERROR: Could not visit object of type %s\n", sub.statements[i]);
            } else {
                sub.statements[i].accept(this);
            }
        }

        this.scopes.shift();
    },
    checkCallArguments: function (declare, args) {
        declare.used = true;
        if (declare.args.length != args.length) {
            this.error(declare, "Wrong number of arguments");
        } else {
            for (var i = 0; i < args.length; i++) {
                args[i].wantRef = true;
                args[i].accept(this);
                if (!AreTypesCompatible(args[i].type, declare.args[i].type)) {
                    this.error(
                        args[i],
                        "Type mismatch in argument %d of call to %s." + " Expected %s but got %s",
                        i + 1,
                        declare.name,
                        declare.args[i].type.name,
                        args[i].type.name
                    );
                }
            }
        }
    },

    visitCallStatement: function (call) {
        if (SystemSubroutines[call.name] !== undefined) {
            for (var i = 0; i < call.args.length; i++) {
                call.args[i].wantRef = true;
                call.args[i].accept(this);
            }
            return;
        }

        var declare = this.declaredSubs[call.name];

        if (declare === undefined) {
            this.error(call, "Call to undefined sub '%s'", call.name);
        } else {
            this.checkCallArguments(declare, call.args);
        }
    },

    visitArgument: function (argument) {
        var type;

        if (argument.typeName) {
            type = this.types[argument.typeName];
            if (type === undefined) {
                this.error(argument, "Type %s is not defined", argument.typeName);
                type = new UserType(argument.typeName, {});
                this.types[argument.typeName] = type;
            }
        } else {
            type = this.getTypeFromVariableName(argument.name);
        }

        if (argument.isArray) {
            type = new ArrayType(type);
        }

        argument.type = type;
    },

    visitPrintStatement: function (print) {
        print.printItems.accept(this);
    },

    visitPrintUsingStatement: function (printUsing) {
        for (var i = 0; i < printUsing.exprList.length; i++) {
            printUsing.exprList[i].wantRef = true;
            printUsing.exprList[i].accept(this);

            if (i === 0 && !IsStringType(printUsing.exprList[i].type)) {
                this.error(printUsing.exprList[i], "Format string must be STRING, not %s", printUsing.exprList[i].type.name);
            } else if (i > 0 && !IsStringType(printUsing.exprList[i].type) && !IsNumericType(printUsing.exprList[i].type)) {
                this.error(printUsing.exprList[i], "Type Mismatch Error");
            }
        }

        if (printUsing.exprList.length === 0) {
            this.error(printUsing, "PRINT USING requires at least one argument");
        }
    },

    visitPrintItem: function (item) {
        if (item.expr === null) {
            return;
        }
        item.expr.accept(this);
        if (!IsNumericType(item.expr.type) && !IsStringType(item.expr.type)) {
            this.error(item.expr, "Expected string or number, but got '%s'", item.expr.type.name);
        }
    },
    visitNoopItem: function (item) {
        if (item.expr === null) {
            return;
        }
        item.expr.accept(this);
    },

    visitInputStatement: function (input) {
        if (input.promptExpr) {
            input.promptExpr.accept(this);
            if (!IsStringType(input.promptExpr.type)) {
                this.error(input, "Prompt must be a string");
            }
        }

        for (var i = 0; i < input.identifiers.length; i++) {
            var type = this.getTypeFromVariableName(input.identifiers[i]);
            if (!IsNumericType(type) && !IsStringType(type)) {
                this.error(input, "Identifier '%s' should be string or numeric.", input.identifiers.type);
            }
        }
    },

    visitNullStatement: function (argument) {},

    visitEndStatement: function (argument) {},

    visitForLoop: function (loop) {
        if (!IsNumericType(this.getTypeFromVariableName(loop.identifier))) {
            this.error(loop, "Loop counter must be a number");
        }

        loop.startExpr.wantRef = true;
        loop.startExpr.accept(this);
        loop.endExpr.accept(this);
        loop.stepExpr.accept(this);

        if (!IsNumericType(loop.startExpr.type) || !IsNumericType(loop.endExpr.type) || !IsNumericType(loop.stepExpr.type)) {
            this.error(loop, "Loop expression must be a number.");
        }

        this.loopStack.unshift(new CheckedLoopContext("FOR", loop.identifier));
    },

    visitNextStatement: function (next) {
        for (var i = 0; i < next.identifiers.length; i++) {
            if (this.loopStack.length === 0) {
                this.error(next, "NEXT without FOR");
                break;
            }
            if (this.loopStack[0].type !== "FOR") {
                this.error(next, "NEXT without FOR");
                break;
            }
            if (next.identifiers[i] != this.loopStack[0].counter) {
                this.error(next, "Mismatched loop counter '%s' in NEXT", next.identifiers[i]);
            }
            this.loopStack.shift();
        }

        if (next.identifiers.length === 0) {
            if (this.loopStack.length === 0) {
                this.error(next, "NEXT without FOR");
            } else {
                this.loopStack.shift();
            }
        }
    },

    visitExitStatement: function (exit) {
        if (exit.what && exit.what != "FOR" && exit.what != "DO" && exit.what != "WHILE") {
            this.error(exit, "EXIT %s not supported", exit.what);
        }
        if (this.loopStack.length === 0) {
            this.error(exit, "EXIT without loop not supported");
        }
        if (exit.what && exit.what != this.loopStack[0].type) {
            this.error(exit, "MISMATCHED EXIT. Expected: '%s'", this.loopStack[0].type);
        }
    },

    visitArrayDeref: function (ref) {
        var i;
        ref.expr.accept(this);

        if (ref.expr instanceof AstVariableReference && this.declaredSubs[ref.expr.name]) {
            var declare = this.declaredSubs[ref.expr.name];
            if (!declare.isFunction) {
                this.error(ref, "Tried to call non-function '%s'", ref.expr.name);
            }

            this.checkCallArguments(declare, ref.parameters);
            ref.type = declare.type;
            return;
        }
        if (ref.expr instanceof AstVariableReference && SystemFunctions[ref.expr.name] !== undefined) {
            var func = SystemFunctions[ref.expr.name];
            ref.type = this.types[func.type];
            ref.parameters.accept(this);

            if (ref.parameters.length < func.minArgs || ref.parameters.length > func.args.length) {
                this.error(ref, "Function '%s' called with wrong number of " + "arguments", func.name);
            } else {
                for (i = 0; i < ref.parameters.length; i++) {
                    if (!AreTypesCompatible(ref.parameters[i].type, this.types[func.args[i]])) {
                        this.error(ref, "Argument %d to '%s' function is of " + "type '%s', but '%s' expected", i + 1, func.name, ref.parameters[i].type.name, func.args[i]);
                    }
                }
            }

            return;
        }

        for (i = 0; i < ref.parameters.length; i++) {
            ref.parameters[i].accept(this);
            if (!IsNumericType(ref.parameters[i].type)) {
                this.error(ref.parameters[i], "Array subscript must be numeric type");
            }
        }

        if (!IsArrayType(ref.expr.type)) {
            this.error(ref, "Subscript used on non-array '%s'", ref.expr.name);
            ref.type = this.types.INTEGER;
        } else if (ref.parameters.length === 0) {
            ref.type = ref.expr.type;
        } else {
            ref.type = ref.expr.type.elementType;
        }
    },

    visitMemberDeref: function (ref) {
        ref.lhs.accept(this);
        if (!IsUserType(ref.lhs.type)) {
            this.error(ref, "Tried to dereference non-user-type '%s'", ref.lhs.type.name);
            ref.type = this.types.SINGLE;
        } else {
            ref.type = ref.lhs.type.members[ref.identifier];
            if (ref.type === undefined) {
                this.error(ref, "Type '%s' does not contain member '%s'", ref.lhs.type.name, ref.identifier);
                ref.type = this.types.SINGLE;
            }
        }
    },

    visitVariableReference: function (ref) {
        var func;
        if (SystemFunctions[ref.name] !== undefined) {
            func = SystemFunctions[ref.name];
            ref.type = this.types[func.type];
        } else if (this.declaredSubs[ref.name] !== undefined) {
            func = this.declaredSubs[ref.name];
            if (!func.isFunction) {
                this.error(ref, "SUB '%s' used as a function", func.name);
                ref.type = this.types.SINGLE;
            } else {
                ref.type = func.type;
            }
        } else {
            ref.type = this.getTypeFromVariableName(ref.name);
        }
    },

    visitRange: function (range) {
        range.lowerExpr.accept(this);
        range.upperExpr.accept(this);

        if (!IsNumericType(range.lowerExpr.type) || !IsNumericType(range.upperExpr.type)) {
            this.error(range, "Expected a number.");
        }
    },

    visitDataStatement: function (argument) {},

    visitReturnStatement: function (returnStatement) {},

    visitRestoreStatement: function (restore) {
        if (restore.label) {
            this.labelsUsed.push(new CheckedLabel(restore.label, restore));
        }
    },

    visitConstStatement: function (constStatement) {
        if (constStatement.name in this.shared.names) {
            this.error(constStatement, "Redeclared variable '%s'", constStatement.name);
        }

        constStatement.expr.accept(this);

        this.shared.names[constStatement.name] = constStatement.expr.type;
    },

    visitDefTypeStatement: function (def) {
        this.defaultType = this.types[def.typeName];
    },

    visitDimStatement: function (dim) {
        var type;
        if (dim.typeName) {
            type = this.types[dim.typeName];
            if (type === undefined) {
                this.error(dim, "Type '%s' is not defined", dim.typeName);
            }
        }

        if (!type) {
            type = this.getTypeFromVariableName(dim.name);
        }

        for (var i = 0; i < dim.ranges.length; i++) {
            dim.ranges[i].accept(this);
        }

        if (dim.ranges.length) {
            type = new ArrayType(type);
        }

        if (dim.shared) {
            this.shared.names[dim.name] = type;
        } else {
            this.scopes[0].names[dim.name] = type;
        }
    },

    visitDoStatement: function (loop) {
        if (loop.expr) {
            loop.expr.accept(this);
        }
        if (loop.expr !== null && !IsNumericType(loop.expr.type)) {
            this.error(loop, "Loop expression must be numeric");
        }

        this.loopStack.unshift(new CheckedLoopContext("DO", null));
        loop.statements.accept(this);
        this.loopStack.shift();
    },

    visitWhileLoop: function (loop) {
        loop.expr.accept(this);
        if (!IsNumericType(loop.expr.type)) {
            this.error(loop, "Loop expression must be numeric");
        }

        this.loopStack.unshift(new CheckedLoopContext("WHILE", null));
        loop.statements.accept(this);
        this.loopStack.shift();
    },

    visitIfStatement: function (ifStatement) {
        ifStatement.expr.accept(this);
        if (!IsNumericType(ifStatement.expr.type)) {
            this.error(ifStatement, "Expected numeric expression");
        }

        ifStatement.statements.accept(this);
        if (ifStatement.elseStatements) {
            ifStatement.elseStatements.accept(this);
        }
    },

    visitSelectStatement: function (select) {
        select.expr.accept(this);
        if (!IsNumericType(select.expr.type) && !IsStringType(select.expr.type)) {
            this.error(select, "Select expression must be numeric or string");
        }

        for (var i = 0; i < select.cases.length; i++) {
            var caseStatement = select.cases[i];
            caseStatement.accept(this);

            for (var j = 0; j < caseStatement.exprList.length; j++) {
                if (!AreTypesCompatible(select.expr.type, caseStatement.exprList[j].type)) {
                    this.error(caseStatement, "CASE expression cannot be compared with SELECT");
                }
            }
        }
    },

    visitCaseStatement: function (caseStatement) {
        caseStatement.exprList.accept(this);
        caseStatement.statements.accept(this);
    },

    visitTypeMember: function (member) {
        var type;

        if (member.typeName) {
            type = this.types[member.typeName];
            if (type === undefined) {
                this.error(member, "Undefined type '%s'", member.typeName);
            }
        }

        if (type === undefined) {
            type = this.getTypeFromVariableName(member.name);
        }
        member.type = type;
    },

    visitUserType: function (userType) {
        if (this.types[userType.name] !== undefined) {
            this.error(userType, "Typename '%s' already defined", userType.name);
        }

        var members = {};
        for (var i = 0; i < userType.members.length; i++) {
            userType.members[i].accept(this);
            if (members[userType.members[i].name] !== undefined) {
                this.error(userType.members[i], "Type member '%s' already defined", userType.members[i].name);
            }

            members[userType.members[i].name] = userType.members[i].type;
        }

        this.types[userType.name] = new UserType(userType.name, members);
    },

    visitGotoStatement: function (gotoStatement) {
        this.labelsUsed.push(new CheckedLabel(gotoStatement.label, gotoStatement));
    },

    visitGosub: function (gosub) {
        this.labelsUsed.push(new CheckedLabel(gosub.label, gosub));
    },

    visitLabel: function (label) {
        if (this.labelsDefined[label.label] !== undefined) {
            this.error(label, "Label '%s' is already defined", label.label);
        }

        this.labelsDefined[label.label] = new CheckedLabel(label.label, label);
    },

    visitAssignStatement: function (assign) {
        assign.lhs.wantRef = true;
        assign.lhs.accept(this);
        assign.expr.accept(this);
        if (!AreTypesCompatible(assign.lhs.type, assign.expr.type)) {
            this.error(assign, "Tried to assign type '%s' to type '%s'", assign.expr.type.name, assign.lhs.type.name);
        }
    },

    visitBinaryOp: function (binary) {
        var op = binary.op;
        binary.lhs.accept(this);
        binary.rhs.accept(this);
        var bad = 0;
        var type = binary.lhs.type;

        if (!AreTypesCompatible(binary.lhs.type, binary.rhs.type)) {
            bad = 1;
        }

        if (IsStringType(binary.lhs.type)) {
            bad |= op != "+" && op != "<" && op != ">" && op != "<>" && op != "=";
        }

        if (IsUserType(binary.lhs.type)) {
            bad |= op != "=";
        }

        if (op == "=" || op == "<>" || op == "<" || op == "<=" || op == ">=") {
            type = this.types.INTEGER;
        }

        if (IsArrayType(binary.lhs.type)) {
            bad |= 1;
        }

        if (bad) {
            this.error(binary, "Incompatible types for '%s' operator: %s,%s", binary.op, binary.lhs.type.name, binary.rhs.type.name);
        }

        binary.type = type;
    },

    visitUnaryOperator: function (unary) {
        unary.expr.accept(this);
        if (!IsNumericType(unary.expr.type)) {
            this.error(unary, "Incompatible type for '%s' operator", unary.op);
        }
        unary.type = unary.expr.type;
    },

    visitConstantExpr: function (expr) {
        if (expr.value === null) {
            expr.type = this.types[":NULL"];
        } else if (expr.value.constructor == String) {
            expr.type = this.types.STRING;
        } else {
            expr.type = this.types.SINGLE;
        }
    }
};

var NextId = 0;
function EarleyItem(rule, position, base, token, prev, locus) {
    this.id = NextId++;
    this.rule = rule;
    this.pos = position;
    this.base = base;
    this.token = token;
    this.prev = prev;
    this.locus = locus;
}

EarleyItem.prototype = {
    toString: function () {
        var str = "[" + this.id + "] " + this.rule.name + ":";
        for (var i = 0; i < this.rule.symbols.length; i++) {
            if (i == this.pos) {
                str += " .";
            }
            str += " " + this.rule.symbols[i];
        }

        if (i == this.pos) {
            str += " .";
        }
        str += ", " + this.base;
        if (this.token instanceof Token) {
            str += ", token=" + this.token.text;
        } else if (this.token) {
            str += ", rule=" + this.token.rule;
        }
        if (this.prev) {
            str += ", prev=" + this.prev.id;
        }
        return str;
    }
};

function EarleyParser(ruleSet) {
    this.tokenizer = ruleSet.createTokenizer();
    this.EPSILON = ruleSet.EPSILON;

    ruleSet.computeFirst();

    this.rules = ruleSet.rules;
    this.first = ruleSet.first;
}

EarleyParser.prototype = {
    getNonTerminal: function (name) {
        return this.rules[name];
    },

    getRegexFromTerminal: function (terminal) {
        return terminal.substr(1, terminal.length - 2);
    },

    isTerminal: function (symbol) {
        return symbol !== undefined && symbol[0] == "'";
    },

    isNonTerminal: function (symbol) {
        return symbol !== undefined && symbol[0] != "'";
    },

    parse: function (text) {
        var states = [[new EarleyItem(this.rules._start[0], 0, 0)]];

        var line = 0;
        var position = 0;
        var j;
        this.tokenizer.setText(text);

        this.errors = [];

        for (var i = 0; ; i++) {
            var token = this.tokenizer.nextToken(line, position);
            if (token === null) {
                this.errors.push(sprintf("Bad token at %d:%d\n", line, position));
                dbg.printf("Bad token!\n");
                return null;
            } else if (this.debug) {
                dbg.printf("Got token %s at %s\n", token, token.locus);
            }
            this.locus = token.locus;

            states.push([]);
            var processedTo = 0;
            while (processedTo < states[i].length) {
                this.predict(states[i], processedTo, i, token);
                this.complete(states, i, processedTo, i);
                processedTo++;
            }

            this.scan(states, i, token);

            if (states[i].length === 0) {
                this.errors.push(sprintf("Syntax error at %s: %s", this.locus, token));
                for (j = 0; j < states[i - 1].length; j++) {
                    this.errors.push(sprintf("    %s\n", states[i - 1][j]));
                }
                break;
            }

            if (this.debug) {
                this.printState(states, i);
            }

            line = token.locus.line;
            position = token.locus.position + token.text.length;

            if (token.id === this.tokenizer.EOF_TOKEN) {
                i++;
                break;
            }
        }

        if (this.debug) {
            this.printState(states, i);
        }
        if (states[i].length) {
            return this.evaluate(states[i][0]);
        }

        this.errors.push(sprintf("Syntax error at %s", this.locus));
        for (j = 0; j < states[i - 1].length; j++) {
            this.errors.push(sprintf("    %s\n", states[i - 1][j]));
        }
        return null;
    },

    predict: function (items, index, base, token) {
        var item = items[index];
        if (this.isNonTerminal(item.rule.symbols[item.pos])) {
            var nonTerminal = this.getNonTerminal(item.rule.symbols[item.pos]);
            for (var i = 0; i < nonTerminal.length; i++) {
                var rule = nonTerminal[i];
                if (rule.symbols.length === 0 || rule.symbols[0][0] === "'" || this.first[rule.symbols[0]][token.id] || this.first[rule.symbols[0]][this.EPSILON]) {
                    this.addToState(items, rule, 0, base, undefined, undefined);
                }
            }
        }
    },

    complete: function (states, i, index, base) {
        var item = states[i][index];
        if (item.pos == item.rule.symbols.length) {
            var baseItems = states[item.base];
            for (var j = 0; j < baseItems.length; j++) {
                if (baseItems[j].rule.symbols[baseItems[j].pos] == item.rule.name) {
                    this.addToState(states[i], baseItems[j].rule, baseItems[j].pos + 1, baseItems[j].base, item, baseItems[j]);
                }
            }
        }
    },

    scan: function (states, i, token) {
        var items = states[i];
        for (var j = 0; j < items.length; j++) {
            if (items[j].rule.symbols[items[j].pos] == token.id) {
                states[i + 1].push(new EarleyItem(items[j].rule, items[j].pos + 1, items[j].base, token, items[j], this.locus));
            }
        }
    },

    addToState: function (items, rule, pos, base, token, prev) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].rule === rule && items[i].pos === pos && items[i].base === base) {
                return;
            }
        }
        items.push(new EarleyItem(rule, pos, base, token, prev, this.locus));
    },

    printState: function (states, index) {
        if (!this.debug) {
            return;
        }
        var items = states[index];
        dbg.printf("State [%d]\n", index);
        for (var i = 0; i < items.length; i++) {
            dbg.printf("%s\n", items[i]);
        }
        dbg.printf("\n");
    },

    evaluate: function (item_in) {
        if (!item_in) {
            return;
        }

        var args = [];
        var item = item_in;
        var locus = item_in.locus;

        while (item) {
            if (item.token instanceof Token) {
                args.unshift(item.token.text);
            } else if (item.token) {
                args.unshift(this.evaluate(item.token));
            }
            locus = item.locus;
            item = item.prev;
        }

        var result;

        if (item_in.rule.action) {
            result = item_in.rule.action(args, locus);
        } else {
            result = args[0];
        }
        return result;
    }
};

function GlrItem(rule, position) {
    this.rule = rule;
    this.position = position;
    this.key = "r" + this.rule.id + "_" + this.position;
}

GlrItem.prototype = {
    toString: function () {
        var str = this.rule.name + ":";
        for (var i = 0; i < this.rule.symbols.length; i++) {
            if (i == this.position) {
                str += " .";
            }
            str += " " + this.rule.symbols[i];
        }
        if (this.position == this.rule.symbols.length) {
            str += " .";
        }
        return str;
    }
};

function GlrState() {
    this.id = GlrState.NextGlrStateId++;

    this.items = {};

    this.itemCount = 0;

    this.next = {};

    this.reductions = [];
}

GlrState.NextGlrStateId = 0;

GlrState.prototype = {
    key: function () {
        var list = [];
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list.sort().join("_");
    },

    toString: function () {
        var str = sprintf("GlrState[%s]:\n", this.id);
        if (this.accept) {
            str += "    ACCEPTING\n";
        }
        str += "....Items:\n";
        for (var item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                str += sprintf("........%s\n", this.items[item]);
            }
        }
        if (this.reductions.length) {
            str += sprintf("....Reduction: %s\n", this.reductions[0]);
        }
        for (var next in this.next) {
            if (this.next.hasOwnProperty(next)) {
                str += sprintf("....GOTO[%s] = [%s]\n", next, this.next[next]);
            }
        }
        return str;
    }
};

function GlrShiftNode(locus, state, parents, text) {
    this.locus = locus;
    this.text = text;
    this.state = state;
    this.parents = parents;
}

GlrShiftNode.prototype = {
    addParent: function (node) {
        for (var i = 0; i < this.parents.length; i++) {
            if (this.parents[i] === node) {
                return false;
            }
        }
        this.parents.push(node);
        return true;
    },

    toString: function () {
        return sprintf("GlrShiftNode state=[%s] text=%s", this.state.id, this.text);
    },

    evaluate: function () {
        return this.text;
    }
};

function GlrInteriorNode(rnode, rule, ref) {
    this.rnode = rnode;
    this.state = this.rnode.state;
    this.locus = this.rnode.locus;
    this.rule = rule;
    this.ref = ref;
    this.parents = [];
    rnode.inodes.push(this);
}

GlrInteriorNode.prototype = {
    addParent: function (node) {
        var i;
        for (i = 0; i < this.parents.length; i++) {
            if (this.parents[i] === node) {
                break;
            }
        }
        if (i === this.parents.length) {
            this.parents.push(node);
            this.rnode.addParent(node);
            return true;
        }
        return false;
    },

    toString: function () {
        return sprintf("GlrInteriorNode rule=%s", this.rule);
    },

    evaluate: function () {
        var cur = this.ref;
        var args = [];
        var locus = this.locus;
        dbg.printf("Eval inode with state [%s]\n", this.state.id);
        for (var i = 0; i < this.rule.symbols.length; i++) {
            locus = cur.locus;
            args.unshift(cur.evaluate());
            cur = cur.parents[cur.parents.length - 1];
        }

        if (this.rule.action) {
            return this.rule.action(args, locus);
        } else if (args.length > 0) {
            return args[0];
        } else {
            return null;
        }
    }
};

function GlrReduceNode(locus, state) {
    this.locus = locus;
    this.state = state;
    this.parents = [];
    this.inodes = [];
}

GlrReduceNode.prototype = {
    addParent: function (node) {
        for (var i = 0; i < this.parents.length; i++) {
            if (this.parents[i] === node) {
                return false;
            }
        }
        this.parents.push(node);
        return true;
    },

    getINode: function (rule, ref) {
        for (var i = 0; i < this.inodes.length; i++) {
            if (this.inodes[i].rule === rule && this.inodes[i].ref === ref) {
                return this.inodes[i];
            }
        }
        dbg.printf("Create new inode with state [%s] rule=%s and ref=[%s]\n", this.state.id, rule, ref.state.id);
        var inode = new GlrInteriorNode(this, rule, ref);
        return inode;
    },

    toString: function () {
        return sprintf("GlrReduceNode state=[%s] inodes=%s parents=%s", this.state.id, this.inodes.length, this.parents.length);
    },

    evaluate: function () {
        if (this.inodes.length > 1) {
            dbg.printf("Uh oh! Choice of inodes [%s]...\n", this.state.id);
        }
        return this.inodes[0].evaluate();
    }
};

function GlrParser(ruleSet) {
    this.ruleSet = ruleSet;
    this.tokenizer = this.ruleSet.createTokenizer();
    this.cached = {};

    this.errorState = this.cache(new GlrState());

    var state = new GlrState();
    this.addNonTerminalToState(state, "_start");
    this.startState = this.cache(state);

    this.limit = 0;
}

GlrParser.prototype = {
    parse: function (text) {
        this.tokenizer.setText(text);
        var token;
        var line = 0;
        var position = 0;
        var i;
        this.errors = [];

        this.stackTops = [new GlrReduceNode(new Locus(0, 0), this.startState)];

        this.nextTops = [];

        for (;;) {
            token = this.tokenizer.nextToken(line, position);
            if (this.debug) {
                dbg.printf("Got token %s\n", token);
            }
            if (token === null) {
                this.errors.push(sprintf("Bad character at at %s:%s", line + 1, position + 1));
                break;
            }

            this.locus = token.locus;

            for (i = 0; i < this.stackTops.length; i++) {
                this.reduceAll(this.stackTops[i], token);
            }

            for (i = 0; i < this.stackTops.length; i++) {
                this.shift(this.stackTops[i], token);
            }

            if (token === this.tokenizer.EOF_TOKEN) {
                for (i = 0; i < this.stackTops.length; i++) {
                    this.reduceAll(this.stackTops[i], token);
                }
                break;
            }

            if (this.debug) {
                this.printStack(this.stackTops);
                this.printExpected(this.stackTops);
            }

            if (this.nextTops.length === 0) {
                this.errors.push(sprintf("Syntax error at %s: %s", token.locus, token));
                this.errors.push("Expected one of the following:");
                this.printExpected(this.stackTops);
                break;
            }

            this.stackTops = this.nextTops;
            this.nextTops = [];

            line = token.locus.line;
            position = token.locus.position + token.text.length;
        }

        for (i = 0; i < this.stackTops.length; i++) {
            if (this.stackTops[i].state.accept) {
                return this.stackTops[i].parents[0].evaluate();
            }
        }

        this.errors.push("Expected one of the following:");
        this.printExpected(this.stackTops);

        return null;
    },

    printExpected: function (tops) {
        for (var i = 0; i < tops.length; i++) {
            var state = tops[i].state;
            for (var key in state.items) {
                if (state.items.hasOwnProperty(key)) {
                    var item = state.items[key];
                    if (item.position < item.rule.symbols.length && item.rule.symbols[item.position][0] == "'") {
                        this.errors.push("    " + item.rule.symbols[item.position]);
                    }
                }
            }
        }
    },

    shift: function (node, symbol) {
        var nextState = this.computeNext(node.state, symbol.id);
        if (this.debug) {
            dbg.printf("Try to shift %s\n", symbol);
        }
        if (nextState) {
            var nextNode = this.findNode(this.nextTops, nextState);
            if (this.debug) {
                dbg.printf("Shift %s\n", symbol);
            }
            if (nextNode) {
                nextNode.addParent(node);
            } else {
                this.nextTops.push(new GlrShiftNode(this.locus, nextState, [node], symbol.text));
            }
        }
    },

    reduceAll: function (node, token) {
        node.processed = true;
        for (var i = 0; i < node.state.reductions.length; i++) {
            this.reduce(node, node.state.reductions[i], token);
        }
    },

    reduce: function (node, rule, token) {
        var inode;

        if (this.limit++ === 1000) {
        }
        if (!(token.id in this.ruleSet.follow[rule.name])) {
            dbg.printf("Skip reduction on %s due to follow set %s\n", rule.name, token);
            return;
        }
        if (node instanceof GlrReduceNode) {
            dbg.printf("Skip processing of reduce node.\n");
            return;
        }
        dbg.printf("Trying to reduce node with state [%s] and %d parents\n", node.state.id, node.parents.length);
        var ancestors = [];
        this.ancestors(ancestors, node, rule.symbols.length);
        dbg.printf("    %s ancestors found\n", ancestors.length);
        for (var ai = 0; ai < ancestors.length; ai++) {
            var ancestor = ancestors[ai];
            dbg.printf("Process ancestor #%d.\n", ai);

            var nextState = this.computeNext(ancestor.state, rule.name);
            if (nextState === null) {
                continue;
            }
            var nextNode = this.findNode(this.stackTops, nextState);
            if (this.debug) {
                dbg.printf("Reduce by rule %s\n", rule);
            }
            if (nextNode === null) {
                var rnode = new GlrReduceNode(this.locus, nextState);
                inode = rnode.getINode(rule, node);
                inode.addParent(ancestor);
                this.stackTops.push(rnode);
                if (this.debug) {
                    dbg.printf("    Connect state [%s] to [%s] via %s\n", ancestor.state.id, rnode.state.id, rule.name);
                    dbg.printf("Recurse on new reduce node.\n");
                }
                this.reduceAll(inode, token);
            } else if (nextNode instanceof GlrReduceNode) {
                inode = nextNode.getINode(rule, node);
                dbg.printf("    RN: Connect state [%s] to [%s] via %s\n", ancestor.state.id, nextNode.state.id, rule.name);
                if (inode.addParent(ancestor)) {
                    if (this.debug) {
                        dbg.printf("Recurse on processed reduce node.\n");
                    }

                    this.reduceAll(inode, token);
                } else {
                    dbg.printf("    RN: Node already existed. No change.\n");
                }
            } else {
                dbg.printf("Error! Tried to add already existing node.\n");
            }
        }
        dbg.printf("Returning.\n");
    },

    printStack: function (tops) {
        var str = "\nStack:\n";
        for (var i = 0; i < tops.length; i++) {
            str += "    " + tops[i].toString() + "\n";
        }

        dbg.print(str);
    },

    ancestors: function (paths, v, k) {
        if (k === 0) {
            paths.push(v);
        } else {
            for (var i = 0; i < v.parents.length; i++) {
                this.ancestors(paths, v.parents[i], k - 1);
            }
        }
    },

    findNode: function (tops, state) {
        for (var i = 0; i < tops.length; i++) {
            if (tops[i].state === state) {
                return tops[i];
            }
        }
        return null;
    },

    addNonTerminalToState: function (state, ruleName) {
        var rules = this.ruleSet.rules[ruleName];
        for (var i = 0; i < rules.length; i++) {
            this.addRuleToState(state, rules[i], 0);
        }
    },

    addRuleToState: function (state, rule, position) {
        var item = new GlrItem(rule, position);
        var key = item.key;
        if (state.items[key] !== undefined) {
            return;
        }

        state.items[key] = item;
        state.itemCount++;

        if (item.position == item.rule.symbols.length) {
            state.reductions.push(item.rule);
            if (item.rule.name == "_start") {
                state.accept = true;
            }
        } else if (item.rule.symbols[item.position][0] != "'") {
            this.addNonTerminalToState(state, item.rule.symbols[item.position]);
        }
    },

    cache: function (state) {
        var key = state.key();
        if (key in this.cached) {
            GlrState.NextGlrStateId--;
        } else {
            this.cached[key] = state;
            if (this.debug) {
                dbg.printf("Created state:\n%s", state);
            }
        }
        return this.cached[key];
    },

    computeNext: function (state, symbol) {
        if (symbol in state.next) {
            return state.next[symbol];
        }
        var next = new GlrState();

        for (var key in state.items) {
            if (state.items.hasOwnProperty(key)) {
                var item = state.items[key];
                if (item.position < item.rule.symbols.length && item.rule.symbols[item.position] == symbol) {
                    this.addRuleToState(next, item.rule, item.position + 1);
                }
            }
        }

        next = this.cache(next);
        if (next === this.errorState) {
            next = null;
        }
        state.next[symbol] = next;
        return next;
    }
};

var NextStateId = 0;

var POST_NEWLINE = -1;
var PRE_NEWLINE = -2;
var DIGIT_CHAR = -3;
var ANY_CHAR = -4;

function Locus(line, position) {
    this.line = line;
    this.position = position;
}

Locus.prototype = {
    toString: function () {
        return "" + (this.line + 1) + ":" + (this.position + 1);
    }
};

function CharMatcher(ch) {
    this.mchar = ch;
}

CharMatcher.prototype = {
    match: function (ch) {
        if (this.mchar == DIGIT_CHAR) {
            return ch >= "0" && ch <= "9";
        } else if (this.mchar == ANY_CHAR) {
            return ch != POST_NEWLINE && ch != PRE_NEWLINE && ch != "\n";
        } else {
            return ch == this.mchar;
        }
    },

    toString: function () {
        if (this.mchar == DIGIT_CHAR) {
            return "\\d";
        } else {
            return this.mchar;
        }
    }
};

function RangeMatcher(ranges, include) {
    this.ranges = ranges;
    this.include = include;
}

RangeMatcher.prototype = {
    match: function (ch) {
        for (var i = 0; i < this.ranges.length; i++) {
            var range = this.ranges[i];
            if (ch >= range[0] && ch <= range[1]) {
                return this.include;
            }
        }

        return !this.include;
    },

    toString: function () {
        var str = "[";
        if (!this.include) {
            str += "^";
        }
        for (var i = 0; i < this.ranges.length; i++) {
            if (this.ranges[i][0] == this.ranges[i][1]) {
                str += this.ranges[i][0];
            } else {
                str += this.ranges[i][0] + "-" + this.ranges[i][1];
            }
        }
        return str + "]";
    }
};

function NfaState(charMatcher) {
    this.mchar = charMatcher;
    this.next = [];
    this.id = NextStateId++;
    this.lastList = 0;
    this.accept = undefined;
}

function DfaState() {
    this.nfaStates = [];
    this.next = {};
    this.accepts = [];
    this.id = NextStateId++;
}

NfaState.prototype.toString = function () {
    var str = "\nState [" + this.id + "] ch=" + this.mchar + "\n";
    if (this.accept !== undefined) {
        str += "    Accept " + this.accept + "\n";
    }
    for (var i = 0; i < this.next.length; i++) {
        str += "    ch=" + this.next[i].mchar + " goto [" + this.next[i].id + "]\n";
    }
    return str;
};

function NFA(start, end) {
    this.start = start;
    this.end = end;
}

NFA.prototype.toString = function () {
    var processed = {};
    var stack = [this.start];
    var str = "";

    while (stack.length > 0) {
        var state = stack.pop();
        if (processed[state]) {
            continue;
        }
        processed[state] = 1;

        for (var i = 0; i < state.next.length; i++) {
            stack.push(state.next[i]);
        }
        str += state.toString();
    }
    return str;
};

function Token(id, text, line, position) {
    this.id = id;
    this.text = text;
    this.locus = new Locus(line, position);
}

Token.prototype = {
    toString: function () {
        return "Token(" + this.text + ")";
    }
};

function Tokenizer() {
    this.root = new NfaState(null);
    this.expr = null;
    this.index = 0;
    this.listId = 1;
    this.dfaCache = {};

    this.text = "";

    this.lineNumbers = [];

    this.EOF_TOKEN = {};
    this.IGNORE_TOKEN = {};

    this.finished = true;
}

Tokenizer.prototype = {
    addToken: function (id, expr) {
        this.expr = expr;
        this.index = 0;
        var nfa = this.parseAlternation();
        this.root.next.push(nfa.start);
        nfa.end.accept = id;
    },

    ignore: function (expr) {
        this.addToken(this.IGNORE_TOKEN, expr);
    },

    eof: function () {
        return this.index == this.expr.length;
    },

    matchChar: function (ch) {
        if (this.expr[this.index] == ch) {
            this.index++;
            return true;
        }
        return false;
    },

    peek: function (ch) {
        return this.expr[this.index] == ch;
    },

    parseChar: function () {
        if (this.matchChar("\\")) {
            if (this.matchChar("n")) {
                return "\n";
            } else if (this.matchChar("r")) {
                return "\r";
            } else if (this.matchChar("t")) {
                return "\t";
            } else if (this.matchChar("d")) {
                return DIGIT_CHAR;
            } else {
                return this.expr[this.index++];
            }
        } else if (this.matchChar(".")) {
            return ANY_CHAR;
        } else if (this.matchChar("$")) {
            return PRE_NEWLINE;
        } else if (this.matchChar("^")) {
            return POST_NEWLINE;
        } else {
            return this.expr[this.index++];
        }
    },

    parseRange: function () {
        var include = true;
        var ranges = [];

        while (!this.eof() && !this.peek("]")) {
            if (this.matchChar("^")) {
                include = false;
            }
            var first = this.parseChar();
            var last = first;
            if (this.matchChar("-")) {
                last = this.parseChar();
            }

            if (first == DIGIT_CHAR) {
                first = "0";
                last = "9";
            }

            ranges.push([first, last]);
        }

        var state = new NfaState(new RangeMatcher(ranges, include));
        return new NFA(state, state);
    },

    parseBasic: function () {
        var nfa;

        if (this.matchChar("(")) {
            nfa = this.parseAlternation();
            if (!this.matchChar(")")) {
                throw "Expected ')'";
            }
        } else if (this.matchChar("[")) {
            nfa = this.parseRange();
            if (!this.matchChar("]")) {
                throw "Expected ']'";
            }
        } else {
            var state = new NfaState(new CharMatcher(this.parseChar()));
            nfa = new NFA(state, state);
        }

        return nfa;
    },

    parseKleene: function () {
        var nfa = this.parseBasic();
        var splitter;
        if (this.matchChar("+")) {
            splitter = new NfaState(null);
            nfa.end.next.push(splitter);
            splitter.next.push(nfa.start);
            nfa.end = splitter;
        } else if (this.matchChar("*")) {
            splitter = new NfaState(null);
            splitter.next.push(nfa.start);
            nfa.end.next.push(splitter);
            nfa.start = splitter;
            nfa.end = splitter;
        } else if (this.matchChar("?")) {
            var start = new NfaState(null);
            var end = new NfaState(null);
            start.next.push(nfa.start);
            start.next.push(end);
            nfa.end.next.push(end);
            nfa.start = start;
            nfa.end = end;
        }

        return nfa;
    },

    parseConcat: function () {
        var start = new NfaState(null);
        var end = start;
        for (;;) {
            if (this.peek("|") || this.peek(")") || this.eof()) {
                break;
            }
            var nfa = this.parseKleene();
            end.next.push(nfa.start);
            end = nfa.end;
        }
        return new NFA(start, end);
    },

    parseAlternation: function () {
        var start = new NfaState(null);
        var end = new NfaState(null);
        do {
            var nfa = this.parseConcat();
            start.next.push(nfa.start);
            nfa.end.next.push(end);
        } while (this.matchChar("|"));

        return new NFA(start, end);
    },

    addState: function (nfaStateList, accepts, nfaState) {
        if (nfaState.lastList == this.listId) {
            return;
        }

        if (nfaState.accept !== undefined) {
            accepts.push(nfaState.accept);
        }

        nfaState.lastList = this.listId;
        nfaStateList.push(nfaState);

        if (nfaState.mchar === null) {
            for (var i = 0; i < nfaState.next.length; i++) {
                this.addState(nfaStateList, accepts, nfaState.next[i]);
            }
        }
    },

    nextState: function (dfaState, ch) {
        var nfaStateList = [];
        var accepts = [];
        var i;

        this.listId++;

        for (i = 0; i < dfaState.nfaStates.length; i++) {
            var nfaState = dfaState.nfaStates[i];
            if (nfaState.mchar !== null) {
                if (nfaState.mchar.match(ch)) {
                    this.addState(nfaStateList, accepts, nfaState.next[0]);
                } else if (ch == PRE_NEWLINE || ch == POST_NEWLINE) {
                    this.addState(nfaStateList, accepts, nfaState);
                }
            }
        }

        nfaStateList.sort(function (a, b) {
            return a.id - b.id;
        });

        var key = "";
        for (i = 0; i < nfaStateList.length; i++) {
            key += nfaStateList[i].id + ".";
        }

        if (this.dfaCache[key] === undefined) {
            dfaState = new DfaState();

            dfaState.nfaStates = nfaStateList;
            dfaState.accepts = accepts;
            this.dfaCache[key] = dfaState;
        } else {
        }

        return this.dfaCache[key];
    },

    setText: function (text) {
        this.text = text;
        this.lineNumbers.length = 0;
        this.lineNumbers.push(0);
        this.finished = false;

        for (var i = 0; i < this.text.length; i++) {
            if (this.text[i] == "\n") {
                this.lineNumbers.push(i + 1);
            }
        }
    },

    getLine: function (lineno) {
        return this.text.substr(this.lineNumbers[lineno], this.lineNumbers[lineno + 1] - this.lineNumbers[lineno]);
    },

    nextTokenInternal: function (line, position) {
        var last = 0;
        var i;
        var accept = null;

        if (this.rootDfa === undefined) {
            this.rootDfa = new DfaState();
            this.addState(this.rootDfa.nfaStates, this.rootDfa.accepts, this.root);
        }

        var dfaState = this.rootDfa;

        var startPosition = this.lineNumbers[line] + position;

        if (startPosition == this.text.length) {
            this.finished = true;
            return new Token(this.EOF_TOKEN, "!EOF", line, position);
        }

        if (startPosition > 0) {
            last = this.text[startPosition - 1];
        }

        for (i = startPosition; i < this.text.length; i++) {
            var ch = this.text[i];

            if (ch === "\n" && last != PRE_NEWLINE) {
                ch = PRE_NEWLINE;
                i--;
            } else if (last === "\n" || last === 0) {
                ch = POST_NEWLINE;
                i--;
            }

            if (last === "\n") {
                line++;
            }
            last = ch;

            if (dfaState.next[ch] === undefined) {
                dfaState.next[ch] = this.nextState(dfaState, ch);
            }
            dfaState = dfaState.next[ch];

            if (dfaState.accepts.length) {
                accept = new Token(dfaState.accepts[0], this.text.substr(startPosition, i - startPosition + 1), line, startPosition - this.lineNumbers[line]);
            }

            if (dfaState.nfaStates.length === 0) {
                break;
            }
        }

        if (accept) {
        } else if (0) {
            dbg.printf("Bad token at '%s'\n", this.text.substr(startPosition, 10));
            dbg.printf("ascii %d\n", this.text.charCodeAt(startPosition));
        }

        return accept;
    },

    nextToken: function (line, position) {
        for (;;) {
            var token = this.nextTokenInternal(line, position);
            if (token === null || token.id !== this.IGNORE_TOKEN) {
                return token;
            }
            line = token.locus.line;
            position = token.locus.position + token.text.length;
        }
    }
};

function Instruction(instr, arg) {
    this.instr = instr;
    this.arg = arg;
}

Instruction.prototype = {
    toString: function () {
        if (this.instr.numArgs === 0) {
            return this.instr.name;
        } else {
            return this.instr.name + " " + this.arg;
        }
    }
};

function Label(name, codeOffset, dataOffset) {
    this.name = name;
    this.codeOffset = codeOffset;
    this.dataOffset = dataOffset;
}

function LoopContext(counter, forLabel, nextLabel, endLabel) {
    this.counter = counter;
    this.forLabel = forLabel;
    this.nextLabel = nextLabel;
    this.endLabel = endLabel;
}

function CodeGenerator() {
    this.instructions = [];

    this.data = [];

    this.shared = {};

    this.labels = [];

    this.labelMap = {};

    this.loopStack = [];
    this.selectStack = [];

    this.functionNames = {};

    this.lineMapping = [];
    this.lastLine = -1;

    this.getGotoLabel(":top");
}

CodeGenerator.prototype = {
    link: function () {
        for (var i = 0; i < this.instructions.length; i++) {
            var instr = this.instructions[i];

            if (instr.instr.addrLabel) {
                instr.arg = this.labels[instr.arg].codeOffset;
            } else if (instr.instr.dataLabel) {
                instr.arg = this.labels[instr.arg].dataOffset;
            }
        }
    },

    newLabel: function (basename) {
        var id = this.labels.length;
        var name = basename + "_" + id;
        this.labels.push(new Label(name, this.instructions.length, this.data.length));
        return id;
    },

    label: function (labelid) {
        this.labels[labelid].codeOffset = this.instructions.length;
        this.labels[labelid].dataOffset = this.data.length;
    },

    map: function (locus) {
        if (locus.line === this.lastLine) {
            return;
        }
        this.lastLine = locus.line;
        this.lineMapping[this.instructions.length] = locus;
    },

    getGotoLabel: function (name) {
        var labelId;
        if (name in this.labelMap) {
            labelId = this.labelMap[name];
        } else {
            labelId = this.newLabel(name);
            this.labelMap[name] = labelId;
        }
        return labelId;
    },

    write: function (name, arg) {
        var instr = Instructions[name];
        if (instr === undefined) {
            throw "Bad instruction: " + name;
        }
        this.instructions.push(new Instruction(instr, arg));
    },

    visitProgram: function (program) {
        for (var i = 0; i < program.subs.length; i++) {
            program.subs[i].accept(this);
        }

        this.link();
    },

    visitDeclareFunction: function (node) {
        this.functionNames[node.name] = 1;
    },

    visitSubroutine: function (node) {
        var skipLabel = null;
        this.map(node.locus);
        if (node.name != "_main") {
            skipLabel = this.newLabel("skipsub");
            this.write("JMP", skipLabel);
            this.label(this.getGotoLabel(node.name));
            for (var i = node.args.length - 1; i >= 0; i--) {
                this.write("POPVAR", node.args[i].name);
            }
        }
        node.statements.accept(this);
        if (node.isFunction) {
            this.write("PUSHVALUE", node.name);
        }
        this.write("RET", null);
        if (skipLabel !== null) {
            this.label(skipLabel);
        } else {
            this.write("END", null);
        }
    },

    visitCallStatement: function (node) {
        this.map(node.locus);
        for (var i = 0; i < node.args.length; i++) {
            node.args[i].accept(this);
        }

        if (SystemSubroutines[node.name]) {
            var sub = SystemSubroutines[node.name];
            if (sub.args !== undefined && sub.minArgs !== undefined) {
                this.write("PUSHCONST", node.args.length);
            }
            this.write("SYSCALL", node.name);
        } else if (node.name == "PRINT") {
            this.write("PUSHCONST", node.args.length);
            this.write("SYSCALL", node.name);
        } else {
            this.write("CALL", this.getGotoLabel(node.name));
        }
    },

    visitArgument: function (node) {},

    visitPrintUsingStatement: function (node) {
        for (var i = 0; i < node.exprList.length; i++) {
            node.exprList[i].accept(this);
        }
        this.write("PUSHCONST", node.terminator);
        this.write("PUSHCONST", node.exprList.length + 1);
        this.write("SYSCALL", "print_using");
    },

    visitPrintStatement: function (node) {
        var newline = true;
        this.map(node.locus);
        for (var i = 0; i < node.printItems.length; i++) {
            node.printItems[i].accept(this);
            if (node.printItems[i].type === AstPrintItem.TAB) {
                this.write("SYSCALL", "print_tab");
            } else if (node.printItems[i].expr) {
                this.write("SYSCALL", "print");
            }

            if (node.printItems[i].terminator == ",") {
                this.write("SYSCALL", "print_comma");
            } else if (node.printItems[i].terminator == ";") {
                newline = false;
            } else {
                newline = true;
            }
        }

        if (newline) {
            this.write("PUSHCONST", "\n");
            this.write("SYSCALL", "print");
        }
    },

    visitPrintItem: function (node) {
        if (node.expr) {
            node.expr.accept(this);
        }
    },

    visitNoopItem: function (node) {
        if (node.expr) {
            node.expr.accept(this);
        }
    },

    visitInputStatement: function (node) {
        this.map(node.locus);

        if (node.promptExpr) {
            node.promptExpr.accept(this);
            this.write("SYSCALL", "print");
        }

        if (node.printQuestionMark) {
            this.write("PUSHCONST", "? ");
            this.write("SYSCALL", "print");
        } else {
            this.write("PUSHCONST", " ");
            this.write("SYSCALL", "print");
        }

        for (var i = 0; i < node.identifiers.length; i++) {
            this.write("PUSHREF", node.identifiers[i]);
        }

        this.write("PUSHCONST", node.identifiers.length);
        this.write("SYSCALL", "INPUT");
    },

    visitNullStatement: function (node) {},

    visitEndStatement: function (node) {
        this.map(node.locus);
        this.write("END", null);
    },

    visitForLoop: function (node) {
        this.map(node.locus);
        var forLabel = this.newLabel("for");
        var nextLabel = this.newLabel("next");
        var endLabel = this.newLabel("end_for");
        this.loopStack.push(new LoopContext(node.identifier, forLabel, nextLabel, endLabel));
        node.startExpr.accept(this);
        this.write("POPVAR", node.identifier);
        node.endExpr.accept(this);
        node.stepExpr.accept(this);
        this.label(forLabel);
        this.write("PUSHVALUE", node.identifier);
        this.write("FORLOOP", endLabel);
    },

    visitNextStatement: function (node) {
        this.map(node.locus);
        for (var i = 0; i < node.identifiers.length; i++) {
            var ctx = this.loopStack.pop();

            this.label(ctx.nextLabel);
            this.write("COPYTOP");
            this.write("PUSHVALUE", ctx.counter);
            this.write("+");
            this.write("POPVAL", ctx.counter);
            this.write("JMP", ctx.forLabel);
            this.label(ctx.endLabel);
        }
    },

    visitExitStatement: function (node) {
        var context = this.loopStack[this.loopStack.length - 1];

        if (context.counter) {
            this.write("POP");
            this.write("POP");
        }

        this.write("JMP", context.endLabel);
    },

    visitArrayDeref: function (node) {
        this.map(node.locus);

        if (node.expr instanceof AstVariableReference && this.functionNames[node.expr.name]) {
            node.parameters.accept(this);
            this.write("CALL", this.getGotoLabel(node.expr.name));
        } else if (node.expr instanceof AstVariableReference && SystemFunctions[node.expr.name]) {
            var func = SystemFunctions[node.expr.name];
            node.parameters.accept(this);
            if (func.minArgs < func.args.length) {
                this.write("PUSHCONST", node.parameters.length);
            }
            node.expr.accept(this);
        } else {
            node.parameters.accept(this);
            node.expr.accept(this);
            if (node.parameters.length > 0) {
                this.write("ARRAY_DEREF", node.wantRef);
            } else {
            }
        }
    },

    visitMemberDeref: function (node) {
        this.map(node.locus);
        node.lhs.accept(this);
        if (node.wantRef) {
            this.write("MEMBER_DEREF", node.identifier);
        } else {
            this.write("MEMBER_VALUE", node.identifier);
        }
    },

    visitVariableReference: function (node) {
        this.map(node.locus);
        if (SystemFunctions[node.name]) {
            this.write("SYSCALL", node.name);
        } else if (this.functionNames[node.name]) {
            this.write("CALL", this.getGotoLabel(node.name));
            if (node.wantRef) {
                this.write("NEW", node.type.name);
            }
        } else if (node.wantRef || IsArrayType(node.type)) {
            this.write("PUSHREF", node.name);
        } else {
            this.write("PUSHVALUE", node.name);
        }
    },

    visitRange: function (node) {},

    visitDataStatement: function (node) {
        for (var i = 0; i < node.data.length; i++) {
            this.data.push(node.data[i].value);
        }
    },

    visitReturnStatement: function (node) {
        this.map(node.locus);
        this.write("RET");
    },

    visitRestoreStatement: function (node) {
        this.map(node.locus);
        var where = 0;
        if (node.label) {
            where = this.getGotoLabel(node.label);
        } else {
            where = this.getGotoLabel(":top");
        }
        this.write("RESTORE", where);
    },

    visitConstStatement: function (constStatement) {
        this.shared[constStatement.name] = true;
        constStatement.expr.accept(this);
        this.write("POPVAL", constStatement.name);
    },

    visitDefTypeStatement: function (def) {},

    visitDimStatement: function (node) {
        this.map(node.locus);
        var typeName;

        if (node.typeName) {
            typeName = node.typeName;
        } else {
            typeName = "INTEGER";
        }

        if (node.shared) {
            this.shared[node.name] = 1;
        }

        if (node.ranges.length > 0) {
            for (var i = 0; i < node.ranges.length; i++) {
                node.ranges[i].lowerExpr.accept(this);
                node.ranges[i].upperExpr.accept(this);
            }

            this.write("PUSHCONST", node.ranges.length);

            this.write("PUSHTYPE", typeName);

            this.write("SYSCALL", "alloc_array");

            this.write("POPVAR", node.name);
        } else {
            this.write("PUSHTYPE", typeName);
            this.write("SYSCALL", "alloc_scalar");
            this.write("POPVAR", node.name);
        }
    },

    visitDoStatement: function (node) {
        this.map(node.locus);
        var top = this.newLabel("do");
        var bottom = this.newLabel("loop");
        this.label(top);

        this.loopStack.push(new LoopContext(null, null, null, bottom));
        node.statements.accept(this);
        this.loopStack.pop();
        switch (node.type) {
            case AstDoStatement.UNTIL:
                node.expr.accept(this);
                this.write("BZ", top);
                break;

            case AstDoStatement.WHILE_AT_END:
                node.expr.accept(this);
                this.write("BNZ", top);
                break;

            case AstDoStatement.INFINITE:
                this.write("JMP", top);
                break;
        }

        this.label(bottom);
    },

    visitWhileLoop: function (node) {
        this.map(node.locus);
        var top = this.newLabel("while");
        var bottom = this.newLabel("wend");
        this.label(top);
        node.expr.accept(this);
        this.write("BZ", bottom);
        this.loopStack.push(new LoopContext(null, null, null, bottom));
        node.statements.accept(this);
        this.loopStack.pop();
        this.write("JMP", top);
        this.label(bottom);
    },

    visitIfStatement: function (node) {
        this.map(node.locus);
        var endLabel = this.newLabel("endif");
        var elseLabel = this.newLabel("else");

        node.expr.accept(this);
        this.write("BZ", elseLabel);
        node.statements.accept(this);
        this.write("JMP", endLabel);

        this.label(elseLabel);

        if (node.elseStatements) {
            node.elseStatements.accept(this);
            this.write("JMP", endLabel);
        }

        this.label(endLabel);
    },

    visitSelectStatement: function (node) {
        this.map(node.locus);
        var endSelect = this.newLabel("end_select");
        this.selectStack.push(endSelect);
        node.expr.accept(this);
        node.cases.accept(this);
        this.write("POP");
        this.label(endSelect);
        this.selectStack.pop();
    },

    visitCaseStatement: function (node) {
        this.map(node.locus);
        if (node.exprList.length > 0) {
            var okayLabel = this.newLabel("case_okay");
            var skipLabel = this.newLabel("case_skip");
            for (var i = 0; i < node.exprList.length; i++) {
                this.write("COPYTOP");
                node.exprList[i].accept(this);
                this.write("=");
                this.write("BNZ", okayLabel);
            }
            this.write("JMP", skipLabel);
            this.label(okayLabel);

            node.statements.accept(this);
            this.write("JMP", this.selectStack[this.selectStack.length - 1]);
            this.label(skipLabel);
        } else {
            node.statements.accept(this);
        }
    },

    visitTypeMember: function (node) {},

    visitUserType: function (node) {},

    visitGotoStatement: function (node) {
        this.map(node.locus);
        var labelId = this.getGotoLabel(node.label);
        this.write("JMP", labelId);
    },

    visitGosub: function (node) {
        this.map(node.locus);
        var labelId = this.getGotoLabel(node.label);
        this.write("GOSUB", labelId);
    },

    visitLabel: function (node) {
        this.label(this.getGotoLabel(node.label));
    },

    visitAssignStatement: function (node) {
        this.map(node.locus);
        node.expr.accept(this);

        if (node.lhs instanceof AstVariableReference && this.functionNames[node.lhs.name]) {
            this.write("POPVAL", node.lhs.name);
        } else {
            node.lhs.accept(this);
            this.write("ASSIGN");
        }
    },

    visitBinaryOp: function (node) {
        this.map(node.locus);
        node.lhs.accept(this);
        node.rhs.accept(this);
        this.write(node.op);
        if (node.wantRef) {
            this.write("NEW", node.type.name);
        }
    },

    visitUnaryOperator: function (node) {
        this.map(node.locus);
        node.expr.accept(this);
        this.write("UNARY_OP", node.op);
        if (node.wantRef) {
            this.write("NEW", node.type.name);
        }
    },

    visitConstantExpr: function (node) {
        this.map(node.locus);
        this.write("PUSHCONST", node.value);
        if (node.wantRef) {
            this.write("NEW", node.type.name);
        }
    }
};

Array.prototype.accept = function (visitor) {
    for (var i = 0; i < this.length; i++) {
        if (!this[i]) {
            continue;
        }
        this[i].accept(visitor);
    }
};

function AstProgram(locus, mainSub) {
    this.locus = locus;
    this.subs = [mainSub];
}

AstProgram.prototype.accept = function (visitor) {
    visitor.visitProgram(this);
};

function AstArgument(locus, name, typeName, isArray) {
    this.locus = locus;

    this.name = name;

    this.typeName = typeName;

    this.isArray = isArray;

    this.type = null;
}

AstArgument.prototype.accept = function (visitor) {
    visitor.visitArgument(this);
};

function AstSubroutine(locus, name, args, statementList, isFunction, isStatic) {
    this.locus = locus;
    this.name = name;
    this.args = args;
    this.statements = statementList;
    this.isFunction = isFunction;
    this.isStatic = isStatic;
}

AstSubroutine.prototype.accept = function (visitor) {
    visitor.visitSubroutine(this);
};

function AstDeclareFunction(locus, name, args, isFunction) {
    this.locus = locus;
    this.name = name;
    this.args = args;
    this.isFunction = isFunction;
    this.type = null;
    this.hasBody = false;

    this.used = false;
}

AstDeclareFunction.prototype.accept = function (visitor) {
    visitor.visitDeclareFunction(this);
};

function AstPrintUsingStatement(locus, exprList, terminator) {
    this.locus = locus;
    this.exprList = exprList;

    this.terminator = terminator;
}

AstPrintUsingStatement.prototype.accept = function (visitor) {
    visitor.visitPrintUsingStatement(this);
};

function AstPrintStatement(locus, printItems) {
    this.locus = locus;
    this.printItems = printItems;
}

AstPrintStatement.prototype.accept = function (visitor) {
    visitor.visitPrintStatement(this);
};

function AstPrintItem(locus, type, expr, terminator) {
    this.locus = locus;

    this.type = type;

    this.expr = expr;
    this.terminator = terminator;
}

AstPrintItem.EXPR = 0;
AstPrintItem.TAB = 1;

AstPrintItem.prototype.accept = function (visitor) {
    visitor.visitPrintItem(this);
};

function AstNoop(locus, type, expr, terminator) {
    this.locus = locus;

    this.type = type;

    this.expr = expr;
    this.terminator = terminator;
}

AstNoop.EXPR = 0;
AstNoop.TAB = 0;

AstNoop.prototype.accept = function (visitor) {
    visitor.visitNoopItem(this);
};

function AstInputStatement(locus, promptExpr, printQuestionMark, identifiers) {
    this.locus = locus;
    this.promptExpr = promptExpr;
    this.printQuestionMark = printQuestionMark;
    this.identifiers = identifiers;
}

AstInputStatement.prototype.accept = function (visitor) {
    visitor.visitInputStatement(this);
};

function AstNullStatement(locus) {
    this.locus = locus;
}

AstNullStatement.prototype.accept = function (visitor) {
    visitor.visitNullStatement(this);
};

function AstEndStatement(locus) {
    this.locus = locus;
}

AstEndStatement.prototype.accept = function (visitor) {
    visitor.visitEndStatement(this);
};

function AstNextStatement(locus, identifierList) {
    this.locus = locus;
    this.identifiers = identifierList;
}

AstNextStatement.prototype.accept = function (visitor) {
    visitor.visitNextStatement(this);
};

function AstArrayDeref(locus, expr, parameters) {
    this.locus = locus;
    this.expr = expr;
    this.parameters = parameters;
    this.type = null;
}

AstArrayDeref.prototype.accept = function (visitor) {
    visitor.visitArrayDeref(this);
};

function AstMemberDeref(locus, lhs, identifier) {
    this.locus = locus;
    this.lhs = lhs;
    this.identifier = identifier;
}

AstMemberDeref.prototype.accept = function (visitor) {
    visitor.visitMemberDeref(this);
};

function AstVariableReference(locus, name) {
    this.locus = locus;
    this.name = name;
}

AstVariableReference.prototype.accept = function (visitor) {
    visitor.visitVariableReference(this);
};

function AstRange(locus, lowerExpr, upperExpr) {
    this.locus = locus;

    this.lowerExpr = lowerExpr;
    this.upperExpr = upperExpr;
}

AstRange.prototype.accept = function (visitor) {
    visitor.visitRange(this);
};

function AstDataStatement(locus, data) {
    this.locus = locus;
    this.data = data;
}

AstDataStatement.prototype.accept = function (visitor) {
    visitor.visitDataStatement(this);
};

function AstRestoreStatement(locus, label) {
    this.locus = locus;

    this.label = label;
}

AstRestoreStatement.prototype.accept = function (visitor) {
    visitor.visitRestoreStatement(this);
};

function AstDimStatement(locus, identifier, ranges, typeName) {
    this.locus = locus;
    this.name = identifier;
    this.ranges = ranges;
    this.typeName = typeName;
    this.shared = false;
}

AstDimStatement.prototype.accept = function (visitor) {
    visitor.visitDimStatement(this);
};

function AstDefTypeStatement(locus, typeName) {
    this.locus = locus;
    this.typeName = typeName;
}

AstDefTypeStatement.prototype.accept = function (visitor) {
    visitor.visitDefTypeStatement(this);
};

function AstConstStatement(locus, identifier, expr) {
    this.locus = locus;
    this.name = identifier;
    this.expr = expr;
}

AstConstStatement.prototype.accept = function (visitor) {
    visitor.visitConstStatement(this);
};

function AstDoStatement(locus, statements, expr, type) {
    this.locus = locus;
    this.statements = statements;
    this.expr = expr;
    this.type = type;
}

AstDoStatement.INFINITE = 1;
AstDoStatement.UNTIL = 2;
AstDoStatement.WHILE_AT_END = 3;

AstDoStatement.prototype.accept = function (visitor) {
    visitor.visitDoStatement(this);
};

function AstExitStatement(locus, what) {
    this.locus = locus;
    this.what = what;
}

AstExitStatement.prototype.accept = function (visitor) {
    visitor.visitExitStatement(this);
};

function AstWhileLoop(locus, expr, statements) {
    this.locus = locus;
    this.expr = expr;
    this.statements = statements;
}

AstWhileLoop.prototype.accept = function (visitor) {
    visitor.visitWhileLoop(this);
};

function AstForLoop(locus, identifier, startExpr, endExpr, stepExpr) {
    this.locus = locus;
    this.identifier = identifier;
    this.startExpr = startExpr;
    this.endExpr = endExpr;
    this.stepExpr = stepExpr;
}

AstForLoop.prototype.accept = function (visitor) {
    visitor.visitForLoop(this);
};

function AstIfStatement(locus, expr, statements, elseStatements) {
    this.locus = locus;
    this.expr = expr;
    this.statements = statements;
    this.elseStatements = elseStatements;
}

AstIfStatement.prototype.accept = function (visitor) {
    visitor.visitIfStatement(this);
};

function AstSelectStatement(locus, expr, cases) {
    this.locus = locus;
    this.expr = expr;
    this.cases = cases;
}

AstSelectStatement.prototype.accept = function (visitor) {
    visitor.visitSelectStatement(this);
};

function AstCaseStatement(locus, exprList, statements) {
    this.locus = locus;

    this.exprList = exprList;
    this.statements = statements;
}

AstCaseStatement.prototype.accept = function (visitor) {
    visitor.visitCaseStatement(this);
};

function AstTypeMember(locus, name, typeName) {
    this.locus = locus;
    this.name = name;
    this.typeName = typeName;
}

AstTypeMember.prototype.accept = function (visitor) {
    visitor.visitTypeMember(this);
};

function AstUserType(locus, name, members) {
    this.locus = locus;
    this.name = name;
    this.members = members;
}

AstUserType.prototype.accept = function (visitor) {
    visitor.visitUserType(this);
};

function AstGotoStatement(locus, label) {
    this.locus = locus;
    this.label = label;
}

AstGotoStatement.prototype.accept = function (visitor) {
    visitor.visitGotoStatement(this);
};

function AstGosubStatement(locus, label) {
    this.locus = locus;
    this.label = label;
}

AstGosubStatement.prototype.accept = function (visitor) {
    visitor.visitGosub(this);
};

function AstLabel(locus, label) {
    this.locus = locus;
    this.label = label;
}

AstLabel.prototype.accept = function (visitor) {
    visitor.visitLabel(this);
};

function AstCallStatement(locus, name, args) {
    this.locus = locus;
    this.name = name;
    this.args = args;
}

AstCallStatement.prototype.accept = function (visitor) {
    visitor.visitCallStatement(this);
};

function AstAssignStatement(locus, lhs, expr) {
    this.locus = locus;
    this.lhs = lhs;
    this.expr = expr;
}

AstAssignStatement.prototype.accept = function (visitor) {
    visitor.visitAssignStatement(this);
};

function AstBinaryOp(locus, lhs, op, rhs) {
    this.locus = locus;
    this.lhs = lhs;
    this.op = op;
    this.rhs = rhs;
}

AstBinaryOp.prototype.accept = function (visitor) {
    visitor.visitBinaryOp(this);
};

function AstUnaryOperator(locus, op, expr) {
    this.locus = locus;
    this.op = op;
    this.expr = expr;
}

AstUnaryOperator.prototype.accept = function (visitor) {
    visitor.visitUnaryOperator(this);
};

function AstConstantExpr(locus, value) {
    this.locus = locus;

    this.value = value;
}

AstConstantExpr.prototype.accept = function (visitor) {
    visitor.visitConstantExpr(this);
};

function AstReturnStatement(locus, value) {
    this.locus = locus;
    this.value = value;
}

AstReturnStatement.prototype.accept = function (visitor) {
    visitor.visitReturnStatement(this);
};

function onProgram(symbols, locus) {
    var program = new AstProgram(locus, new AstSubroutine(locus, "_main", [], symbols[0], false));
    dbg.printf("Program successfully parsed. %d statements.\n", program.subs[0].statements.length);
    return program;
}

function onNumber(symbols, locus) {
    return new AstConstantExpr(locus, parseFloat(symbols[0]));
}

function onString(symbols, locus) {
    return new AstConstantExpr(locus, symbols[0].substr(1, symbols[0].length - 2));
}

function onBinaryOp(symbols, locus) {
    return new AstBinaryOp(locus, symbols[0], symbols[1], symbols[2]);
}

function onParamListInBrackets(symbols, locus) {
    return symbols[1];
}

function onBracketExpr(symbols, locus) {
    return symbols[1];
}

function QBasicProgram(input, testMode) {
    this.errors = [];
    this.testMode = testMode;
    function UseSecond(args) {
        return args[1];
    }

    function UseFirst(args) {
        return args[0];
    }

    function JoinListsLR(args) {
        args[0].push(args[1]);
        return args[0];
    }

    function JoinLists(args) {
        args[1].unshift(args[0]);
        return args[1];
    }

    function EmptyList(args) {
        return [];
    }

    if (QBasicProgram.parser === null) {
        var rules = new RuleParser();
        rules.addRule("start: program");
        rules.addToken("AND", "AND");
        rules.addToken("AS", "AS");
        rules.addToken("CASE", "CASE");
        rules.addToken("CONST", "CONST");
        rules.addToken("DATA", "DATA");
        rules.addToken("DECLARE", "DECLARE");
        rules.addToken("DEF", "DEF");
        rules.addToken("DEFINT", "DEFINT");
        rules.addToken("DIM", "DIM");
        rules.addToken("DO", "DO");
        rules.addToken("ELSE", "ELSE");
        rules.addToken("END", "END");
        rules.addToken("EXIT", "EXIT");
        rules.addToken("FOR", "FOR");
        rules.addToken("FUNCTION", "FUNCTION");
        rules.addToken("GOSUB", "GOSUB");
        rules.addToken("GOTO", "GOTO");
        rules.addToken("IF", "IF");
        rules.addToken("INPUT", "INPUT");
        rules.addToken("LINE", "LINE");
        rules.addToken("LOOP", "LOOP");
        rules.addToken("MOD", "MOD");
        rules.addToken("NEXT", "NEXT");
        rules.addToken("NOT", "NOT");
        rules.addToken("OR", "OR");
        rules.addToken("POKE", "POKE");
        rules.addToken("PRINT", "PRINT");
        rules.addToken("REM", "REM");
        rules.addToken("RESTORE", "RESTORE");
        rules.addToken("RETURN", "RETURN");
        rules.addToken("SEG", "SEG");
        rules.addToken("SELECT", "SELECT");
        rules.addToken("SHARED", "SHARED");
        rules.addToken("STATIC", "STATIC");
        rules.addToken("STEP", "STEP");
        rules.addToken("SUB", "SUB");
        rules.addToken("TAB", "TAB");
        rules.addToken("THEN", "THEN");
        rules.addToken("TO", "TO");
        rules.addToken("TYPE", "TYPE");
        rules.addToken("UNTIL", "UNTIL");
        rules.addToken("USING", "USING");
        rules.addToken("VIEW", "VIEW");
        rules.addToken("WEND", "WEND");
        rules.addToken("WHILE", "WHILE");
        rules.addToken("minus", "\\-");
        rules.addToken("endl", "\\n");
        rules.addToken("comment", "'.*$");
        rules.addToken("hexconstant", "\\&H\\d+");
        rules.addToken("floatconstant", "\\d*\\.\\d+");
        rules.addToken("intconstant", "-?\\d+");
        rules.addToken("stringconstant", '"[^"]*"');
        rules.addToken("label", "^([a-zA-Z][a-zA-Z0-9_]*:|\\d+)");
        rules.addToken("identifier", "[a-zA-Z_][a-zA-Z0-9_]*(\\$|%|#|&|!)?");

        rules.addRule("program: statements", onProgram);
        rules.addRule("statements: statement*");

        rules.addRule("statement: label istatement separator", function (args, locus) {
            var label = args[0];
            if (label.substr(-1) == ":") {
                label = label.substr(0, label.length - 1);
            }
            return [new AstLabel(locus, label), args[1]];
        });
        rules.addRule("statement: label", function (args, locus) {
            var label = args[0];
            if (label.substr(-1) == ":") {
                label = label.substr(0, label.length - 1);
            }
            return new AstLabel(locus, label);
        });

        rules.addRule("statement: istatement ? separator");
        rules.addRule("istatement: CONST identifier '=' expr", function (args, locus) {
            return new AstConstStatement(locus, args[1], args[3]);
        });
        rules.addRule("istatement: DECLARE FUNCTION identifier ArgList", function (args, locus) {
            return new AstDeclareFunction(locus, args[2], args[3], true);
        });
        rules.addRule("istatement: DECLARE SUB identifier ArgList", function (args, locus) {
            return new AstDeclareFunction(locus, args[2], args[3], false);
        });
        rules.addRule("istatement: SUB identifier ArgList STATIC? statements END SUB", function (args, locus) {
            return new AstSubroutine(locus, args[1], args[2], args[4], false, args[3] !== null);
        });
        rules.addRule("istatement: FUNCTION identifier ArgList statements END FUNCTION", function (symbols, locus) {
            return new AstSubroutine(locus, symbols[1], symbols[2], symbols[3], true);
        });
        rules.addRule("istatement: DEF SEG ('=' expr)?", function (args, locus) {
            return new AstNullStatement(locus);
        });
        rules.addRule("istatement: DEF identifier ArgList '=' expr", function (args, locus) {
            return new AstNullStatement(locus);
        });
        rules.addRule("istatement: DEFINT identifier minus identifier", function (args, locus) {
            return new AstDefTypeStatement(locus, "INTEGER");
        });
        rules.addRule("istatement: VIEW PRINT", function (args, locus) {
            return new AstNullStatement(locus);
        });
        rules.addRule("istatement: DIM DimList", UseSecond);
        rules.addRule("istatement: DIM SHARED DimList", function (args, locus) {
            for (var i = 0; i < args[2].length; i++) {
                args[2][i].shared = true;
            }
            return args[2];
        });
        rules.addRule("istatement: WHILE expr separator statements WEND", function (args, locus) {
            return new AstWhileLoop(locus, args[1], args[3]);
        });
        rules.addRule("istatement: DO separator statements LOOP", function (args, locus) {
            return new AstDoStatement(locus, args[2], null, AstDoStatement.INFINITE);
        });
        rules.addRule("istatement: DO separator statements LOOP WHILE expr", function (args, locus) {
            return new AstDoStatement(locus, args[2], args[5], AstDoStatement.WHILE_AT_END);
        });
        rules.addRule("istatement: DO separator statements LOOP UNTIL expr", function (args, locus) {
            return new AstDoStatement(locus, args[2], args[5], AstDoStatement.UNTIL);
        });
        rules.addRule("istatement: DO WHILE expr separator statements LOOP", function (args, locus) {
            return new AstWhileLoop(locus, args[2], args[4]);
        });
        rules.addRule("istatement: FOR identifier '=' expr TO expr", function (args, locus) {
            return new AstForLoop(locus, args[1], args[3], args[5], new AstConstantExpr(locus, 1));
        });
        rules.addRule("istatement: FOR identifier '=' expr TO expr STEP expr", function (args, locus) {
            return new AstForLoop(locus, args[1], args[3], args[5], args[7]);
        });
        rules.addRule("istatement: NEXT identifiers?", function (args, locus) {
            if (args[1] === null) {
                args[1] = [];
            }
            return new AstNextStatement(locus, args[1]);
        });
        rules.addRule("istatement: EXIT (FOR|DO)", function (args, locus) {
            return new AstExitStatement(locus, args[1]);
        });
        rules.addRule("identifiers: MoreIdentifiers* identifier", JoinListsLR);
        rules.addRule("MoreIdentifiers: identifier ','", UseFirst);
        rules.addRule("istatement: END", function (args, locus) {
            return new AstEndStatement(locus);
        });
        rules.addRule("istatement: GOSUB identifier", function (args, locus) {
            return new AstGosubStatement(locus, args[1]);
        });
        rules.addRule("istatement: GOTO identifier", function (args, locus) {
            return new AstGotoStatement(locus, args[1]);
        });
        rules.addRule("istatement: IF expr THEN istatement", function (args, locus) {
            return new AstIfStatement(locus, args[1], args[3], null);
        });
        rules.addRule("istatement: IF expr THEN separator statements ElseClause END IF", function (args, locus) {
            return new AstIfStatement(locus, args[1], args[4], args[5]);
        });
        rules.addRule("ElseClause: ELSE IF expr THEN separator statements ElseClause", function (args, locus) {
            return new AstIfStatement(locus, args[2], args[5], args[6]);
        });

        rules.addRule("ElseClause: ELSE statements", UseSecond);

        rules.addRule("ElseClause:", function (args, locus) {
            return new AstNullStatement(locus);
        });
        rules.addRule("istatement: SELECT CASE expr separator case* END SELECT", function (args, locus) {
            return new AstSelectStatement(locus, args[2], args[4]);
        });

        rules.addRule("case: CASE exprList separator statements", function (args, locus) {
            return new AstCaseStatement(locus, args[1], args[3]);
        });

        rules.addRule("case: CASE ELSE separator statements", function (args, locus) {
            return new AstCaseStatement(locus, [], args[3]);
        });

        rules.addRule("exprList: moreExpr* expr", JoinListsLR);

        rules.addRule("moreExpr: expr ','", UseFirst);

        rules.addRule("istatement: INPUT constant? (';'|',') identifiers", function (args, locus) {
            return new AstInputStatement(locus, args[1], args[2] == ";", args[3]);
        });
        rules.addRule("istatement: LINE? INPUT identifiers", function (args, locus) {
            return new AstInputStatement(locus, null, false, args[2]);
        });
        rules.addRule("istatement: POKE expr ',' expr", function (args, locus) {
            return new AstNullStatement(locus);
        });
        rules.addRule("istatement: PRINT", function (args, locus) {
            return new AstPrintStatement(locus, []);
        });
        rules.addRule("istatement: PRINT PrintItems", function (args, locus) {
            return new AstPrintStatement(locus, args[1]);
        });
        rules.addRule("istatement: PRINT USING [expr,';'] (';'|',')?", function (args, locus) {
            return new AstPrintUsingStatement(locus, args[2], args[3]);
        });
        rules.addRule("PrintItems: PrintItem", function (args, locus) {
            return args;
        });
        rules.addRule("PrintItems: MorePrintItems* PrintItem (';'|',')?", function (args, locus) {
            args[1].terminator = args[2];
            args[0].push(args[1]);
            return args[0];
        });
        rules.addRule("MorePrintItems: PrintItem (';'|',')", function (args, locus) {
            args[0].terminator = args[1];
            return args[0];
        });

        rules.addRule("PrintItem: expr", function (args, locus) {
            return new AstPrintItem(locus, AstPrintItem.EXPR, args[0], null);
        });

        rules.addRule("PrintItem: TAB '\\(' expr '\\)'", function (args, locus) {
            return new AstPrintItem(locus, AstPrintItem.TAB, args[2], null);
        });

        rules.addRule("PrintItem:", function (args, locus) {
            return new AstPrintItem(locus, AstPrintItem.EXPR, null, null);
        });
        rules.addRule("RemItem: expr", function (args, locus) {
            return new AstNoop(locus, AstNoop.EXPR, args[0], null);
        });

        rules.addRule("RemItem: TAB '\\(' expr '\\)'", function (args, locus) {
            return new AstNoop(locus, AstNoop.TAB, args[2], null);
        });

        rules.addRule("RemItem:", function (args, locus) {
            return new AstNoop(locus, AstNoop.EXPR, null, null);
        });
        rules.addRule("istatement: RESTORE identifier?", function (args, locus) {
            return new AstRestoreStatement(locus, args[1]);
        });
        rules.addRule("istatement: RETURN", function (args, locus) {
            return new AstReturnStatement(locus);
        });
        rules.addRule("istatement: DATA [DataConstant,',']", function (args, locus) {
            return new AstDataStatement(locus, args[1]);
        });
        rules.addRule("DataConstant: identifier", function (args, locus) {
            return new AstConstantExpr(locus, args[0]);
        });
        rules.addRule("DataConstant: constant");
        rules.addRule("DataConstant:", function (args, locus) {
            return new AstConstantExpr(locus, null);
        });
        rules.addRule("istatement: TYPE identifier separator TypeMembers END TYPE", function (args, locus) {
            return new AstUserType(locus, args[1], args[3]);
        });
        rules.addRule("istatement: AssignStatement");
        rules.addRule("AssignStatement: ReferenceList '=' expr2", function (args, locus) {
            return new AstAssignStatement(locus, args[0], args[2]);
        });
        rules.addRule("istatement: identifier Parameters", function (args, locus) {
            return new AstCallStatement(locus, args[0], args[1]);
        });
        rules.addRule("Parameters: ", EmptyList);
        rules.addRule("Parameters: '\\(' ParameterList '\\)'", UseSecond);
        rules.addRule("Parameters: ParameterList");
        rules.addRule("ParameterList: [Parameter,',']");
        rules.addRule("Parameter: expr");
        rules.addRule("Parameter:", function (args, locus) {
            return new AstConstantExpr(locus, null);
        });

        rules.addRule("DimList: Dim MoreDims*", JoinLists);
        rules.addRule("MoreDims: ',' Dim", UseSecond);
        rules.addRule("Dim: identifier AsType?", function (args, locus) {
            return new AstDimStatement(locus, args[0], [], args[1]);
        });
        rules.addRule("Dim: identifier '\\(' RangeList '\\)' AsType?", function (args, locus) {
            return new AstDimStatement(locus, args[0], args[2], args[4]);
        });
        rules.addRule("AsType: AS identifier", UseSecond);
        rules.addRule("RangeList:", function (args, locus) {
            return null;
        });
        rules.addRule("RangeList: Range MoreRanges*", JoinLists);
        rules.addRule("MoreRanges: ',' Range", UseSecond);
        rules.addRule("Range: expr EndRange?", function (symbols, locus) {
            if (symbols[1]) {
                return new AstRange(locus, symbols[0], symbols[1]);
            } else {
                return new AstRange(locus, new AstConstantExpr(locus, 0), symbols[0]);
            }
        });
        rules.addRule("EndRange: TO expr", UseSecond);
        rules.addRule("TypeMembers: TypeMember*");
        rules.addRule("TypeMember: identifier AS identifier separator", function (args, locus) {
            return new AstTypeMember(locus, args[0], args[2]);
        });
        rules.addRule("ArgList:", function (args, locus) {
            return [];
        });
        rules.addRule("ArgList: '\\(' [ Argument , ',' ] '\\)'", function (args, locus) {
            return args[1];
        });
        rules.addRule("Argument: identifier OptParen? AS identifier", function (args, locus) {
            return new AstArgument(locus, args[0], args[3], args[1] !== null);
        });
        rules.addRule("Argument: identifier OptParen?", function (args, locus) {
            return new AstArgument(locus, args[0], null, args[1] !== null);
        });
        rules.addRule("OptParen: '\\(' '\\)'");
        rules.addRule("expr: expr2");
        rules.addRule("expr2: expr2 OR expr3", onBinaryOp);
        rules.addRule("expr2: expr3");
        rules.addRule("expr3: expr3 AND expr4", onBinaryOp);
        rules.addRule("expr3: expr4");
        rules.addRule("expr4: expr4 '=' expr5", onBinaryOp);
        rules.addRule("expr4: expr4 '<>' expr5", onBinaryOp);
        rules.addRule("expr4: expr4 '>' expr5", onBinaryOp);
        rules.addRule("expr4: expr4 '<' expr5", onBinaryOp);
        rules.addRule("expr4: expr4 '<=' expr5", onBinaryOp);
        rules.addRule("expr4: expr4 '>=' expr5", onBinaryOp);
        rules.addRule("expr4: expr5");
        rules.addRule("expr5: expr5 MOD expr6", onBinaryOp);
        rules.addRule("expr5: expr6");
        rules.addRule("expr6: expr6 '\\+' expr7", onBinaryOp);
        rules.addRule("expr6: expr6 '\\-' expr7", onBinaryOp);
        rules.addRule("expr6: expr7");
        rules.addRule("expr7: expr7 '\\*' expr8", onBinaryOp);
        rules.addRule("expr7: expr7 '\\/' expr8", onBinaryOp);
        rules.addRule("expr7: expr8");
        rules.addRule("expr8: '\\(' expr '\\)'", onBracketExpr);

        rules.addRule("expr8: NOT expr9", function (args, locus) {
            return new AstUnaryOperator(locus, "NOT", args[1]);
        });
        rules.addRule("expr8: expr9");
        rules.addRule("expr9: constant");
        rules.addRule("expr9: expr10");
        rules.addRule("expr10: ReferenceList");
        rules.addRule("constant: hexconstant", onNumber);
        rules.addRule("constant: intconstant", onNumber);
        rules.addRule("constant: floatconstant", onNumber);
        rules.addRule("constant: stringconstant", onString);
        rules.addRule("ReferenceList: ReferenceList '\\.' identifier", function (args, locus) {
            return new AstMemberDeref(locus, args[0], args[2]);
        });

        rules.addRule("ReferenceList: ReferenceList '\\(' ParameterList '\\)'", function (args, locus) {
            return new AstArrayDeref(locus, args[0], args[2]);
        });
        rules.addRule("ReferenceList: Reference");
        rules.addRule("Reference: identifier", function (args, locus) {
            return new AstVariableReference(locus, args[0]);
        });

        rules.addRule("separator: endl+");
        rules.addRule("separator: comment endl");
        rules.addRule("separator: ':'");

        rules.buildSet.check(this.errors);
        for (var i = 0; i < this.errors.length; i++) {
            dbg.printf("%s\n", this.errors[i]);
        }

        rules.buildSet.finalize();

        QBasicProgram.parser = new EarleyParser(rules.buildSet);
    }

    input += "\n";

    var astProgram = QBasicProgram.parser.parse(input);
    if (astProgram === null) {
        this.errors = QBasicProgram.parser.errors;
        dbg.printf("Parse failed.\n");
        return;
    }

    var typeChecker = new TypeChecker(this.errors);
    astProgram.accept(typeChecker);

    if (this.errors.length > 0) {
        dbg.printf("There were errors.\n");
        return;
    }

    var codeGenerator = new CodeGenerator();
    astProgram.accept(codeGenerator);

    this.sourcecode = input;
    this.instructions = codeGenerator.instructions;
    this.types = typeChecker.types;
    this.defaultType = typeChecker.defaultType;
    this.data = codeGenerator.data;
    this.shared = codeGenerator.shared;
    this.lineMap = codeGenerator.lineMapping;
}

QBasicProgram.parser = null;

QBasicProgram.prototype = {
    getByteCodeAsString: function () {
        if (!this.instructions) {
            return "";
        }
        var source = this.sourcecode.split("\n");
        var lines = [];
        for (var i = 0; i < this.instructions.length; i++) {
            var locus = this.lineMap[i];
            if (locus) {
                lines.push("   ' L" + (locus.line + 1) + " " + source[locus.line]);
            }
            lines.push("[" + i + "] " + this.instructions[i]);
        }
        return lines.join("\n");
    }
};

var cons = new Console();
var virtualMachine = new VirtualMachine(cons);

function compile(text: string) {
    var program = new QBasicProgram(text);

    if (program.errors.length === 0) {
        var bytecode = program.getByteCodeAsString();
        virtualMachine.run(program, false);
        return {
            error: false,
            errors: [],
            get program() {
                return program;
            },
            get source() {
                return text;
            },
            get bytecode() {
                return bytecode;
            }
        };
    } else {
        virtualMachine.reset(null);

        return {
            error: true,
            errors: program.errors,
            get program() {
                return program;
            },
            get source() {
                return text;
            },
            get bytecode() {
                return bytecode;
            }
        };
    }
}

var dbg = new DebugConsole();

export { compile, dbg as debugConsole, cons as qbConsole, virtualMachine as vm };
