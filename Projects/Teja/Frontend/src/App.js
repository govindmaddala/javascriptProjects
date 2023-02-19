import React from 'react'
// CSS and JS
import './AppStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <div>
      <NavigationBar/>
    </div>
  );
}

export default App;
