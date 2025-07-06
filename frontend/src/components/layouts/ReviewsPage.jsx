import React from "react";

// Sample review data common to all restaurants
const sampleReviews = Array.from({ length: 20 }, (_, i) => ({
  user: `User${i + 1}`,
  comment: `This is review ${i + 1} about the food. Excellent quality and service!`,
  rating: Math.floor(Math.random() * 5) + 1 // Random rating between 1 and 5
}));

export default function ReviewsPage() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <div className="row">
        {sampleReviews.map((review, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{review.user}</h5>
                <p className="card-text">{review.comment}</p>
                <div className="d-flex align-items-center">
                  <span className="text-warning me-2">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span>{review.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
