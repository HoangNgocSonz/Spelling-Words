import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class Fox extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.foxSound = new Audio(require("../audio/foxSound.m4a"));
    this.spellBug = new Audio(require("../audio/spellBug.m4a"));
    this.qSound = new Audio(require("../audio/qSound.m4a"));
    this.gSound = new Audio(require("../audio/gSound.m4a"));
    this.fSound = new Audio(require("../audio/fSound.m4a"));
    this.trueFox = new Audio(require("../audio/trueFox.m4a"))
    setTimeout(function(){
      document.getElementById("f-fox").style.display="block";
    }, 100);
  }
  //animation cho cat 
  handleClick(){
    document.getElementById("fox").classList.toggle("fox-animation");
    setTimeout(function(){
      document.getElementById("fox").classList.toggle("fox-animation");
    },400);
    this.foxSound.play();
  }
  //các hàm phát âm

  gSoundPlay(){
    this.gSound.play();
  }
  qSoundPlay(){
    this.qSound.play();
  }
  fSoundPlay(){
    this.fSound.play();
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
    if(data=="f-fox"){
        this.trueFox.play();
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
            <img src={require("../image/fox.png")} className="bug" id="fox" onClick={() => this.handleClick()}></img>
          </div>
          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            </div>
            <img src={require("../image/o.png")} className="u-word-bug"></img>
            <img src={require("../image/x.png")} className="g-word-bug"></img>
          </div>
          <div className="carpet">
            <Row >
              <Col>
                <img src={require("../image/q.png")} className="s-dog" id="s-dog" onClick={() => this.qSoundPlay()} onDragStart={this.drag}></img>
              </Col>
              <Col>
                <img src={require("../image/g.png")} className="d-dog" id="d-dog" onClick={()=> this.gSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require("../image/f.png")} className="f-fox" id="f-fox" onClick={() =>this.fSoundPlay()} onDragStart={this.drag}></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    );
  }
}