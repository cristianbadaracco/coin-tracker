import { Skeleton } from "@mui/material";

const CardSkeleton = () => (
  <Skeleton
    variant="rectangular"
    height={57}
    animations="pulsate"
    sx={{ bgcolor: "#222222", margin: "10px 5px" }}
  />
);

export const CriptoSkeleton = () =>
  [1, 2, 3].map((index) => <CardSkeleton key={index} />);

export const DolarSkeleton = () =>
  [1, 2, 3, 4, 5].map((index) => <CardSkeleton key={index} />);

export const BtcSkeleton = () => <CardSkeleton />;
