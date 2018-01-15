
import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
const PageNav = (props) => {
  const length = props.products.length;
  const count = Math.ceil(length / 10);
  let pageNav = [];
  
  for (let i = 1; i <= count; i++) {
    let url = `/page/${i}`;
    console.log("page:" +props.page);
    let bgcolor='#008CBA', disable=false;
    if(i===parseInt(props.page, 10)){
      bgcolor='#303435';
      disable=true;
    }
    pageNav.push(
      <Link key={i} to={url} >
        <Button 
        key={i} 
        btnName={i + ''} 
        disabled={disable} 
        bgcolor={bgcolor}
        />
      </Link >)
  }
  return (
    <div>
      <Link to='/' >
        <Button btnName={'Preview'} />
      </Link>
      {pageNav}
      <Link to='/' >
        <Button btnName={'Next'} />
      </Link>
    </div>
  );
}

export default PageNav;