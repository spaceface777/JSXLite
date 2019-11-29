# JSXLite
Use JSX to create DOM elements without importing a huge library like React

 - VERY small footprint (<350 bytes minified + gzipped)
 - 0 dependencies
 - TypeScript support (typings included with library)

## Features

**This library does not aim to be another React-like framework, and therefore many of React's core features have been completely left out. Instead, it aims to be a lightweight tool for those people (like me) who want to use JSX to create DOM elements, but don't want to install a huge, bloated library to do so. If you want a full web framework, this library is probably not meant for you.**


#### Features included
- Using JSX to create elements
- Functional components
    - Passing custom props to these components
- HTML attributes, props...
- A complete, well-tested TypeScript type definition

#### Features not included
- A virtual DOM implementation
    - A component's internal state
- Class components (useless if state isn't implemented)


## Usage
1. Install the library
    ```sh
    npm install jsxlite
    ```

2. *(TypeScript)* Add the following to your `tsconfig.json`: 
    ```json
    "compilerOptions": {
        "jsx": "react",
        "reactNamespace": "JSX"
    }
    ```

3. Import the library at the top of whichever `.jsx` or `.tsx` file you want to use it in:
    ```ts
    import JSX from "jsxlite"
    ```

4. You can now use JSX!
    ```tsx
    const b = <h1 class="title">JSX works now!</h1>

    document.body.appendChild(<span id="example" onclick="alert('Hello')">Hi there</span>)
    ```

## Function components
Function components are supported by the library, which means that you can create functional components and pass props to them like you would in React.

***Note: The function name must start with an uppercase letter, as this is how a function component is differentiated from a regular HTML element.***

```tsx
interface ExampleProps {
    name: string;
    version: string;
}

function Example (props: ExampleProps) {
    const features = [
        "lightweight",
        "easy to use",
        "simply amazing!"
    ]

    return (
        <div class="example">
            <p>Hello there!</p>
            <p>This is the {props.name} library, version v{props.version}</p>
            <p>It has many great features:</p>
            <ol>
                {features.map(f => <li>{'It is ' + f}</li>)}
            </ol>
        </div>
    )
}

document.body.appendChild(<Example version="2.0.0" name="JSXLite"/>)

```
