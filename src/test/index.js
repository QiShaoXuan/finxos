import React from 'react';
import './style.scss'
import EditBar from './edit-bar'


const Test1 = (props) => {
  return

}

export default props => {
  return (
    <div className="test-container">
      <EditBar>
        {/*<Operation>this is operation area</Operation>*/}
        {/*<BlockList>this is block list</BlockList>*/}
      </EditBar>
      <article>
        <h2>this is heading </h2>
        <p>this is article paragraph</p>
      </article>
    </div>
  );
};
