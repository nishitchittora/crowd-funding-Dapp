import React from 'react';


const Layout = (props) =>{
    return(
      <div>
        <h1>In header</h1>
        {props.children}
        <h1>In Footer</h1>
      </div>
    )
}

export default Layout;
