function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
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
var ResponseHandler = function ResponseHandler() {
    "use strict";
    _class_call_check(this, ResponseHandler);
};
_define_property(ResponseHandler, "success", function(res, data, message) {
    return res.status(200).json({
        success: true,
        message: message,
        code: 200,
        data: data
    });
});
_define_property(ResponseHandler, "created", function(res, data, message) {
    return res.status(201).json({
        success: true,
        message: message,
        code: 201,
        data: data
    });
});
_define_property(ResponseHandler, "serverError", function(res, error) {
    var message = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "Something went wrong";
    return res.status(500).json({
        success: false,
        message: message,
        code: 500,
        error: error
    });
});
_define_property(ResponseHandler, "badRequest", function(res, error) {
    var message = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "Bad Request";
    return res.status(400).json({
        success: false,
        message: message,
        code: 400,
        error: error
    });
});
_define_property(ResponseHandler, "notFound", function(res, message) {
    return res.status(404).json({
        success: false,
        message: message,
        code: 404
    });
});
_define_property(ResponseHandler, "unAuthorized", function(res, message) {
    return res.status(401).json({
        success: false,
        message: message,
        code: 401
    });
});
_define_property(ResponseHandler, "conflict", function(res, message) {
    return res.status(409).json({
        success: false,
        message: message,
        code: 409
    });
});
export default ResponseHandler;
