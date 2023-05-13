import React, {ReactElement} from 'react';
import LayoutAuthenticated from "../../layouts/Authenticated";

const IconsIndex = () => {
  return (
    <div>

    </div>
  );
};


IconsIndex.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default IconsIndex;