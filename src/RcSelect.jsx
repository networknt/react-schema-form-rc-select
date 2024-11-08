/**
 * Created by steve on 15/09/15.
 */
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import InputLabel from '@mui/material/InputLabel'
import { ComposedComponent } from 'react-schema-form'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css';
import ObjectPath from 'object-path'

/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.format = function () {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi')
    formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted
}

function RcSelect(props) {
  const {
    value,
    error,
    onChangeValidate,
    form: {
      schema: { type },
      action,
      items,
      title,
      required,
      labelProps,
      className,
      dropdownClassName,
      dropdownStyle,
      allowClear,
      tags,
      maxTagTextLength,
      multiple,
      combobox,
      disabled,
      filterOption,
      optionFilterProp,
      titleMap
    },
    model
  } = props
  const emptyValue = type === 'array' ? [] : undefined
  // console.log("state", value, emptyValue);
  const [currentValue, setCurrentValue] = useState(value || emptyValue)
  const [menuItems, setMenuItems] = useState(items || [])
  const { url, params } = action || {}
  const paramValues =
    params && params.some((e) => e != null)
      ? params.map((x) => ObjectPath.get(model, x))
      : []

  useEffect(() => {
    const fetchUrl = params
      ? paramValues.length > 0
        ? url.format(...paramValues)
        : ''
      : url
    // console.log("useEffect is called", fetchUrl);
    if (fetchUrl) {
      // console.log("fetchUrl is called", fetchUrl)
      fetchFromUrl(fetchUrl)
    }
  }, paramValues)

  useEffect(() => {
    if (type === 'array') {
      // console.log('onChangeValidate is called with ', currentValue)
      onChangeValidate(currentValue)
    } else {
      // don't set the value if the currentValue is null
      if(currentValue !== null) {
        onChangeValidate({ target: { value: currentValue } })
      }
    }
  }, [currentValue])

  const onSelect = (value) => {
    if (type === 'array') {
      // multiple select type array
      setCurrentValue((prevValue) => prevValue.concat(value))
    } else {
      // console.log('onSelect is called with value ', value)
      setCurrentValue(value)
    }
  }

  const onChange = (v) => {
    if (combobox && type !== 'array') {
      setCurrentValue(v);
    }
  }

  const onDeselect = (value) => {
    if (type === 'array') {
      setCurrentValue((prevValue) => prevValue.filter((e) => e !== value))
    }
  }

  const fetchFromUrl = (newUrl) => {
    const cookies = new Cookies()
    const headers = { 'Content-Type': 'application/json' }
    if (cookies.get('csrf'))
      Object.assign(headers, { 'X-CSRF-TOKEN': cookies.get('csrf') })
    fetch(newUrl, { headers, credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.text().then((text) => {
          throw new Error(text)
        })
      })
      .then((res) => {
        setMenuItems(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  let options = []
  if (menuItems && menuItems.length > 0) {
    options = menuItems.map((item) => (
      <Option key={Object.keys(item)[0]} value={Object.keys(item)[0]}>
        {item[Object.keys(item)[0]]}
      </Option>
    ))
  } else if (titleMap) {
    options = titleMap.map((item) => (
      <Option key={item.value} value={item.value}>
        {item.name}
      </Option>
    ))
  }
  let err = ''
  if (error) {
    err = <div style={{ color: 'red' }}>{error}</div>
  }
  // console.log("currentValue", currentValue)
  return (
    <div>
      <InputLabel required={required} {...labelProps}>
        {title}
      </InputLabel>
      <Select
        className={className}
        dropdownClassName={dropdownClassName}
        dropdownStyle={dropdownStyle}
        allowClear={allowClear}
        tags={tags}
        maxTagTextLength={maxTagTextLength}
        multiple={multiple}
        combobox={combobox}
        disabled={disabled}
        filterOption={filterOption}
        optionFilterProp={optionFilterProp}
        value={currentValue}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onChange={onChange}
      >
        {options}
      </Select>
      {err}
    </div>
  )
}

export default ComposedComponent(RcSelect)
