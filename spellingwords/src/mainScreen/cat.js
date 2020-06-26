import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';
var wrongSound = 0;
export default class Cat extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.catAudio = new Audio(require("../audio/cat.mp3"));
    this.spellCat = new Audio(require("../audio/spellCat.mp3"));
    this.cSound = new Audio(require("../audio/c-sound.m4a"));
    this.dSound = new Audio(require("../audio/d-sound.m4a"));
    this.fSound = new Audio(require("../audio/f-sound.m4a"));
  }
  startGame(){
    this.props.startGameMain();
    document.getElementById("start").classList.add("start2");

    setTimeout(function(){
      document.getElementById("c-move").classList.toggle("c-move2");
      console.log(document.getElementById("c-move"))
    }, 100);
    setTimeout(function(){
      document.getElementById("d-animation").classList.toggle("d-animation2");
    }, 200);
    setTimeout(function(){
      document.getElementById("f-animation").classList.toggle("f-animation2");
    }, 300);
    this.spellCat.play();
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
// các hàm phát âm 
  // spellCatPlay(){
  //   this.spellCat.play();
  //   this.props.spellCatMain();
  //   console.log("vvv")

  //   var haiLy = document.querySelector('#haiLy');
  //   var haiLy2 = document.querySelector('#haiLy2');
  //   for (let i = 1; i <= 23; i++) {
  //     setTimeout(function(){
  //       haiLy.style.display="block";
  //       haiLy2.style.display="none";
  //       if(i<=13){
  //         setTimeout(function(){
  //           haiLy.style.display="none";
  //           haiLy2.style.display="block";
  //           }, 170*i);
  //       }
  //     }, 170*i);
  //   }
  // }

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
      e.target.appendChild(document.getElementById(data));
    }else{
      // am thanh phat khi chon sai dap an
      // if(wrongSound==0){
      //   this.opss.play();
      //   wrongSound=1;
      // }else if(wrongSound==1){
      //   this.hmm.play();
      //   wrongSound=2;
      // }
      // else{
      //   this.try_again.play();
      //   wrongSound=0;
      // }
      this.props.soundWhenSelectWrong();
      // đổi hình ảnh khi chọn sai đáp án
      this.props.changeHaily();
      // var haiLy = document.querySelector('#haiLy');
      // var haiLy2 = document.querySelector('#haiLy2');
      // var haiLy3 = document.querySelector('#haiLy3');
      // var haiLy4 = document.querySelector('#haiLy4');
      // var randomx = Math.floor(Math.random() * 6);
      // haiLy.style.display="none";
      // haiLy2.style.display="none";
      // haiLy3.style.display="none";
      // haiLy4.style.display="none";
      // if(randomx<=2){
      //   haiLy3.style.display="block";
      //   setTimeout(function(){
      //     haiLy3.style.display="none";
      //     haiLy2.style.display="block";
      //   }, 1500);
      // }else{
      //   haiLy4.style.display="block";
      //   setTimeout(function(){
      //     haiLy4.style.display="none";
      //     haiLy2.style.display="block";
      //   }, 1500);
      // }
    }
  }

  render(){
    return (
      <div >
        {/* <div className="background" id="background" style={{ backgroundImage: `url(${require("../image/rsz_background.png")})` }} >
          <img src={require('../image/spell3.png')} className="haiLy" id="haiLy" onClick={()=>this.spellCatPlay()}/>
          <img src={require('../image/spell.png')} className="haiLy2" id="haiLy2" onClick={()=>this.spellCatPlay()}/>
          <img src={require('../image/spell4.png')} className="haiLy3" id="haiLy3" onClick={()=>this.spellCatPlay()}/>
          <img src={require('../image/spell5.png')} className="haiLy4" id="haiLy4" onClick={()=>this.spellCatPlay()}/> */}
          <div className="cat-wrapper">
            <img src={require("../image/cat.png")} className="cat" id="cat" onClick={() => this.handleClick()}></img>
          </div>
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
        {/* </div> */}
        <img className="start" id="start" src={require("../image/start.png")} onClick={()=> this.startGame()}></img>
      </div>
      
    );
  }
}
