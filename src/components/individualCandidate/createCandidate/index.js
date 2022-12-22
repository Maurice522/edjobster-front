import React from "react";
import TitleTop from "./TitleTop";
import Personal from "./Personal";
import Education from "./Education";
import AssigntoJob from "./AssigntoJob";

const index = () => {
  return (
    <div>
      <TitleTop />
      <div className="common-width cc">
        <div className="cc-left">
          <Personal />
          <Education />
        </div>
        <div className="cc-right">
          <AssigntoJob />
        </div>
      </div>
    </div>
  );
};

export default index;
