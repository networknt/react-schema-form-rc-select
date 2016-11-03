'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('react-schema-form/lib/ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _rcSelect = require('rc-select');

var _rcSelect2 = _interopRequireDefault(_rcSelect);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RcSelect = function (_React$Component) {
    _inherits(RcSelect, _React$Component);

    function RcSelect(props) {
        _classCallCheck(this, RcSelect);

        var _this = _possibleConstructorReturn(this, (RcSelect.__proto__ || Object.getPrototypeOf(RcSelect)).call(this, props));

        _this.onSelect = _this.onSelect.bind(_this);
        _this.onDeselect = _this.onDeselect.bind(_this);
        var emptyValue = _this.props.form.schema.type === 'array' ? [] : null;
        _this.state = {
            currentValue: _this.props.value || emptyValue,
            items: _this.props.form.items
        };
        return _this;
    }

    _createClass(RcSelect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // load items if needed.
            if (this.props.form.action) {
                if (this.props.form.action.get) {
                    _jquery2.default.ajax({
                        type: 'GET',
                        url: this.props.form.action.get.url
                    }).done(function (data) {
                        this.setState({ items: data });
                    }.bind(this)).fail(function (error) {
                        console.error('error', error);
                    });
                } else if (this.props.form.action.post) {
                    _jquery2.default.ajax({
                        type: 'POST',
                        url: this.props.form.action.post.url,
                        data: JSON.stringify(this.props.form.action.post.parameter),
                        contentType: 'application/json',
                        dataType: 'json'
                    }).done(function (data) {
                        this.setState({ items: data });
                    }.bind(this)).fail(function (error) {
                        console.error('error', error);
                    });
                }
            }
        }
    }, {
        key: 'onSelect',
        value: function onSelect(value, option) {
            //console.log('RcSelect onSelect is called', value, option);
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
                this.setState({ currentValue: value });
                this.props.onChangeValidate({ target: { value: value } });
            }
        }
    }, {
        key: 'onDeselect',
        value: function onDeselect(value, option) {
            //console.log('RcSelect onDeselect is called', value, option);
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
        key: 'render',
        value: function render() {
            //console.log("render", this.props, this.state);
            var options = [];
            if (this.state.items && this.state.items.length > 0) {
                options = this.state.items.map(function (item, idx) {
                    return _react2.default.createElement(
                        _rcSelect.Option,
                        { key: idx, value: item.value },
                        item.label
                    );
                });
            }
            var error = '';
            if (this.props.error) {
                error = _react2.default.createElement(
                    'div',
                    { style: { color: 'red' } },
                    this.props.error
                );
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _rcSelect2.default,
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
                        style: this.props.form.style || { width: '100%' } },
                    options
                ),
                error
            );
        }
    }]);

    return RcSelect;
}(_react2.default.Component);

exports.default = (0, _ComposedComponent2.default)(RcSelect);