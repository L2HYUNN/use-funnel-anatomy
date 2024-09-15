import React from "react";

type EventObject = { type: string; payload: any };

interface State<TName extends string | number | symbol, TContext = never> {
  name: TName;
  context: TContext;
}

type StateRenderResult<
  TState extends State<any, any>,
  TNextState extends State<any, any>,
  TEvent extends EventObject
> = {};

type StateRender<
  TState extends State<any, any>,
  TNextState extends State<any, any>,
  TEvent extends EventObject
> = (
  renderFn: (_: {
    context: TState["context"];
    transition: (target: TNextState["name"]) => void;
    dispatch: (event: TEvent) => void;
  }) => React.ReactNode
) => StateRenderResult<TState, TNextState, TEvent>;

type A = { type: "A"; payload: number } | { type: "B"; payload: boolean };
type _ = Extract<A, { type: "A" }>["payload"];

interface Step<
  TState extends State<any, any>,
  TNextState extends State<any, any>,
  TEvent extends EventObject
> {
  on: <TEventName extends string, TPayload>(
    eventName: TEventName,
    handler: (
      payload: TPayload,
      _: {
        context: TState["context"];
        transition: (target: TNextState["name"]) => void;
      }
    ) => void
  ) => Step<
    TState,
    TNextState,
    TEvent | { type: TEventName; payload: TPayload }
  >;
  events: <
    TEventObjectAssign extends Record<
      string,
      (
        payload: any,
        _: {
          context: TState["context"];
          transition: (target: TNextState["name"]) => void;
        }
      ) => void
    >
  >(
    _: TEventObjectAssign
  ) => Step<
    TState,
    TNextState,
    | TEvent
    | {
        [key in keyof TEventObjectAssign]: key extends string
          ? { type: key; payload: Parameters<TEventObjectAssign[key]>[0] }
          : never;
      }[keyof TEventObjectAssign]
  >;
  render: StateRender<TState, TNextState, TEvent>;
}

type CreateStep<
  TState extends State<any, any>,
  TNextState extends State<any, any>
> = (
  state: Step<TState, TNextState, any>
) => StateRenderResult<TState, TNextState, any>;

export declare function createUseFunnel<
  TStepContextMap extends Record<string, any>
>(): () => void;
