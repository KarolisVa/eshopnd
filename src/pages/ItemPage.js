import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

function ItemPage() {
  const items = useSelector((state) => state.items);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  return (
    <div>
      {items === undefined
        ? "wait it be loading"
        : items.map((item, index) => {
            if (item.docId === pathId) {
              return (
                <React.Fragment key={index}>
                  <Typography variant="h3" color="primary">
                    Name: {item.name}
                  </Typography>
                  <Typography variant="h3" color="primary">
                    Description: {item.desc}
                  </Typography>
                  <Typography variant="h5" color="primary">
                    Image link {item.img}
                  </Typography>
                </React.Fragment>
              );
            }
          })}
    </div>
  );
}

export default ItemPage;
