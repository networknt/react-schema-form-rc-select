/**
 * Created by steve on 15/09/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSchemaFormLibComposedComponent = require('react-schema-form/lib/ComposedComponent');

var _reactSchemaFormLibComposedComponent2 = _interopRequireDefault(_reactSchemaFormLibComposedComponent);

var _rcSelect = require('rc-select');

var _rcSelect2 = _interopRequireDefault(_rcSelect);

var RcSelect = (function (_React$Component) {
    _inherits(RcSelect, _React$Component);

    function RcSelect(props) {
        _classCallCheck(this, RcSelect);

        _get(Object.getPrototypeOf(RcSelect.prototype), 'constructor', this).call(this, props);
        this.onSelect = this.onSelect.bind(this);
        this.onDeselect = this.onDeselect.bind(this);
        this.state = {
            currentValue: [],
            items: this.props.form.items
        };
    }

    _createClass(RcSelect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // load items if needed.
            if (!this.props.form.items) {
                console.log('RcSelect.componentWillMount', this.props.form);
            }
        }
    }, {
        key: 'onSelect',
        value: function onSelect(value, option) {
            console.log('RcSelect onSelect is called', value, option);
            var v = this.state.currentValue;
            v.push(value);
            this.setState({
                currentValue: v
            });
            this.props.onChangeValidate(v);
        }
    }, {
        key: 'onDeselect',
        value: function onDeselect(value, option) {
            console.log('RcSelect onDeselect is called', value, option);
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
    }, {
        key: 'render',
        value: function render() {
            var options = this.props.form.items.map(function (item, idx) {
                return _react2['default'].createElement(
                    _rcSelect.Option,
                    { key: idx, value: item.value },
                    item.label
                );
            });
            console.log('render', this.props.form);
            return _react2['default'].createElement(
                _rcSelect2['default'],
                {
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
                    style: this.props.form.style || { width: "100%" } },
                options
            );
        }
    }]);

    return RcSelect;
})(_react2['default'].Component);

exports['default'] = (0, _reactSchemaFormLibComposedComponent2['default'])(RcSelect);
module.exports = exports['default'];