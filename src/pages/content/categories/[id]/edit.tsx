import React, {ReactElement} from 'react';
import LayoutAuthenticated from "../../../../layouts/Authenticated";

const CategoryEdit = () => {
  return (
    <div>

    </div>
  );
};

CategoryEdit.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CategoryEdit;