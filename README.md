# JSXLite SSR
Use JSX to write HTML directly in your JS server

## Features
Please read [the README for the regular JSXLite package](https://github.com/spaceface777/JSXLite#readme), as everything there is pretty much 100% applicable here :)

## Differences from JSXLite
The main difference is that this package is meant for use in **server side** rendering, not direct creation of HTML elements like the regular JSXLite. Therefore, this package has some notable limitations compared to JSXLite, namely that it cannot assign event listeners directly to the DOM because this module doesn't run in the client at all.

Instead, this package works more like a templating engine in the sense that it generates its own HTML.  
Function components provide a very similar experience to that of using an engine like Mustache, Handlebars or the like. 

## Usage
1. Install the library
    ```sh
    npm install jsxlite-ssr
    ```

2. *(TypeScript)* Add the following to your `tsconfig.json`: 
    ```json
    "compilerOptions": {
        "jsx": "react",
        "reactNamespace": "JSX"
    }
    ```

3. Import the library at the top of whichever `.jsx` or `.tsx` file you want to use it in:
    ```tsx
    import JSX from 'jsxlite-ssr'
    ```

4. You can now use JSX!
    ```tsx
    // Express route
    app.get('/', function (req, res) {
        res.send(<h1 class="title">Hello!</h1>)
    })
    ```

## Complete Express example

```tsx
import express from 'express'
import JSX from '.'

const app = express()

interface MainPageProps {
    name: string;
    version: string;
}

const MainPage = (props: MainPageProps) => (
    <div class="root">
        <h1>Hello, { props.name }!</h1>
        <p>This is an example page from <code>jsxlite-ssr v{props.version}</code>.</p>
        <p>This HTML is being rendered into a string from JSX directly on the server.</p>
    </div>
)

app.get('/', function (req, res) {
    res.send(<MainPage name="JSXLite User" version="2.0.1" />)
})

app.listen(8080, () => console.log('Server started on port 8080'))
```