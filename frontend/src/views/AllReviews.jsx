import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review/Review";
import "./AllReviews.css";

function AllReviews() {
    const { id } = useParams();
    const [arrAllReviews, setArrAllReviews] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:5000/getAllReviews?id=${id}`
        })
            .then((res) => {
                setArrAllReviews(res.data.reviews);
                setName(res.data.name);
            })
    }, []);

    const allReviews = () => {
        if(arrAllReviews.length === 0){
            return <p>No reviews for {name}</p>
        }
        else{
           return arrAllReviews.map((review) => (
                <Review
                    imageLink={review.imageLink}
                    rating={review.rating}
                    reviewDescription={review.reviewDescription}
                    reviewedBy={review.reviewedBy}
                    service={review.service}
                />
            ))
        }
    }

    return (
        <div id="reviews" className="page">
            <h1>{name}'s Reviews</h1>
            <div className="reviews-container">{allReviews()}</div>
        </div>
    );
}

export default AllReviews;