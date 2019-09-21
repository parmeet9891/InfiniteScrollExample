import React from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PokemonCard from './components/PokemonCard';

const URL = "./data/data.json";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemonData: [],
      displayData: [],
      counter: 30,
      pokemonDataLength: 0,
    }
  }

  componentDidMount() {
    this.initData();
  }

  initData = ()=> {
    let {counter, displayData} = this.state;
    return axios.get(URL)
    .then((response) => {
      for(let i = 0; i < counter; i++) {
        displayData.push(response.data[i]);
      }
      counter+=30;
      this.setState({displayData, pokemonData: response, counter, pokemonDataLength: response.data.length});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidUpdate() {
      let {counter, pokemonDataLength} = this.state;

      if(counter > pokemonDataLength) {
        this.setState({counter: pokemonDataLength});
      }
      else if(counter <=  pokemonDataLength) {
        window.addEventListener('scroll', this.handleDataWithScroll);
      }
  }

  handleDataWithScroll = () => {
    let {pokemonData, counter} = this.state;
    let fakeArray = [];

    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let scrolledToBottom = Math.ceil((scrollTop + clientHeight) >= scrollHeight);

    if(scrolledToBottom) {
      for(let i = 0; i < counter; i++) {
        fakeArray.push(pokemonData.data[i]);
      } 
      counter+=30;
      this.setState({displayData: fakeArray, counter});
    }
  }

  render() {
    let {displayData, pokemonData} = this.state;
    return (
      <div>
        <div className = "container-fluid">
          <div className = "row">
            <div className = "col-md-12">
              <Navbar/>
            </div>
          </div>
        </div>

        <div className = "container pokemon-section">
          <div className = "row">
          {
            displayData ? displayData.map((value,index) => {
              return <PokemonCard
                key = {index}
                list = {value}
                image = {"./img/pokemons/"+value.name.toLowerCase()+".jpg"}
              />
            })
            : null
          }
          </div>
        </div>

      </div>
    )
  }
}

export default App;
