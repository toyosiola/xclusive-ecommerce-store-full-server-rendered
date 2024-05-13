import {
  StarEmptyIcon,
  StarFullyFilledIcon,
  StarHalfFilledIcon,
} from "@/assets/icons";

export default function RatingStars({ averageRating }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        if (averageRating >= index + 1) {
          return (
            <span key={index}>
              <StarFullyFilledIcon />
            </span>
          );
        }
        if (averageRating < index + 1 && averageRating >= index + 0.5) {
          return (
            <span key={index}>
              <StarHalfFilledIcon />
            </span>
          );
        }
        if (averageRating < index + 1) {
          return (
            <span key={index}>
              <StarEmptyIcon />
            </span>
          );
        }
      })}
    </div>
  );
}
