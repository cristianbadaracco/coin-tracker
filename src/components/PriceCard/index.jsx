import { Card } from "@mui/material";

import "./index.css";

const PriceCard = ({ name, value }) => {
  return (
    <Card className="wrapper">
      <div className="name">{name}</div>
      <div className="price">{value}</div>
    </Card>
  );
};

export default PriceCard;
