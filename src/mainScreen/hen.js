import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class Fox extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.henSound = new Audio(require("../audio/henSound.m4a"));
    this.spellBug = new Audio(require("../audio/spellBug.m4a"));
    this.hSound = new Audio(require("../audio/hSound.m4a"));
    this.gSound = new Audio(require("../audio/gSound.m4a"));
    this.zSound = new Audio(require("../audio/z-sound.m4a"));
    this.trueHen = new Audio(require("../audio/trueHen.m4a"));
    this.yayySound = new Audio(require("../audio/yayySound.m4a"))
    setTimeout(function(){
      document.getElementById("h-hen").style.display="block";
    }, 100);
  }
  //animation cho cat 
  handleClick(){
    document.getElementById("hen").classList.toggle("hen-animation");
    setTimeout(function(){
      document.getElementById("hen").classList.toggle("hen-animation");
    },400);
    this.henSound.play();
  }
  //các hàm phát âm

  hSoundPlay(){
    this.hSound.play();
  }
  gSoundPlay(){
    this.gSound.play();
  }
  zSoundPlay(){
    this.zSound.play();
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
    if(data=="h-hen"){
        this.trueHen.play();
        this.yayySound.play();
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
            <img src={require("../image/hen.png")} className="bug" id="hen" onClick={() => this.handleClick()}></img>
          </div>
          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            </div>
            <img src={require("../image/e.png")} className="u-word-bug"></img>
            <img src={require("../image/n.png")} className="g-word-bug"></img>
          </div>
          <div className="carpet">
            <Row >
              <Col>
                <img src={require("../image/z.png")} className="s-dog" id="s-dog" onClick={() => this.zSoundPlay()} onDragStart={this.drag}></img>
              </Col>
              <Col>
                <img src={require("../image/g.png")} className="d-dog" id="d-dog" onClick={()=> this.gSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require("../image/h.png")} className="h-hen" id="h-hen" onClick={() =>this.hSoundPlay()} onDragStart={this.drag}></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    );
  }
}