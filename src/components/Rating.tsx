import { Rating as MuiRating, Box, Typography } from "@mui/material";

interface RatingProps {
  rating: number;        // el valor de la calificación
  numReviews: number;    // cantidad de reseñas
  caption?: string;      // texto opcional
}

function Rating({ rating, numReviews, caption }: RatingProps) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <MuiRating 
        name="read-only"
        value={rating}
        precision={0.5}
        readOnly
      />
      {caption ? (
        <Typography variant="body2">{caption}</Typography>
      ) : (
        <Typography variant="body2">{numReviews} reviews</Typography>
      )}
    </Box>
  );
}

export default Rating;
