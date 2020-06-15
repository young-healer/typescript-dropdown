import React, { useState, ReactElement } from "react";

interface IProps {
  suggestions: string[];
}

interface IState {
  activeSuggestion: number;
  filteredSuggestions: string[];
  showSuggestions: Boolean;
  userInput: string;
}

const Autocomplete: React.FunctionComponent<IProps> = ({ suggestions }) => {
  const [state, setState] = useState<IState>({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion: String) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {filteredSuggestions, activeSuggestion} = state;

    // enter key
    if (e.keyCode === 13) {
      setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // up arrow
    else if (e.keyCode === 38) {
      if (state.activeSuggestion === 0) {
        return;
      }

      setState({ ...state, activeSuggestion: activeSuggestion - 1 });
    }
    // down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setState({ ...state, activeSuggestion: activeSuggestion + 1 });
    }
  };




  const suggestionsListComponent:ReactElement = (
    <ul className="suggestions">
      {state.filteredSuggestions.map((suggestion, index) => {
        let className;

        if (index === state.activeSuggestion) {
          className = "suggestion-active";
        }

        return (
          <li
            className={className}
            key={index}
            onClick={onClick}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={state.userInput}
        placeholder="Type anything"
      />
      {suggestionsListComponent}
    </>
  );
}

export default Autocomplete;
