"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSchemaForm = require("react-schema-form");

var _rcSelect = _interopRequireWildcard(require("rc-select"));

require("rc-select/assets/index.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RcSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RcSelect, _React$Component);

  function RcSelect(props) {
    var _this;

    _classCallCheck(this, RcSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RcSelect).call(this, props));
    _this.onSelect = _this.onSelect.bind(_assertThisInitialized(_this));
    _this.onDeselect = _this.onDeselect.bind(_assertThisInitialized(_this));
    var _this$props = _this.props,
        value = _this$props.value,
        _this$props$form = _this$props.form,
        type = _this$props$form.schema.type,
        items = _this$props$form.items;
    var emptyValue = type === "array" ? [] : null;
    _this.state = {
      currentValue: value || emptyValue,
      items: items
    };
    return _this;
  }

  _createClass(RcSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // load items if needed.
      var action = this.props.form.action;

      var _ref = action || {},
          get = _ref.get,
          post = _ref.post;

      if (action) {
        if (get) {
          fetch(get.url).then(function (res) {
            if (!res.ok) throw Error(res.statusText);
            return res;
          }).then(function (res) {
            return res.json();
          }).then(function (res) {
            _this2.setState({
              items: res
            });
          })["catch"](function (error) {
            console.error(error);
          });
        } else if (post) {
          fetch(post.url, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(post.parameter)
          }).then(function (res) {
            if (!res.ok) throw Error(res.statusText);
            return res;
          }).then(function (res) {
            return res.json();
          }).then(function (res) {
            console.log(res);

            _this2.setState({
              items: res
            });
          })["catch"](function (error) {
            console.error(error);
          });
        }
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect(value) {
      var _this3 = this;

      var _this$props2 = this.props,
          onChangeValidate = _this$props2.onChangeValidate,
          type = _this$props2.form.schema.type;

      if (type === "array") {
        // multiple select type array
        this.setState(function (prevState) {
          return {
            currentValue: prevState.currentValue.concat(value)
          };
        }, function () {
          var currentValue = _this3.state.currentValue;
          onChangeValidate(currentValue);
        });
      } else {
        // single select type string fake an event here.
        this.setState({
          currentValue: value
        });
        onChangeValidate({
          target: {
            value: value
          }
        });
      }
    }
  }, {
    key: "onDeselect",
    value: function onDeselect(value) {
      var _this4 = this;

      var _this$props3 = this.props,
          onChangeValidate = _this$props3.onChangeValidate,
          type = _this$props3.form.schema.type;

      if (type === "array") {
        this.setState(function (prevState) {
          return {
            currentValue: prevState.currentValue.filter(function (e) {
              return e !== value;
            })
          };
        }, function () {
          var currentValue = _this4.state.currentValue;
          onChangeValidate(currentValue);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          error = _this$props4.error,
          _this$props4$form = _this$props4.form,
          title = _this$props4$form.title,
          className = _this$props4$form.className,
          dropdownClassName = _this$props4$form.dropdownClassName,
          dropdownStyle = _this$props4$form.dropdownStyle,
          dropdownMenuStyle = _this$props4$form.dropdownMenuStyle,
          allowClear = _this$props4$form.allowClear,
          tags = _this$props4$form.tags,
          maxTagTextLength = _this$props4$form.maxTagTextLength,
          multiple = _this$props4$form.multiple,
          combobox = _this$props4$form.combobox,
          disabled = _this$props4$form.disabled,
          style = _this$props4$form.style,
          titleMap = _this$props4$form.titleMap;
      var currentValue = this.state.currentValue;
      var items = this.state.items;
      var options = [];

      if (items && items.length > 0) {
        options = items.map(function (item) {
          return _react["default"].createElement(_rcSelect.Option, {
            key: Object.keys(item)[0],
            value: Object.keys(item)[0]
          }, item[Object.keys(item)[0]]);
        });
      } else if (titleMap) {
        options = titleMap.map(function (item) {
          return _react["default"].createElement(_rcSelect.Option, {
            key: item.value,
            value: item.value
          }, item.name);
        });
      }

      var err = "";

      if (error) {
        err = _react["default"].createElement("div", {
          style: {
            color: "red"
          }
        }, error);
      }

      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, title), _react["default"].createElement(_rcSelect["default"], {
        className: className,
        dropdownClassName: dropdownClassName,
        dropdownStyle: dropdownStyle,
        dropdownMenuStyle: dropdownMenuStyle,
        allowClear: allowClear,
        tags: tags,
        maxTagTextLength: maxTagTextLength,
        multiple: multiple,
        combobox: combobox,
        disabled: disabled,
        value: currentValue,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        style: style || {
          width: "100%"
        }
      }, options), err);
    }
  }]);

  return RcSelect;
}(_react["default"].Component);

var _default = (0, _reactSchemaForm.ComposedComponent)(RcSelect);

exports["default"] = _default;