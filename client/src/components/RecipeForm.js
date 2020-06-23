import React, { Component } from 'react';
import styles from './RecipeForm.module.css';

export default class RecipeForm extends Component {
  state = {
    name: '',
    url: '',
    description: '',
    review: '',
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  };

  handleFormSubmit = () => {
    const body = new FormData();

    Object.keys(this.state).forEach((key) => {
      body.append(key, this.state[key]);
    });

    fetch('/api/v1/recipes', {
      method: 'POST',
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleCheckboxChange = (e) => {
    const { checked, name } = e.target;
    this.setState({
      [name]: checked,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="url">Recipe URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="url">Recipe Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="url">Recipe Review</label>
            <textarea
              type="text"
              id="review"
              name="review"
              value={this.state.review}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="vegetarian"
                  checked={this.state.vegetarian}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor="vegetarian">Vegetarian</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="vegan"
                  checked={this.state.vegan}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor="vegan">Vegan</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="glutenFree"
                  checked={this.state.glutenFree}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor="glutenFree">Gluten Free</label>
              </li>
            </ul>
          </div>
          <button type="submit">Add Review</button>
        </form>
      </div>
    );
  }
}
