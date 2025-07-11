import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Restaurant({ restaurant }) {
  const navigate = useNavigate();

  const handleReviewsClick = () => {
    navigate(`/eats/stores/${restaurant._id}/reviews`);
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <Link
          to={`/eats/stores/${restaurant._id}/menus`}
          className="btn btn-block"
        >
          <img
            src={restaurant.images[0].url}
            alt={restaurant.name}
            className="card-img-top mx-auto"
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="rest_address">{restaurant.address}</p>

          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(restaurant.ratings / 5) * 100}%` }}
              ></div>
            </div>

            {/* Show Reviews Button */}
            <button className="btn btn-primary mt-2" onClick={handleReviewsClick}>
              Show Reviews ({restaurant.numOfReviews || 20})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
