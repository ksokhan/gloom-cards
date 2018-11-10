import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import update from 'immutability-helper';
import { classes } from './data'

class App extends Component {
  state = {
    character: '',
    cards: [],
    editing: false,
  }

  save(character, data) {
    if (!character) character = this.state.character
    if (!data) data = this.state.cards
    window.localStorage.setItem(character, JSON.stringify(data))
  }

  init(character) {
    const {total, starting } = classes[character];
    const data = [...Array(total)].map( (e, index) =>
      ({id: index+1, visible: starting > index })
    )
    this.save(character, data)
    this.setState({ cards: data })
  }

  load(character) {
    const data = window.localStorage.getItem(character)
    if (data) {
      this.setState({ cards: JSON.parse(data) });
    } else {
      this.init(character)
    }
  }

  componentDidMount() {
    const character = window.localStorage.getItem('character') || 'mindthief';
    this.setState({ character })
    this.load(character)
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state
		const dragCard = cards[dragIndex]

		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		() => {
      this.save(this.state.character, this.state.cards)
    })
  }

  switchCharacter(character) {
    this.setState({character: character});
    this.load(character)
    window.localStorage.setItem('character', character)
  }

  toggleCard(index) {
    this.setState(
			update(this.state, {
				cards: {
					[index]: { visible: { $apply: (e) => !e } }
				},
			})
    , this.save)
  }

  render() {
    const { editing, character } = this.state
    return (
      <div className="App">
        <div className="character-panel">
          <select
            className="character-picker"
            value={character}
            onChange={(event) => this.switchCharacter(event.target.value)}
            >
            {Object.keys(classes).sort().map( (item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </div>

        <div className="edit-cards-panel">
          {this.state.cards.reduce( (prev, card) => {
            return card.visible ? prev + 1 : prev
          }, 0)} of {this.state.cards.length} cards selected

          <span
            className="edit-cards"
            onClick={() => this.setState({editing: !this.state.editing})}
          >
            {editing ? "Done" : "Edit available cards"}
          </span>
        </div>

        <div className="card-container">
          {this.state.cards.length === 0 &&
            <span>You don't have any cards selected</span>
          }
          {this.state.cards.map( (item, i) => (
            <Card
              key={item.id}
              character={this.state.character}
              id={item.id}
              index={i}
              moveCard={this.moveCard.bind(this)}
              showToggle={this.state.editing}
              visible={item.visible}
              toggleCard={this.toggleCard.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
