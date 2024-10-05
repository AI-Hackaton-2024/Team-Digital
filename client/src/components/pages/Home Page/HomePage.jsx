import './HomePage.css';

import Navbar from '../../main/Navbar/Navbar';
import Card from '../../ui/Card/Card';

import bot from "../../assets/team digital.jpeg";

const card_data = [
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
    {
        img: bot,
        name: "Web Software",
        description: "jksdbjshshshfshfhjshbfjbdsjbdfnskbjv"
    },
];

function HomePage() {
    return (
        <div id = "home-page">
            <div>
                <Navbar menu = "home"/>
            </div>

            <div id = "home-page-right">
                <label>Team Digital</label>
                <label>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit nihil consequatur maiores, tenetur doloremque reprehenderit omnis rem illo quia delectus quo exercitationem debitis corporis voluptate iure, minus ipsa dolor.
                </label>
                <div id = "home-page-best">Popular supports</div>
                <div id = "card-container">
                {
                    card_data.map((card_dat , index) => (
                        <Card key = {index} img = {card_dat.img} name = {card_dat.name} description = {card_dat.description}/>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
