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
    var emptyValue = _this.props.form.schema.type === 'array' ? [] : null;
    _this.state = {
      currentValue: _this.props.value || emptyValue,
      items: _this.props.form.items
    };
    return _this;
  }

  _createClass(RcSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // load items if needed.
      if (this.props.form.action) {
        if (this.props.form.action.get) {
          fetch(this.props.form.action.get.url).then(function (res) {
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
        } else if (this.props.form.action.post) {
          fetch(this.props.form.action.post.url, {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(this.props.form.action.post.parameter)
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
    value: function onSelect(value, option) {
      if (this.props.form.schema.type === 'array') {
        // multiple select type array
        var v = this.state.currentValue;
        v.push(value);
        this.setState({
          currentValue: v
        });
        this.props.onChangeValidate(v);
      } else {
        // single select type string fake an event here.
        this.setState({
          currentValue: value
        });
        this.props.onChangeValidate({
          target: {
            value: value
          }
        });
      }
    }
  }, {
    key: "onDeselect",
    value: function onDeselect(value, option) {
      if (this.props.form.schema.type === 'array') {
        var v = this.state.currentValue;
        var index = v.indexOf(value);

        if (index > -1) {
          v.splice(index, 1);
        }

        this.setState({
          currentValue: v
        });
        this.props.onChangeValidate(v);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var options = [];

      if (this.state.items && this.state.items.length > 0) {
        options = this.state.items.map(function (item, idx) {
          return _react["default"].createElement(_rcSelect.Option, {
            key: idx,
            value: item.value
          }, item.label);
        });
      } else if (this.props.form.titleMap) {
        options = this.props.form.titleMap.map(function (item, idx) {
          return _react["default"].createElement(_rcSelect.Option, {
            key: idx,
            value: item.value
          }, item.name);
        });
      }

      var error = '';

      if (this.props.error) {
        error = _react["default"].createElement("div", {
          style: {
            color: 'red'
          }
        }, this.props.error);
      }

      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, this.props.form.title), _react["default"].createElement(_rcSelect["default"], {
        className: this.props.form.className,
        dropdownClassName: this.props.form.dropdownClassName,
        dropdownStyle: this.props.form.dropdownStyle,
        dropdownMenuStyle: this.props.form.dropdownMenuStyle,
        allowClear: this.props.form.allowClear,
        tags: this.props.form.tags,
        maxTagTextLength: this.props.form.maxTagTextLength,
        multiple: this.props.form.multiple,
        combobox: this.props.form.combobox,
        disabled: this.props.form.disabled,
        value: this.state.currentValue,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        style: this.props.form.style || {
          width: '100%'
        }
      }, options), error);
    }
  }]);

  return RcSelect;
}(_react["default"].Component);

var _default = (0, _reactSchemaForm.ComposedComponent)(RcSelect);

exports["default"] = _default;