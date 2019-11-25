type Props = { [key: string]: string }
type Children = (string | Element)[]

// Actual processing function - converts JSX syntax to real DOM elements
export const JSX = {
  createElement (name: string, props: Props, ...children: Children): HTMLElement {
    const element = document.createElement(name)
    props = props || {}

    for (const prop in props) {
      switch (prop.toLowerCase()) {
        case 'classname': element.setAttribute('class', props[prop]) // Allow React-like 'className' attribute
        case 'innerhtml': element.innerHTML = props[prop] // Allow setting the element's inner HTML
        default: element.setAttribute(prop, props[prop])
      }
    }

    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    }

    return element
  }
}

export default JSX

// TypeScript definitions for the module
declare global {
  namespace JSX {
    type Element = HTMLElement;
    interface IntrinsicElements {
      [tag: string]: any;
    }
  }
}
