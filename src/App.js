import React, {Component} from 'react';
import './App.css';    
import {Container,Row,Col} from 'react-bootstrap';
import Cat from "./mainScreen/cat.js";
import Bug from "./mainScreen/bug.js";
import Dog from "./mainScreen/dog.js";
import Fox from "./mainScreen/fox.js";
import Hen from "./mainScreen/hen.js";
var wrongSound = 0;
export default class App extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.state = {
      scene:1,
      play: true
    }
    this.audio = new Audio(require("./audio/nhacNen.m4a"));
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    this.togglePlay = this.togglePlay.bind(this);


    this.startScene = new Audio(require("./audio/startScene.mp3"));
    this.opss = new Audio(require("./audio/opss.m4a"));
    this.try_again = new Audio(require("./audio/try_again.m4a"));
    this.hmm = new Audio(require("./audio/hmm.m4a"));
    this.spellCat = new Audio(require("./audio/spellCat.mp3"));
    this.bugSound = new Audio(require("./audio/bugSound.m4a"));
    this.spellBug = new Audio(require("./audio/spellBug.m4a"));
    this.spellDog = new Audio(require("./audio/spellDog.m4a"));
    this.spellFox = new Audio(require("./audio/spellFox.m4a"));
    this.spellHen = new Audio(require("./audio/spellHen.m4a"));
    this.nhacNen = new Audio(require("./audio/nhacNen.m4a"))
  }
  togglePlay() {
    this.setState({
        play: !this.state.play
    });
    this.state.play ? this.audio.play() : this.audio.pause();
    this.audio.loop = true;
}
  upScene(){
    this.setState({
      scene:this.state.scene+=1
    });
    console.log("scene: "+ this.state.scene)
  }
  upScene2(){
    this.setState({
      scene:this.state.scene+=1
    });
    console.log("scene2: "+ this.state.scene)
  }
  startGame(){
    this.togglePlay();
    // this.nhacNen.play();
    console.log("AppScene:"+ this.state.scene);
    this.startScene.play();
    document.getElementById("background").classList.toggle("background2");
    document.getElementById("background2").style.backgroundImage="none";
    document.getElementById("fade").style.opacity=1;
    if(this.state.scene==2){
      this.spellBug.play();
      this.mapMayMoi();
    }
    if(this.state.scene==3){
      this.spellDog.play();
      this.mapMayMoi();
    }
    if(this.state.scene==4){
      this.spellFox.play();
      this.mapMayMoi();
    }
    if(this.state.scene==5){
      this.spellHen.play();
      this.mapMayMoi();
    }

  }
  soundWhenSelectWrong(){
    if(wrongSound==0){
      this.opss.play();
      wrongSound=1;
    }else if(wrongSound==1){
      this.hmm.play();
      wrongSound=2;
    }
    else{
      this.try_again.play();
      wrongSound=0;
    }
  }
  mapMayMoi(){
    setTimeout(function(){
      //làm hiệu ứng mấp máy môi
      for (let i = 1; i <= 20; i++) {
        setTimeout(function(){
          document.getElementById("haiLy").style.display="block";
          document.getElementById("haiLy2").style.display="none";
          if(i<=13){
            setTimeout(function(){
              document.getElementById("haiLy").style.display="none";
              document.getElementById("haiLy2").style.display="block";
              }, 170*i);
          }
        }, 170*i);
      }
    }.bind(this),
    400 );
  }
  spell(){
    if(this.state.scene==1){
      this.spellCat.play();
    }
    if(this.state.scene==2){
      this.spellBug.play();
    }
    if(this.state.scene==3){
      this.spellDog.play();
    }
    if(this.state.scene==4){
      this.spellFox.play();
    }
    if(this.state.scene==5){
      this.spellHen.play();
    }

    var haiLy = document.querySelector('#haiLy');
    var haiLy2 = document.querySelector('#haiLy2');
    for (let i = 1; i <= 23; i++) {
      setTimeout(function(){
        haiLy.style.display="block";
        haiLy2.style.display="none";
        if(i<=13){
          setTimeout(function(){
            haiLy.style.display="none";
            haiLy2.style.display="block";
            }, 170*i);
        }
      }, 170*i);
    }
  }

  //doi hinh anh khi chon sai dap an
  changeHaily(){
    var haiLy = document.querySelector('#haiLy');
      var haiLy2 = document.querySelector('#haiLy2');
      var haiLy3 = document.querySelector('#haiLy3');
      var haiLy4 = document.querySelector('#haiLy4');
      var randomx = Math.floor(Math.random() * 6);
      haiLy.style.display="none";
      haiLy2.style.display="none";
      haiLy3.style.display="none";
      haiLy4.style.display="none";
      if(randomx<=2){
        haiLy3.style.display="block";
        setTimeout(function(){
          haiLy3.style.display="none";
          haiLy2.style.display="block";
        }, 1500);
      }else{
        haiLy4.style.display="block";
        setTimeout(function(){
          haiLy4.style.display="none";
          haiLy2.style.display="block";
        }, 1500);
      }
  }
  noAllowDrop=(e)=>{
    e.stopPropagation();
  }
  allowDrop =(e)=>{
    e.preventDefault();
  }
  showNextScene(){
    if(this.state.scene==2){
      wrongSound=0;
      document.getElementById("catApp").style.display="none";
      document.getElementById("bugApp").style.display="block";
      this.startGame();
    }
    if(this.state.scene==3){
      wrongSound=0;
      document.getElementById("bugApp").style.display="none";
      document.getElementById("dogApp").style.display="block";
      this.startGame();
    }
    if(this.state.scene==4){
      wrongSound=0;
      document.getElementById("dogApp").style.display="none";
      document.getElementById("foxApp").style.display="block";
      this.startGame();
    }
    if(this.state.scene==5){
      wrongSound=0;
      document.getElementById("foxApp").style.display="none";
      document.getElementById("henApp").style.display="block";
      this.startGame();
    }
    if(this.state.scene>=6){
      window.location.reload(false);
    }
  }
  render(){
    return (
      <div>
        <div className="background" id="background" style={{ backgroundImage: `url(${require("./image/rsz_background.png")})` }} >
          <div className="background2" id="background2" style={{ backgroundImage: `url(${require("./image/whiteBk.png")})` }}>
            <div className="fade" id="fade">
              <img src={require('./image/spell3.png')} className="haiLy" id="haiLy" onClick={()=>this.spell()}/>
              <img src={require('./image/spell.png')} className="haiLy2" id="haiLy2" onClick={()=>this.spell()}/>
              <img src={require('./image/spell4.png')} className="haiLy3" id="haiLy3" onClick={()=>this.spell()}/>
              <img src={require('./image/spell5.png')} className="haiLy4" id="haiLy4" onClick={()=>this.spell()}/>
            </div>
            <div id="catApp">
              <Cat startGameMain={()=>this.startGame()}
                soundWhenSelectWrong={()=>this.soundWhenSelectWrong()} 
                mapMayMoi={()=>this.mapMayMoi()}
                spellCatMain={()=>this.spellCatPlay()}
                changeHaily={()=>this.changeHaily()}
                upScene={()=>this.upScene()}
                showNextScene={()=>this.showNextScene()}
                />
            </div>
            <div id="bugApp">
              <Bug startGameMain={()=>this.startGame()}
                soundWhenSelectWrong={()=>this.soundWhenSelectWrong()} 
                mapMayMoi={()=>this.mapMayMoi()}
                spellCatMain={()=>this.spellCatPlay()}
                changeHaily={()=>this.changeHaily()}
                upScene={()=>this.upScene()}
                showNextScene={()=>this.showNextScene()}
                />
            </div>
            <div id="dogApp">
              <Dog startGameMain={()=>this.startGame()}
                soundWhenSelectWrong={()=>this.soundWhenSelectWrong()} 
                mapMayMoi={()=>this.mapMayMoi()}
                spellCatMain={()=>this.spellCatPlay()}
                changeHaily={()=>this.changeHaily()}
                upScene={()=>this.upScene()}
                showNextScene={()=>this.showNextScene()}
                />
            </div>
            <div id="foxApp">
              <Fox startGameMain={()=>this.startGame()}
                soundWhenSelectWrong={()=>this.soundWhenSelectWrong()} 
                mapMayMoi={()=>this.mapMayMoi()}
                spellCatMain={()=>this.spellCatPlay()}
                changeHaily={()=>this.changeHaily()}
                upScene={()=>this.upScene()}
                showNextScene={()=>this.showNextScene()}
                />
            </div>
            <div id="henApp">
              <Hen startGameMain={()=>this.startGame()}
                soundWhenSelectWrong={()=>this.soundWhenSelectWrong()} 
                mapMayMoi={()=>this.mapMayMoi()}
                spellCatMain={()=>this.spellCatPlay()}
                changeHaily={()=>this.changeHaily()}
                upScene={()=>this.upScene()}
                showNextScene={()=>this.showNextScene()}
                />
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}


