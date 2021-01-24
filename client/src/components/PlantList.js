import React, { Component } from 'react';
import axios from 'axios';

const link = 'http://localhost:3333/plants';

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    filter: '',
  };
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  updatePlants() {
    return axios.get(link).then((res) => {
      const { plantsData } = res.data;
      return plantsData;
    });
  }

  componentDidMount() {
    this.updatePlants().then((plants) => {
      this.setState({ ...this.state, plants });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.updatePlants().then((plantData) => {
        const plants = this.filterPlants(plantData);
        this.setState({ ...this.state, plants });
      });
    }
  }

  filterPlants(plants) {
    return plants.filter((plant) => {
      const filter = this.state.filter.toLowerCase();
      if (plant.name.toLowerCase().includes(filter)) {
        return true;
      } else if (plant.scientificName.toLowerCase().includes(filter)) {
        return true;
      } else if (plant.description.toLowerCase().includes(filter)) {
        return true;
      } else {
        return false;
      }
    });
  }

  updateInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <>
        <input
          type="text"
          style={{ margin: '3em auto 0', width: '50%', textAlign: 'center' }}
          placeholder="Filter Plants"
          id="plantFilterInput"
          name="filter"
          value={this.state.filter}
          onChange={(e) => this.updateInput(e)}
        />
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id} data-testid="plant-card">
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </>
    );
  }
}
