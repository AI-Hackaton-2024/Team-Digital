import './LandingPage.css';

import { useNavigate } from 'react-router-dom';

import react_img from "../../assets/react.jpeg";
import express_img from "../../assets/express.png";
import node_img from "../../assets/node.png";
import chatgpt_img from "../../assets/chatgpt.png";

import fory from "../../assets/4i.jpg";
import alex from "../../assets/alex4o.jpg";
import koci from "../../assets/koci.jpg";
import monk from "../../assets/monk.jpg";



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
];

const team = [
  {
    img: alex
  },
  {
    img: koci
  },
  {
    img: monk
  },
  {
    img: fory
  }
]


function LandingPage() {
  const navigate = useNavigate();
  return (
    <div id = "landing-page">
      <div className='landing-top'>
        <span />
        <label className='team-digital'>Team Digital</label>
        <button>Login</button>
      </div>
      
      <div className='landing-description'>
        <label>Traditional focus groups are costly and slow. Get ahead with our AI persona-building app.</label>
        <label>Generate detailed customer avatars that reflect real behaviors and opinions using actual or simulated data.</label>
        <div>
          <label>✅ Get rapid feedback to stay ahead.</label>
          <label>✅ Save money by eliminating unnecessary expenses.</label>
          <label>✅ Access diverse customer segments instantly.</label>
          <label>✅ Make confident, data-driven decisions.</label>
        </div>
        <label>Don't Get Left Behind!</label>
        <label>Embrace AI-driven personas for faster insights and smarter strategies. Try it now and transform your product testing process.</label>
        <button onClick={() => {navigate("/register")}}>register</button>
      </div>
      
      <div className='landing-footer'>
        <div className='landing-technologies'>
        {
          technologies.map((technology , index) => (
            <img key = {index} src = {technology.img}></img>
          ))
        }
        </div>

        <div className='landing-creators'>
        {
          team.map((member , index) => (
            <img key = {index} src = {member.img}></img>
          ))
        }
        </div>
      </div>
    </div>
  );
}


export default LandingPage;
