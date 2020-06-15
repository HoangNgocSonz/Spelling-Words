import React, {Component} from 'react';
import './App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class App extends Component{
  constructor(props){
    super(props);
    this.catAudio = new Audio(require("./audio/cat.mp3"));
    this.spellCat = new Audio(require("./audio/spellCat.mp3"));
    this.startScene = new Audio(require("./audio/startScene.mp3"));
    this.cSound = new Audio(require("./audio/c-sound.m4a"));
    this.dSound = new Audio(require("./audio/d-sound.m4a"));
    this.fSound = new Audio(require("./audio/f-sound.m4a"));
  }

  startGame(){
    this.startScene.play();
    document.getElementById("start").classList.add("start2");
    document.getElementById("background").classList.toggle("background2");
    
    setTimeout(function(){
      document.getElementById("c-move").classList.toggle("c-move2");
    }, 100);
    setTimeout(function(){
      document.getElementById("d-animation").classList.toggle("d-animation2");
    }, 200);
    setTimeout(function(){
      document.getElementById("f-animation").classList.toggle("f-animation2");
    }, 300);
    setTimeout(function(){
      this.spellCat.play();
    }.bind(this),
    400 );
  }

  handleClick(){
    document.getElementById("cat").classList.toggle("cat-animation");
    setTimeout(function(){
      document.getElementById("cat").classList.toggle("cat-animation");
    },400);
    this.catAudio.play();
  }
// các hàm phát âm 
  cSoundPlay(){
    this.cSound.play();
  }
  dSoundPlay(){
    this.dSound.play();
  }
  fSoundPlay(){
    this.fSound.play();
  }

  drag =(e)=> {
    e.dataTransfer.setData("text", e.target.id);
  }
  noAllowDrop=(e)=>{
    e.stopPropagation();
  }
  allowDrop =(e)=>{
    e.preventDefault();
  }
  drop =(e)=> {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
  }

  render(){
    return (
      <div>
        <div className="background" id="background" style={{ backgroundImage: `url(${require("./image/rsz_background.png")})` }} >
          <img src={require('./image/spell3.png')} className="haiLy" />
          <div className="cat-wrapper">
            <img src={require("./image/cat.png")} className="cat" id="cat" onClick={() => this.handleClick()}></img>
          </div>
          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            
            </div>
            <img src={require("./image/a.png")} className="a-word"></img>
            <img src={require("./image/t.png")} className="t-word"></img>
          </div>
          <div className="carpet">
            <Row>
              <Col>
                <img src={require("./image/c.png")} className="c-move" id="c-move" onClick={()=> this.cSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require("./image/d.png")} className="d-animation" id="d-animation" onClick={() => this.dSoundPlay()}></img>
              </Col>
              <Col>
                <img src={require("./image/f.png")} className="f-animation" id="f-animation" onClick={() =>this.fSoundPlay()}></img>
              </Col>
            </Row>
          </div>
        </div>
        <img className="start" id="start" src={require("./image/start.png")} onClick={()=> this.startGame()}></img>
      </div>
      
    );
  }
}


