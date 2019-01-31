import React, { Component, FormEvent, SyntheticEvent } from "react";
import { EvalOutput, EvalOutputNonPrimitive, EvalOutputType } from "./models";
import { ExpandableItem } from "./components/ExpanableItem";

export interface InputProp {
  onSubmit: (text: string) => void;
  submitted: boolean;
  // user's code
  text: string;
  // output
  data: EvalOutput | null;
}

interface InputState {
  text: string;
}

const renderArray = (xs: EvalOutputNonPrimitive[]) => {
  return (
    <div>
      <p>{JSON.stringify(xs.map(x => x.data))}</p>
    </div>
  );
};

const renderKeyValuePairs = (xs: EvalOutputNonPrimitive[]) => {
  return (
    <div>
      <p>{"{"}</p>
      {xs.map(x => {
        if (x.link) {
          return (
            <div key={x.key} style={{ display: "flex" }}>
              <span>{x.key}: </span>
              <ExpandableItem data={x} />
            </div>
          );
        }
        return (
          <div key={x.key}>
            <span>{x.key}: </span>
            <span>{x.data}</span>
          </div>
        );
      })}
      <p>{"}"}</p>
    </div>
  );
};

export default class Input extends Component<InputProp, InputState> {
  constructor(props: InputProp) {
    super(props);
    this.state = {
      text: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    this.props.onSubmit(this.state.text);
  }

  onChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    if (target && target.hasOwnProperty("value")) {
      this.setState({ text: target.value });
    }
  }
  render() {
    if (this.props.submitted && this.props.data) {
      if (
        this.props.data.type === EvalOutputType.PRIMITIVE ||
        this.props.data.type === EvalOutputType.UNDEFINED
      ) {
        return (
          <div>
            <p>{this.props.text}</p>
            <p>{JSON.stringify(this.props.data.data)}</p>
          </div>
        );
      }

      if (this.props.data.type === EvalOutputType.ARRAY) {
        return (
          <div>
            {renderArray(this.props.data.data as EvalOutputNonPrimitive[])}
          </div>
        );
      }

      // non primitive type
      return (
        <div>
          <p>{this.props.text}</p>
          <p>{this.props.data ? this.props.data.stdout : ""}</p>
          <div>
            {this.props.data
              ? renderKeyValuePairs(this.props.data
                  .data as EvalOutputNonPrimitive[])
              : ""}
          </div>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            >
            <input
              autoFocus={true}
              type="text"
              value={this.state.text}
              onChange={this.onChange}
            />
          </label>
        </form>
      </div>
    );
  }
}
