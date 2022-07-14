// import Review from "./components/Review/Review";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
// import { getReviews } from "../APICalls"
import axios from "axios";

function AllReviews(){
    const { id } = useParams();
    const [arrAllReviews, setArrAllReviews] = useState([]);

    useEffect(() => {
        // getReviews({id})
        axios({ // TODO Use API Call getReviews?
            method: "GET",
            url: `http://127.0.0.1:5000/getAllReviews?id=${id}`
          })
        .then((res) => {
            // setArrAllReviews(res.data.reviews);
            console.log(id);
            console.log(res.data.reviews);
            console.log(arrAllReviews);
          })
      }, []);

      return (
        <div>
            <p>${arrAllReviews}</p>
        </div>
      );

    

}

export default AllReviews;