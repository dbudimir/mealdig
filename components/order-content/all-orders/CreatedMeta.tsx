import React, { Component } from 'react';
import Link from 'next/link';
import Moment from 'react-moment';

interface Props {
  userData: any;
  dateCreated: Date;
}
interface State {}

export default class CreatedMeta extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userData, dateCreated } = this.props;

    const orderUserName = userData.length === 0 ? 'unknown' : userData[0].userName;

    return (
      <div className="created-by">
        <p>
          Created by{' '}
          <Link
            href={{
              pathname: `/user/[user]`,
              query: { user: orderUserName }
            }}
            as={{ pathname: `/user/${orderUserName}` }}
          >
            <a href={`/user/${orderUserName}`}>
              <span>{orderUserName}</span>
            </a>
          </Link>{' '}
          <span>{userData.length === 0 ? '' : <Moment fromNow>{dateCreated}</Moment>}</span>
        </p>
      </div>
    );
  }
}
