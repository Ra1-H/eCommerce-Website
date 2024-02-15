import React from 'react'

function Rating({ currentRating, setCurrentRating, numberOfReviews }: { currentRating: number, setCurrentRating: Function, numberOfReviews?: Number | undefined }) {
    const ratings = [1, 2, 3, 4, 5]




  return (

        <div className="flex items-center">
          {ratings.map((rating) => (
            <span
              key={rating}
              style={{
                cursor: "pointer",
                color: rating <= currentRating ? "gold" : "gray",
              }}
              onClick={setCurrentRating(rating)}
            >
              ★
            </span>))}
            {numberOfReviews && <p>{numberOfReviews.toString()}</p> }
         
        </div>


  )
}

export default Rating


