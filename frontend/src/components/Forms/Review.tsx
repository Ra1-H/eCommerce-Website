import React, { useState } from "react";
import axios from "axios";
import { useCommerceStore } from "../../store";

function Review({
  productId,
  onReviewSubmit,
}: {
  productId: any;
  onReviewSubmit: any;
}) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  const { token } = useCommerceStore();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleStarClick = (selectedRating: any) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    // Submit the review to the server
    axios
      .post(
        "http://localhost:5000/api/v1/reviews/create",
        {
          productId,
          comment,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Handle successful submission
        onReviewSubmit(response.data);
        setComment("")
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting review:", error);
      });
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md max-w-md w-full">
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              X
            </button>
          </div>

          <p className="text-xl font-bold mb-4">Leave a Review</p>
          <div>
            <p>Select your rating:</p>
            <div className="mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Leave your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-4"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Review;
