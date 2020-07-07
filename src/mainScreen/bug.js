import React, {Component} from 'react';
import '../App.css';    
import {Container,Row,Col} from 'react-bootstrap';
export default class Bug extends Component{
  constructor(props){
    super(props);
    //khởi tạo âm thanh
    this.bugSound = new Audio(require(`../${this.props.data}/audio/scene2/animal.m4a`));
    this.spellBug = new Audio(require(`../${this.props.data}/audio/scene2/spellAnimal.m4a`));
    this.fSound = new Audio(require(`../${this.props.data}/audio/scene2/selection1.m4a`));
    this.bSound = new Audio(require(`../${this.props.data}/audio/scene2/selection2.m4a`));
    this.wSound = new Audio(require(`../${this.props.data}/audio/scene2/selection3.m4a`));
    this.trueBug = new Audio(require(`../${this.props.data}/audio/scene2/animalTrue.m4a`))
    setTimeout(function(){
      document.getElementById("b-bug").style.display="block";
    }, 100);
  }
  //animation cho cat 
  handleClick(){
    document.getElementById("bug").classList.toggle("bug-animation");
    setTimeout(function(){
      document.getElementById("bug").classList.toggle("bug-animation");
    },400);
    this.bugSound.play();
  }
  //các hàm phát âm
  cSoundPlay(){
    this.bSound.play();
  }
  dSoundPlay(){
    this.wSound.play();
  }
  fSoundPlay(){
    this.fSound.play();
  }
  //các hàm kéo thả
  drag =(e)=> {
    e.dataTransfer.setData("text", e.target.id);
    var data = e.dataTransfer.getData("text");
    if(data=="b-bug"){
      this.bSound.play();
    }else
    if(data=="w-bug"){
      this.wSound.play();
    }else
    if(data=="f-bug"){
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
    if(data=="b-bug"){
      this.trueBug.play();
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
            <img src={require(`../${this.props.data}/image/scene2/animal.png`)} className="bug" id="bug" onClick={() => this.handleClick()}></img>
          </div>
          <div className="cabinet">
            <div className="target" id="target" onDrop={this.drop} onDragOver={this.allowDrop}>
            </div>
            <img src={require(`../${this.props.data}/image/scene2/suggest1.png`)} className="u-word-bug"></img>
            <img src={require(`../${this.props.data}/image/scene2/suggest2.png`)} className="g-word-bug"></img>
          </div>
          <div className="carpet">
            <Row >
              <Col>
                <img src={require(`../${this.props.data}/image/scene2/selection2.png`)} className="w-bug" id="w-bug" onClick={() => this.dSoundPlay()} onDragStart={this.drag}></img>
              </Col>
              <Col>
                <img src={require(`../${this.props.data}/image/scene2/selection1.png`)} className="b-bug" id="b-bug" onClick={()=> this.cSoundPlay()} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop}></img>
              </Col>
              <Col>
                <img src={require(`../${this.props.data}/image/scene2/selection3.png`)} className="f-bug" id="f-bug" onClick={() =>this.fSoundPlay()} onDragStart={this.drag}></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      
    );
  }
}
