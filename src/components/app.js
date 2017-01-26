import React, { Component } from 'react';

export default class App extends Component {
  render() {

  	      	//tengo que colocar esto para que se muestren los <Route> child tags que estan dentro de este Componente:
    return (
      <div>
      	{this.props.children}
      </div>
    );
  }
}
