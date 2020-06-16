import React, {Component} from 'react';
import './App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class App extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.catAudio = new Audio(require("./audio/cat.mp3"));
    this.spellCat = new Audio(require("./audio/spellCat.mp3"));
    this.startScene = new Audio(require("./audio/startScene.mp3"));
    this.cSound = new Audio(require("./audio/c-sound.m4a"));
    this.dSound = new Audio(require("./audio/d-sound.m4a"));
    this.fSound = new Audio(require("./audio/f-sound.m4a"));
    this.opss = new Audio(require("./audio/opss.m4a"));
    this.try_again = new Audio(require("./audio/try_again.m4a"));
    this.hmm = new Audio(require("./audio/hmm.m4a"));
  }

  // các hàm thực hiện khi ấn start game 
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
      //làm hiệu ứng mấp máy môi
      var haiLy = document.querySelector('#haiLy');
      var haiLy2 = document.querySelector('#haiLy2');
      for (let i = 1; i <= 23; i++) {
        setTimeout(function(){
          haiLy.style.display="block";
          haiLy2.style.display="none";
          setTimeout(function(){
          haiLy.style.display="none";
          haiLy2.style.display="block";
          }, 170*i);
        }, 170*i);
      }
    }.bind(this),
    400 );
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
  spellCatPlay(){
    this.spellCat.play();
    var haiLy = document.querySelector('#haiLy');
    var haiLy2 = document.querySelector('#haiLy2');
    for (let i = 1; i <= 23; i++) {
      setTimeout(function(){
        haiLy.style.display="block";
        haiLy2.style.display="none";
        setTimeout(function(){
        haiLy.style.display="none";
        haiLy2.style.display="block";
        }, 170*i);
      }, 170*i);
    }
  }

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
    if(data=="c-move"){
      e.target.appendChild(document.getElementById(data));
    }else{
      // am thanh phat khi chon sai dap an
      var random = Math.floor(Math.random() * 3);
      if(random == 0){
        this.opss.play();
      }else if(random == 1){
        this.hmm.play();
      }else{
        this.try_again.play();
      }
      // đổi hình ảnh khi chọn sai đáp án
      var haiLy = document.querySelector('#haiLy');
      var haiLy2 = document.querySelector('#haiLy2');
      var haiLy3 = document.querySelector('#haiLy3');
      var haiLy4 = document.querySelector('#haiLy4');
      var randomx = Math.floor(Math.random() * 2);
      haiLy.style.display="none";
      haiLy2.style.display="none";
      haiLy3.style.display="none";
      haiLy4.style.display="none";
      if(randomx==0){
        haiLy3.style.display="block";
        setTimeout(function(){
          haiLy2.style.display="block";
          haiLy3.style.display="none";
        }, 1500);
      }else{
        haiLy4.style.display="block";
        setTimeout(function(){
          haiLy2.style.display="block";
          haiLy4.style.display="none";
        }, 1500);
      }
    }
  }

  render(){
    return (
      <div>
        <div className="background" id="background" style={{ backgroundImage: `url(${require("./image/rsz_background.png")})` }} >
          <img src={require('./image/spell3.png')} className="haiLy" id="haiLy" onClick={()=>this.spellCatPlay()}/>
          <img src={require('./image/spell.png')} className="haiLy2" id="haiLy2" onClick={()=>this.spellCatPlay()}/>
          <img src={require('./image/spell4.png')} className="haiLy3" id="haiLy3" onClick={()=>this.spellCatPlay()}/>
          <img src={require('./image/spell5.png')} className="haiLy4" id="haiLy4" onClick={()=>this.spellCatPlay()}/>
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
            <Row >
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


