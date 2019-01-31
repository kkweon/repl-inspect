import * as React from "react";
import { EvalOutput, EvalOutputNonPrimitive } from "../models";

import axios from "axios";

interface ExpandableItemProps {
  data: EvalOutputNonPrimitive;
}

interface ExpandableItemState {
  expanded: boolean;
  data: EvalOutputNonPrimitive;
  children: EvalOutput | null;
}

export class ExpandableItem extends React.Component<
  ExpandableItemProps,
  ExpandableItemState
> {
  constructor(props: ExpandableItemProps) {
    super(props);
    this.state = {
      expanded: false,
      data: this.props.data,
      children: null
    };

    this.onExpand = this.onExpand.bind(this);
  }

  // send a request
  onExpand() {
    alert(this.state.data.link);

    if (this.state.data.link) {
      axios.get(this.state.data.link).then(resp => {
        const item = resp.data as EvalOutput;
        this.setState({
          expanded: true,
          children: item
        });
      });
    }
  }

  render() {
    if (!this.state.expanded) {
      return <p onClick={this.onExpand}>{this.props.data.data}</p>;
    }

    return <div>{JSON.stringify(this.state.children)}</div>;
  }
}
