export interface EvalOutputNonPrimitive {
  data: string;
  key: string;
  link?: string;
}
export type EvalOutputPrimitive = string;
export type EvalOutputItem = EvalOutputPrimitive | EvalOutputNonPrimitive;

export interface EvalOutput {
  type: EvalOutputType;
  stdout: string[];
  data: EvalOutputItem[];
}

export enum EvalOutputType {
  PRIMITIVE = "primitive",
  NON_PRIMITIVE = "non_primitive",
  UNDEFINED = "undefined",
  OBJECT = "object",
  ARRAY = "array"
}
