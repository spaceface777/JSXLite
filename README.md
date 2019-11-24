# OnlyJSX
Use JSX to create DOM elements without importing a huge library like React

 - VERY small footprint (~250 bytes minified + gzipped)
 - 0 dependencies
 - TypeScript support (typings included with library)

## Usage
#### TypeScript
1. Install the library
    ```sh
    npm install onlyjsx
    ```

2. Add the following to your `tsconfig.json`: 
    ```json
    "compilerOptions": {
        (...)
        "jsx": "react",
        "reactNamespace": "JSX"
    }
    ```

3. Import the library at the top of whichever `.tsx` file you want to use it in:
    ```ts
    import JSX from "onlyjsx"
    ```

4. You can now use JSX!
    ```tsx
    const b = <h1 class="title">JSX works now!</h1>

    document.body.appendChild(<span id="example" onclick="alert('Hello')">Hi there</span>)
    ```

