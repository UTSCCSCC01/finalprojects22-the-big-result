import "./HowItWorks.css";
import steps from './c4.png';

const HowItWorks = () => {
    return (
        <div id="how-it-works">
            <h1>How It Works</h1>
            <div className="hiw-container">
                <div className="hiw-inner-container">
                    <div className="img-container">
                        <img
                            className="profile-img"
                            src={steps}
                            alt=""
                        ></img>
                    </div>

                    <div className="description-container">
                        <div className="name-review-container">
                            <p className="p-steps">Filter by service/rating/location/price to find the professional who best suits you</p>
                            <p className="p-steps">Book the time that best works for you given the professional's availability</p>
                            <p className="p-steps">The professional will come to the address given during booking at the correct time.</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};


export default HowItWorks;