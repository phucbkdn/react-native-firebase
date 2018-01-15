import React from 'react';
import { Link } from 'react-router-dom';
import TableContainer from '../containers/TableContainer';
import Button from '../../../common/components/Button';
import { LABEL_NEW_PRODUCT } from '../../../utils/constants';
import Dropdown from '../containers/DropdowContainer';

const HomePage = () => {

  return (
    <div>
      <Link to="/add" >
        <Button btnName={LABEL_NEW_PRODUCT} />
      </Link>
      <Dropdown />
      <TableContainer />
    </div>
  );
};

export default HomePage;
