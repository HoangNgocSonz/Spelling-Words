import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';

export default class Cat extends Component{
  constructor(props){
    super(props);
    this.state={
      append:0
    }
    //khởi tạo âm thanh
    this.catAudio = new Audio(require("../audio/cat.mp3"));
    this.spellCat = new Audio(require("../audio/spellCat.mp3"));
    this.cSound = new Audio(require("../audio/c-sound.m4a"));
    this.dSound = new Audio(require("../audio/d-sound.m4a"));
    this.fSound = new Audio(require("../audio/f-sound.m4a"));
    this.catTrue = new Audio(require("../audio/catTrue.m4a"))
  }
  startGame(){
    this.props.startGameMain();
    document.getElementById("fadeCat").style.opacity=1;
    document.getElementById("start").style.display="none";
    setTimeout(function(){
      document.getElementById("c-move").style.display="block";
    }, 100);
    setTimeout(function(){
      document.getElementById("d-animation").style.display="block";
    }, 200);
    setTimeout(function(){
      document.getElementById("f-animation").style.display="block";
    }, 300);
    setTimeout(
      function() {
          this.spellCat.play();
      }
      .bind(this),
      400
    );

    this.props.mapMayMoi();
  }
  //animation cho cat 
  handleClick(){
    document.getElementById("cat").classList.toggle("cat-animation");
    setTimeout(function(){
      document.getElementById("cat").classList.toggle("cat-animation");
    },400);
    this.catAudio.play();
  }
  //các hàm phát âm

  cSoundPlay(){
    this.cSound.play();
  }
  dSoundPlay(){
    this.dSound.play();
  }
  fSoundPlay(){
    this.fSound.play();
  }

  //các hàm kéo thả
  drag =(e)=> {
    e.dataTransfer.setData("text", e.target.id);
    var data = e.dataTransfer.getData("text");
    if(data=="c-move"){
      this.cSound.play();
    }else
    if(data=="d-animation"){
      this.dSound.play();
    }else
    if(data=="f-animation"){
      this.fSound.play();
    }
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
    if(data=="c-move"){
      this.catTrue.play();
      this.props.mapMayMoi();
      e.target.appendChild(document.getElementById(data));
      this.props.upScene();
      this.setState({
        append:1
      })
      setTimeout(() => {
        this.props.showNextScene()
      }, 5000);
    }else{
      // am thanh phat khi chon sai dap an
      this.props.soundWhenSelectWrong();
      // đổi hình ảnh khi chọn sai đáp án
      this.props.changeHaily();
    }
  }

  render(){
    return (
      <div >
        <div className="fadeCat" id="fadeCat">
          <Row>
            <Col xs lg="8">
              <div className="cat-wrapper">
              <img src={require("../image/cat.png")} className="cat" id="cat" onClick={() => this.handleClick()}></img>
              </div>
            </Col>
            <Col>
              {this.state.append>=1 ?<img src={require("../image/car.png")} className="car"></img>:""}
              
            </Col>
          </Row>

          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            </div>
            <img src={require("../image/a.png")} className="a-word"></img>
            <img src={require("../image/t.png")} className="t-word"></img>
          </div>
          <div className="carpet">
            <Row >
              <Col>
                <img src={require("../image/c.png")} className="c-move" id="c-move" onClick={()=> this.cSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require("../image/d.png")} className="d-animation" id="d-animation" onClick={() => this.dSoundPlay()} onDragStart={this.drag}></img>
              </Col>
              <Col>
                <img src={require("../image/f.png")} className="f-animation" id="f-animation" onClick={() =>this.fSoundPlay()} onDragStart={this.drag}></img>
              </Col>
            </Row>
          </div>
        </div>
        <img className="start" id="start" src={require("../image/start.png")} onClick={()=> this.startGame()}></img>
      </div>
    );
  }
}
