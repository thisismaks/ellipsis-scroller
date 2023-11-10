<h1 align="center">ellipsis-scroller</h1>

React component that scrolls the text with ellipsis

## Installation

```bash
npm i ellipsis-scroller
```

## Base example
```JavaScript
import Scroller from "ellipsis-scroller";
import "ellipsis-scroller/dist/main.css";

export default function App() {
  return (
    <div style={{ width: "150px" }}>
      <Scroller>A very long text that doesn't fit in the container</Scroller>
    </div>
  );
}
```
## CodeSandbox
[Base demo](https://codesandbox.io/s/ellipsis-scroller-base-demo-sfss86)

[MUI List demo](https://codesandbox.io/s/ellipsis-scroller-demo-q3tpwf)
