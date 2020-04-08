import React, { Component } from 'react';
import Link from 'next/link';

interface Props {
  chainName: string;
  tags: string[];
}
interface State {}

export default class OrderTags extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tags, chainName } = this.props;
    const orderedTags = tags.map((tag, index) => (
      <Link
        key={`tag-${index}`}
        href={{
          pathname: `/chains/[name]/[tag]`,
          query: { chainName: chainName.toLowerCase(), tag }
        }}
        as={{ pathname: `/chains/${chainName.toLowerCase()}/${tag}` }}
      >
        {/* <a href={`/chains/${chainName.toLowerCase()}/${tag}`}>
          <span key={`tag-${index}`}>{tag.replace(/-/g, ' ')}</span>
        </a> */}
        <a href={`/chains/${chainName.toLowerCase()}/${tag}`} key={`tag-${index}`}>
          {tag.replace(/-/g, ' ')}
        </a>
      </Link>
    ));

    return (
      <div className="tag-row">
        <div className="tags">{orderedTags}</div>
      </div>
    );
  }
}
