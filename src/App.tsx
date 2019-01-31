import React, { Component } from "react";
import "./App.css";
import Input, { InputProp } from "./Input";
import { sendEval } from "./evalService";
import { EvalOutput } from "./models";

// TODO: Refactor this to match InputProp
interface DataPoint {
  // user's code
  text: string;
  // output
  data: EvalOutput | null;

  submitted: boolean;
}

interface State {
  data: DataPoint[];
}

function buildNewDataPoint(): DataPoint {
  return {
    text: "",
    data: null,
    submitted: false
  };
}

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      data: [buildNewDataPoint()]
    };
  }

  updateText(key: number, obj: any, addNew: boolean = false) {
    const oldData = this.state.data[key];

    const newData = {
      ...oldData,
      ...obj
    };

    if (addNew) {
      this.setState({
        data: [
          ...this.state.data.slice(0, key),
          newData,
          ...this.state.data.slice(key + 1),
          buildNewDataPoint()
        ]
      });
    } else {
      this.setState({
        data: [
          ...this.state.data.slice(0, key),
          newData,
          ...this.state.data.slice(key + 1)
        ]
      });
    }
  }

  onSubmit(key: number, text: string) {
    console.log(text);

    sendEval(text).then(resp => {
      this.updateText(key, {
        data: resp
      });
      return;
    });

    this.updateText(key, { text, submitted: true }, true);
  }

  render() {
    return (
      <div className="App">
        {this.state.data.map((row, key) => {
          return (
            <Input
              key={key}
              onSubmit={(text: string) => this.onSubmit(key, text)}
              submitted={row.submitted}
              text={row.text}
              data={row.data}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
