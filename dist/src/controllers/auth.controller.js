function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { asyncMW } from "../utils/async-middleware.js";
import { jwtNumericDate, jwtSign } from "../lib/jwt.js";
import { createUser, findUserByEmail } from "../services/user.services.js";
import ResponseHandler from "../lib/responseHandler.js";
import { passwordHash, passwordMatch } from "../lib/security.js";
import { validationSchemaForSignUp } from "../validationSchemas/auth/validationSchemaForSignUp.js";
import { validationSchemaForSignIn } from "../validationSchemas/auth/validationSchemaForSignIn.js";
var TOKEN_EXP_TIME = 60 * 60;
export var signUp = asyncMW(function() {
    var _ref = _async_to_generator(function(req, res) {
        var _validationSchemaForSignUp_parse, email, password, alreadyExistUser, encryptedPassword, user, token;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _validationSchemaForSignUp_parse = validationSchemaForSignUp.parse(req.body), email = _validationSchemaForSignUp_parse.email, password = _validationSchemaForSignUp_parse.password;
                    return [
                        4,
                        findUserByEmail(email)
                    ];
                case 1:
                    alreadyExistUser = _state.sent();
                    if (alreadyExistUser) {
                        return [
                            2,
                            ResponseHandler.conflict(res, "User already exists")
                        ];
                    }
                    return [
                        4,
                        passwordHash(password)
                    ];
                case 2:
                    encryptedPassword = _state.sent();
                    return [
                        4,
                        createUser(_object_spread_props(_object_spread({}, req.body), {
                            password: encryptedPassword
                        }))
                    ];
                case 3:
                    user = _state.sent();
                    token = jwtSign({
                        kind: "user-authentication-token",
                        sub: {
                            id: user.id
                        },
                        iat: jwtNumericDate(new Date()),
                        exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME
                    });
                    return [
                        2,
                        ResponseHandler.success(res, {
                            token: token
                        }, "SignUp successfully !!")
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
export var signIn = asyncMW(function() {
    var _ref = _async_to_generator(function(req, res) {
        var _validationSchemaForSignIn_parse, email, password, user, isMatched, token;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _validationSchemaForSignIn_parse = validationSchemaForSignIn.parse(req.body), email = _validationSchemaForSignIn_parse.email, password = _validationSchemaForSignIn_parse.password;
                    return [
                        4,
                        findUserByEmail(email)
                    ];
                case 1:
                    user = _state.sent();
                    if (!user) {
                        return [
                            2,
                            ResponseHandler.notFound(res, "User not found")
                        ];
                    }
                    return [
                        4,
                        passwordMatch(password, user.password)
                    ];
                case 2:
                    isMatched = _state.sent();
                    if (!isMatched) {
                        return [
                            2,
                            ResponseHandler.notFound(res, "Incorrect  password")
                        ];
                    }
                    token = jwtSign({
                        kind: "user-authentication-token",
                        sub: {
                            id: user.id
                        },
                        iat: jwtNumericDate(new Date()),
                        exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME
                    });
                    return [
                        2,
                        ResponseHandler.success(res, {
                            token: token
                        }, "SignIn successfully !!")
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
export var verifyToken = asyncMW(function() {
    var _ref = _async_to_generator(function(req, res) {
        var user, sanitizedUser;
        return _ts_generator(this, function(_state) {
            user = req.user;
            sanitizedUser = _object_spread_props(_object_spread({}, user), {
                password: undefined
            });
            return [
                2,
                ResponseHandler.success(res, sanitizedUser, "Token verified!!")
            ];
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
