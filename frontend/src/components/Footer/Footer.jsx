import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity } from "@fortawesome/free-solid-svg-icons";
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css";




// TODO Which font? Also how to make this appear at the very bottom of pages?
const Footer = () => {
    return (
        <footer className="footer">

            <p className="icons">
                <FontAwesomeIcon icon={faTreeCity} size="lg" color="#white" /> <FontAwesomeIcon icon={faAppleAlt} color="#white" /> <FontAwesomeIcon icon="fa-brands fa-twitter" color="#white"/>
            </p>
            <p className="text">© 2022 Amorr</p>
        </footer>
    );
};


export default Footer;