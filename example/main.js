var React = require('react');
var ReactDOM = require('react-dom');
var ExamplePage  = require('./ExamplePage');

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

ReactDOM.render(<ExamplePage />, document.getElementById("app"));
