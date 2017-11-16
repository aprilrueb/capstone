import React, { Component } from 'react';
import { fire } from './database';

class MapFirestore extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { data, component, classNames } = this.props;
    return (
      <div className={classNames}>
        { data.map(info => <component key={info.id} data={info} />) }
      </div>
    )
  }
}

export default MapFirestore;


