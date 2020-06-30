import React, {Component} from 'react';
import Index from '.src/index.js';   
export default class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
     <div>
         <Index></Index>
     </div>
    );
  }
}