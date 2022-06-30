import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import "./Footer.css";




// TODO Which font? Also how to make this appear at the very bottom of pages?
const Footer = () => {
    return (
        <footer className="footer">
            <p className="icons">
                <FontAwesomeIcon icon={faFacebook} size="xl" color="#white"/> <FontAwesomeIcon icon={faTwitter} size="xl" color="#white"/> <FontAwesomeIcon icon={faInstagram} size="xl" color="#white"/>
            </p>
            <p className="text">© 2022 Amorr</p>
        </footer>
    );
};


export default Footer;