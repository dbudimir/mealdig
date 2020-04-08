/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import tagIndex from '../public/static/tag-index.json';

// Styles
import SearchRow from '../styles/Search';

// Components
import ErrorMessageBar from './forms/ErrorMessageBar';

interface Props {
  suggestions: string[];
}

interface ErrorMessage {
  noInputError?: boolean;
  noChainError?: boolean;
  noTagError?: boolean;
  tagDoesNotExistError?: boolean;
}

interface State {
  selectedChain: string | boolean;
  userInput: any;
  filteredSuggestions: string[];
  activeSuggestion: number;
  showSuggestions: boolean;
  errorMessages: ErrorMessage;
  [key: string]: any;
}

export default class Search extends Component<Props, State> {
  static propTypes = { suggestions: tagIndex };
  static defaultProps = { suggestions: tagIndex };

  constructor(props: Props) {
    super(props);
    this.state = {
      // suggestions: tagIndex, // All possible tags
      activeSuggestion: 0, // The active selection's index
      filteredSuggestions: [], // The suggestions that match the user's input
      showSuggestions: false, // Whether or not the suggestion list is shown
      selectedChain: '', // What the user has entered
      userInput: '', // What the user has entered
      // Error toggles
      errorMessages: {
        noInputError: false,
        noChainError: false,
        noTagError: false,
        tagDoesNotExistError: false
      }
    };
  }

  // Event fired when the user clicks on a suggestion
  runSearch = () => {
    const { selectedChain, userInput, filteredSuggestions } = this.state;
    if (selectedChain === '' && userInput === '') {
      this.setState({ errorMessages: { noInputError: true } });
      //
    } else if (selectedChain === '') {
      this.setState({ errorMessages: { noChainError: true } });
      //
    } else if (userInput === '') {
      this.setState({ errorMessages: { noTagError: true } });
      //
    } else if (filteredSuggestions.length === 0) {
      this.setState({ errorMessages: { tagDoesNotExistError: true } });
      //
    } else {
      // Execute search
      Router.push(`/chains/${selectedChain}/${userInput}`);
    }
  };

  // Event fired when the input value is changed
  searchTextInput = (e: any) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user presses a key down
  searchInteraction = (e: any) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const clickedTag = e.currentTarget.innerText;
    //  .replace(/ /g, '-');

    // User has typed in a search and clicked in the tag list
    if (e.currentTarget.tagName === 'LI') {
      this.setState(
        {
          userInput: clickedTag
        },
        () => this.runSearch()
      );
    }

    // User pressed the enter key, update the input and close the suggestions
    else if (e.keyCode === 13) {
      this.setState(
        {
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        },
        () => this.runSearch()
      );
    }

    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      console.log(`${activeSuggestion + 1} and ${filteredSuggestions.length}`);
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

    // Keep user input up to date
    else {
      const { target } = e;
      const { value } = target;
      const { name } = target;

      this.setState({
        [name]: value
      });
    }
  };

  render() {
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, errorMessages } = this.state;

    let suggestionsListComponent;
    let errorBarComponent;
    let noSuggestionsComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }

              return (
                <li ref={`suggestion-${index}`} className={className} key={suggestion} onClick={this.searchInteraction}>
                  {suggestion.replace(/-/g, ' ')}
                </li>
              );
            })}
          </ul>
        );
      } else {
        noSuggestionsComponent = (
          <div className="no-suggestions">
            <div className="copy">
              <h3>Oh no!</h3>
              <span>
                We cant find any {userInput} custom meals. Be the first to submit your facorrite custom meal in this
                category.
              </span>
            </div>
            <Link
              href={{
                pathname: '/create-order'
              }}
              as={{ pathname: `/create-order` }}
            >
              <a href="/create-order">Build Custom Meal</a>
            </Link>
          </div>
        );
      }
    }

    if (errorMessages.noInputError === true) {
      errorBarComponent = <ErrorMessageBar message="Please enter a chain and tag before searching." />;
    } else if (errorMessages.noChainError === true) {
      errorBarComponent = <ErrorMessageBar message="Please enter a chain before searching." />;
    } else if (errorMessages.noTagError === true) {
      errorBarComponent = <ErrorMessageBar message="Please enter a tag before searching." />;
    } else if (errorMessages.tagDoesNotExistError === true) {
      errorBarComponent = <ErrorMessageBar message={`We can't find any custom orders with this tag.`} />;
    }

    return (
      <>
        {errorBarComponent}
        <SearchRow>
          <div className="search-container">
            <div className="header-text">
              <h1>MEALdig</h1>
              <h2>
                Discover new meals and custom orders at your favorite fast-casual dining spots. Select a chain and
                search for a meal type to get started.
              </h2>
            </div>
            <div className="search-box-container">
              <div className="select-container">
                <select className="search-action chain-select" onChange={this.searchInteraction} name="selectedChain">
                  <option value="" disabled selected>
                    Select chain
                  </option>
                  <option value="chipotle">Chipotle</option>
                  <option value="&pizza">&Pizza</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-down"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
              <div className="autocomplete-input">
                <input
                  className="search-action tag-input"
                  type="text"
                  onChange={this.searchTextInput}
                  onKeyDown={this.searchInteraction}
                  name="userInput"
                  value={userInput}
                  placeholder="low carb, vegan, keto..."
                />
                {suggestionsListComponent}
              </div>
              <div className="search-action search-submit" onClick={this.runSearch}>
                <span>Search</span>
                <img src="../static/icons/search.svg" alt="Search Icon" />
              </div>
            </div>
            {noSuggestionsComponent}
          </div>
        </SearchRow>
      </>
    );
  }
}
