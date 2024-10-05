import './LandingPage.css';

import react_img from "../../assets/react.jpeg";
import express_img from "../../assets/express.png";
import node_img from "../../assets/node.png";
import chatgpt_img from "../../assets/chatgpt.png";



const technologies = [
  {
    img: react_img
  },
  {
    img: express_img
  },
  {
    img: node_img
  },
  {
    img: chatgpt_img
  }
]

function LandingPage() {
  return (
    <div id = "landing-page">
      <div className='landing-top'>
        <span />
        <label className='team-digital'>Team Digital</label>
        <button>Login</button>
      </div>
      
      <div className='landing-description'>

      </div>
      
      <div className='landing-technologies'>
        {
          technologies.map((technology , index) => (
            <img key = {index} src = {technology.img}></img>
          ))
        }
      </div>
      <div>

      </div>
    </div>
  );
}


export default LandingPage;
