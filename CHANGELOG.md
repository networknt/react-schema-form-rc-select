# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

## 1.0.4 - 2022-01-18
### Added

### Changed

- Fixes #59 switch onInputKeydown to onChange as the last char is not captured

## 1.0.3 - 2022-01-18
### Added

### Changed

- Fixes #58 add onInputKeyDown to handle the combobox single value update

## 1.0.2 - 2022-01-17
### Added

### Changed

- Fixes #57 avoid setting the value if the value is null

## 1.0.1 - 2021-12-26
### Added

### Changed

- Fixes #52 Upgrade to the react 17 and material ui 5

## 0.3.19 - 2021-12-25
### Added

### Changed

- Fixes #53 do not reset the emptyValue for dynamic field with params

## 0.3.18 - 2020-10-31
### Added

### Changed

- Fixes #37 add X-CSRF-TOKEN to the header to integrate with light-portal

## 0.3.17 - 2020-10-31
### Added

### Changed

- Fixes #36 add credentials omit in the fetch for light-portal query

## 0.3.16 - 2020-09-21
### Added

### Changed

- Fixes #33 reset value only for single and params are not empty
- fixes #32 change the format of the dynmaic url to string format
- fixes #31 upgrade the project structure with create-react-library

## 0.3.14 - 2020-06-24
### Added

### Changed

- Fixes #26 for the fetch request, output the entire error instead of error code only

### Changed

## 0.3.9 - 2020-05-12
### Added

### Changed

- Fixes #24 add filterOption and optionFilterProp to the rc-select component

## 0.3.8 - 2020-04-21
### Added

### Changed

- Fixes #20 switch to InputLabel to support required flag in title.

## 0.3.7 - 2020-03-18
### Added

### Changed

- handle the model is undefined when calling the replacer.

## 0.3.6 - 2020-03-16
### Added

### Changed

- Resolve a defect with replacer when model is empty.

## 0.3.4 - 2020-03-16
### Added

### Changed

- Refactor the fetch and resolve lint issues.

## 0.3.2 - 2020-03-16
### Added

### Changed

- Add support to the cascade select between multiple selects.

## 0.3.1 - 2019-12-01
### Added

### Changed
- Resolve all lint issues. 
- User unnamed export for the single module RcSelect.

## 0.3.0 - 2019-11-30
### Added

### Changed
- Upgrade to react-schema-form 0.8.0
- Upgrade all other dependencies to the latest.

## 0.2.1 - 2017-06-02
### Added

### Changed
- Upgrade to react-schema-form 0.3.4

## 0.2.0 - 2016-11-03
### Added

### Changed
- Upgrade to react 15.3.2 (Paul Apostol)
- Upgrade to babel 6.5.2  (Paul Apostol)
- Upgrade to webpack 1.13.3 (Paul Apostol)
