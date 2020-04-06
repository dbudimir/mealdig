/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';
import axios from 'axios';
import { TwitterShareButton, TwitterIcon, EmailIcon } from 'react-share';

// Styles
import FeedbackIconContainer from '../../styles/Feedback';
import { StringifyOptions } from 'querystring';


interface Props {
	updateFeedbackModal: Function;
}

interface State {
	emailInputDisplay: string | boolean;
	emailInputClass: string;
	emailFeedbackClass: string;
	feedbackDisplay: string;
	feedbackIcon: JSX.Element[] | JSX.Element;
	[key: string]: any;
	email: string;
   emailMessage: string;
   pageURL: string;
	updateFeedbackModal: Function;
}

export default class Feedback extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
		  ...props,
		  emailInputDisplay: false,
		  emailInputClass: '',
		  emailFeedbackClass: 'email-feedback',
		  feedbackDisplay: '',
		  feedbackIcon: <></>,
		  email: '',
		  emailMessage: '',
		  pageURL: '',
		};
	 }
  
  componentDidMount = () => {
    // Ensures that modal wont always appear after the user has turned it off or engaged with it.
    let showFeedback = '';
    if (localStorage.feedBackPopUpSeen === true || localStorage.feedBackPopUpSeen === undefined) {
      showFeedback = 'feedbackMessage';
    } else {
      showFeedback = 'infoIcon';
    }

    this.setState({
      pageURL: window.location.href,
      feedbackDisplay: showFeedback,
    });
  };

  updateState = (e: any) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  sendFeedbackEmail = () => {
    this.setState(
      {
        pageURL: window.location.href,
      },
      () => {
        axios
          .post(`${process.env.api_key}/api/email/send-feedback`, {
            ...this.state,
          })
          .then((response) => {
            if (response.status === 200) {
              this.setState({
                emailInputDisplay: 'success',
              });
            }
            console.log(response.status);
          });
      }
    );
  };

  openEmailUI = () => {
    this.setState((prevState) => ({
      emailInputDisplay: !prevState.emailInputDisplay,
      emailFeedbackClass:
        prevState.emailInputClass === 'email-feedback active'
          ? 'email-feedback'
          : 'email-feedback active',
    }));
  };

  openFeedbackModal = (e: any) => {
    const { updateFeedbackModal } = this.state;
    if (e.target.id === 'close-feedback-button') {
      this.setState({
        feedbackDisplay: 'infoIcon',
      });
    } else if (e.target.id === 'open-feedback-ui') {
      this.setState({
        feedbackDisplay: 'feedbackMessage',
      });
    } else {
      this.setState((prevState) => ({
        feedbackModalClass:
          prevState.feedbackModalClass === 'feedback-modal-open'
            ? 'feedback-modal-closed'
            : 'feedback-modal-open',
        feedbackDisplay: 'feedbackUI',
      }));
    }
    // Updates global state after the user interacts wit the pop up. The parent is "Layout"
    updateFeedbackModal();
  };

  render() {
    const {
      feedbackDisplay,
      emailInputDisplay,
      emailFeedbackClass,
      email,
      emailMessage,
      pageURL,
    } = this.state;

    // Switch case manages the the email input UI
    let emailInputContainer = <></>;
    switch (emailInputDisplay) {
      // When the email input inerface is showing
      case true:
        emailInputContainer = (
          <div className="email-input-container">
            <div className="form-input-label">
              <span>Email Address (optional)</span>
              <input
                name="email"
                onChange={this.updateState}
                value={email || ''}
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-input-label">
              <span>Message</span>
              <textarea
                name="emailMessage"
                onChange={this.updateState}
                value={emailMessage || ''}
                rows={4}
                placeholder="Share your thoughts..."
              />
            </div>
            <span className="send-email-button" onClick={this.sendFeedbackEmail}>
              Submit Feedback
            </span>
          </div>
        );
        break;
      // When the email input inerface is hidden
      case false:
        emailInputContainer = <></>;
        break;
      // Message when the email has be succesfully sent
      case 'success':
        emailInputContainer = (
          <div className="email-input-container">
            <p className="email-feedback-success-message">Thank you for your feedback!</p>
          </div>
        );
        break;
      default:
        break;
    }

    let feedbackIcon = <></>;
    switch (feedbackDisplay) {
      case 'infoIcon':
        feedbackIcon = (
          <>
            <div className="feedback-component-closed" onClick={(e) => this.openFeedbackModal(e)}>
              <img id="open-feedback-ui" src="/static/icons/info.svg" alt="Share Feedback Icon" />
            </div>
          </>
        );
        break;
      case 'feedbackMessage':
        feedbackIcon = (
          <>
            <div className="feedback-container" onClick={this.openFeedbackModal}>
              <span>We're a new website. Click here to share your feedback at anytime.</span>
              <img
                id="close-feedback-button"
                src="/static/icons/close.svg"
                alt="Share Feedback Icon"
              />
            </div>
          </>
        );
        break;
      case 'feedbackUI':
        feedbackIcon = (
          <div className="feedback-container" onClick={(e) => this.openFeedbackModal(e)}>
            <div className="feedback-inputs">
              {/* Intro text */}
              <span className="feedback-modal-header">
                Something wrong? Tell us how you expected this page to work.
              </span>
              {/* Twitter button */}
              <TwitterShareButton url={`${pageURL}`} title="@mealdig" hashtags={['feedback']}>
                <div className="twitter-feedback">
                  <p> Submit Via Twitter </p>
                  <TwitterIcon size={32} round />
                </div>
              </TwitterShareButton>
              {/* Email button */}
              <div className={emailFeedbackClass} onClick={() => this.openEmailUI()}>
                <p> Send Directly </p>
                <EmailIcon size={32} round />
              </div>
              {emailInputContainer}
            </div>
            <img
              id="close-feedback-button"
              src="/static/icons/close.svg"
              alt="Share Feedback Icon"
            />
          </div>
        );
        break;
      default:
        break;
    }

    return <FeedbackIconContainer>{feedbackIcon}</FeedbackIconContainer>;
  }
}
