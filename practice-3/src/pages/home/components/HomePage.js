import React from 'react';
import { Link } from 'react-router-dom';
import TableContainer from '../containers/TableContainer';
import Button from '../../../components/Button';
import { LABEL_NEW_PRODUCT } from '../../../utils/constants';
import Dropdown from '../containers/DropdowContainer';

const HomePage = () => {

  return (
    <div>
      <Link to="/add" >
        <Button bgcolor={'#008CBA'} >
          {LABEL_NEW_PRODUCT}
        </Button>
      </Link>
      <Dropdown />
      <TableContainer />
    </div>
  );
};

export default HomePage;
