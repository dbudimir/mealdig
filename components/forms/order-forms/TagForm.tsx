// Utilities
import React, { Component } from 'react';

// Style
import styled from 'styled-components';

const TagInput = styled.div`
  .tag-container {
    font-size: 20px;
    font-family: Nunito;

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0px;
      width: 100%;
      list-style: none;

      .inserted-tag {
        padding: 4px 12px;
        border-radius: 3px;
        background-color: #44b5b4;
        margin: 0 8px 8px 0px;
        display: flex;
        align-items: center;
        color: #ffffff;

        button {
          align-items: center;
          appearance: none;
          background: #333333;
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: inline-flex;
          font-size: 12px;
          height: 15px;
          justify-content: center;
          line-height: 0;
          margin-left: 8px;
          transform: rotate(45deg);
          width: 15px;
        }
      }

      .tag-input {
        align-items: center;
        background: transparent;
        padding: 6px 0px;
        color: white;
        display: flex;
        font-weight: 300;
        list-style: none;
        width: 100%;
        margin-top: 8px;
        background: #f8f8f8;
        border-radius: 4px;
        box-shadow: inset rgba(0, 0, 0, 0.1) 0px 0px 4px 0;
        box-sizing: border-box;

        input {
          height: 100%;
          font-size: 22px;
          font-family: Nunito;
          border: none;
          background: transparent;
          width: 100%;
          padding: 4px 0px 4px 12px;
          border: none;
          width: 100%;
        }
      }
    }
  }
`;

interface Props {
  setTags: Function;
  tagInput?: any;
}

interface State {
  tags: string[];
}

export default class TagForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  updateState = () => {
    const { tags } = this.state;
    const { setTags } = this.props;

    const newArray: string[] = [];
    this.setState(
      () => {
        tags.forEach(tag => {
          newArray.push(tag.replace(/ /g, '-'));
        });
      },
      () => {
        setTags(newArray);
      }
    );
  };

  removeTag = (i: any) => {
    const { tags } = this.state;
    const newTags = [...tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    this.updateState();
  };

  inputKeyUp = (e: any) => {
    const { tags } = this.state;
    const val = e.target.value.toLowerCase();

    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }

      this.setState({ tags: [...tags, val] }, () => {
        this.updateState();
      });
      // Reset tag input field
      e.preventDefault();
      e.target.value = '';

      // Delete last character of tag
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(tags.length - 1);
    }
  };

  render() {
    const { tags } = this.state;

    return (
      <TagInput>
        <div className="tag-container">
          <ul className="tag-list">
            {tags.map((tag, i) => (
              <li className="inserted-tag" key={tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    this.removeTag(i);
                  }}
                >
                  +
                </button>
              </li>
            ))}
            <li className="tag-input">
              <input type="text" placeholder="(ex. healthy, vegan, spicey)" onKeyUp={this.inputKeyUp} />
            </li>
          </ul>
        </div>
      </TagInput>
    );
  }
}
