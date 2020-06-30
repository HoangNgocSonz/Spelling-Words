import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class Dog extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.dogSound = new Audio(require("../audio/dogSound.m4a"));
    this.spellBug = new Audio(require("../audio/spellBug.m4a"));
    this.hSound = new Audio(require("../audio/hSound.m4a"));
    this.dSound = new Audio(require("../audio/d-sound.m4a"));
    this.sSound = new Audio(require("../audio/sSound.m4a"));
    this.trueDog = new Audio(require("../audio/trueDog.m4a"))
    setTimeout(function(){
      document.getElementById("d-dog").style.display="block";
    }, 100);
  }
  //animation cho dog 
  handleClick(){
    document.getElementById("dog").classList.toggle("dog-animation");
    setTimeout(function(){
      document.getElementById("dog").classList.toggle("dog-animation");
    },400);
    this.dogSound.play();
  }
  //các hàm phát âm

  sSoundPlay(){
    this.sSound.play();
  }
  dSoundPlay(){
    this.dSound.play();
  }
  hSoundPlay(){
    this.hSound.play();
  }

  //các hàm kéo thả
  drag =(e)=> {
    e.dataTransfer.setData("text", e.target.id);
    var data = e.dataTransfer.getData("text");
    if(data=="d-dog"){
      this.dSound.play();
    }else
    if(data=="s-dog"){
      this.sSound.play();
    }else
    if(data=="h-dog"){
      this.hSound.play();
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
    if(data=="d-dog"){
      this.trueDog.play();
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
        <div >
          <div className="cat-wrapper">
            <img src={require("../image/dog.png")} className="bug" id="dog" onClick={() => this.handleClick()}></img>
          </div>
          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            </div>
            <img src={require("../image/o.png")} className="u-word-bug"></img>
            <img src={require("../image/g.png")} className="g-word-bug"></img>
          </div>
          <div className="carpet">
            <Row >
              <Col>
                <img src={require("../image/s.png")} className="s-dog" id="s-dog" onClick={() => this.sSoundPlay()} onDragStart={this.drag}></img>
              </Col>
              <Col>
                <img src={require("../image/d.png")} className="d-dog" id="d-dog" onClick={()=> this.dSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require("../image/h.png")} className="h-dog" id="h-dog" onClick={() =>this.hSoundPlay()} onDragStart={this.drag}></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    );
  }
}
