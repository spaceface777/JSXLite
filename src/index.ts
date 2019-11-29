type ElementName = 
  | string
  | ((props: any) => HTMLElement) // Function components

interface PropsArg {
  [prop: string]: string | (() => any)
}


type Child = (string | HTMLElement)

type Children = Child[] | Child[][]


export const JSX = {
  // Core function of the module - parses JSX into DOM elements
  // It's called automatically when transforming JSX - 
  // it is not meant to be called directly by the user
  createElement (name: ElementName, props: PropsArg, ...children: Children): HTMLElement {
    props = props || {} // Prevent null from being passed

    // Allow for function components
    if (typeof name === 'function') return name(props)

    const element = document.createElement(name)

    for (const prop of Object.keys(props)) {
      const val = props[prop]

      if (typeof val === 'string') {
        switch (prop.toLowerCase()) {
          case 'classname': element.setAttribute('class', val) // Allow React-like 'className' attribute
          case 'innerhtml': element.innerHTML = val // Allow setting the element's inner HTML
          default: element.setAttribute(prop, val) // If not, simply pass the prop to the element
        }
      } else {
        const match = prop.match(/on(\w+)/)
        const event = match?.[1]
        if (event) {
          element.addEventListener(event, val)
        }
      }
    }

    function createChild (child: Child) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    }

    for (const child of children) {
      if (Array.isArray(child)) {
        child.forEach(c => createChild(c)) // Allow property arrays
      }

      else createChild(child)
    }

    return element
  }
}

export default JSX

// Typescript types
declare global {
  namespace JSX {
    type Element = HTMLElement;

    type IntrinsicElements = {
      // HTMLElementTagNameMap = every HTML tag
      [i in keyof HTMLElementTagNameMap]: Props;
    };
  }
}

export interface Props extends EventListeners {
  id?: string;
  class?: string;
  className?: string;
  innerHTML?: string;
  // TODO: Add more props here

  // Allow any other prop not whitelisted here
  [prop: string]: any;
}

// Event listeners
export interface EventListeners {
  oncopy?: (e: ClipboardEvent) => any
  oncut?: (e: ClipboardEvent) => any
  onpaste?: (e: ClipboardEvent) => any

  oncompositionend?: (e: CompositionEvent) => any
  oncompositionstart?: (e: CompositionEvent) => any
  oncompositionupdate?: (e: CompositionEvent) => any

  onfocus?: (e: FocusEvent) => any
  onblur?: (e: FocusEvent) => any

  onchange?: (e: Event) => any
  onbeforeinput?: (e: Event) => any
  oninput?: (e: Event) => any
  onreset?: (e: Event) => any
  onsubmit?: (e: Event) => any
  oninvalid?: (e: Event) => any

  onload?: (e: Event) => any
  onerror?: (e: Event) => any // also a Media Event

  onkeydown?: (e: KeyboardEvent) => any
  onkeypress?: (e: KeyboardEvent) => any
  onkeyup?: (e: KeyboardEvent) => any

  onabort?: (e: Event) => any
  oncanplay?: (e: Event) => any
  oncanplaythrough?: (e: Event) => any
  ondurationchange?: (e: Event) => any
  onemptied?: (e: Event) => any
  onencrypted?: (e: Event) => any
  onended?: (e: Event) => any
  onloadeddata?: (e: Event) => any
  onloadedmetadata?: (e: Event) => any
  onloadstart?: (e: Event) => any
  onpause?: (e: Event) => any
  onplay?: (e: Event) => any
  onplaying?: (e: Event) => any
  onprogress?: (e: Event) => any
  onratechange?: (e: Event) => any
  onseeked?: (e: Event) => any
  onseeking?: (e: Event) => any
  onstalled?: (e: Event) => any
  onsuspend?: (e: Event) => any
  ontimeupdate?: (e: Event) => any
  onvolumechange?: (e: Event) => any
  onwaiting?: (e: Event) => any

  // MouseEvents
  onauxclick?: (e: MouseEvent) => any
  onclick?: (e: MouseEvent) => any
  oncontextmenu?: (e: MouseEvent) => any
  ondoubleclick?: (e: MouseEvent) => any
  ondrag?: (e: DragEvent) => any
  ondragend?: (e: DragEvent) => any
  ondragenter?: (e: DragEvent) => any
  ondragexit?: (e: DragEvent) => any
  ondragleave?: (e: DragEvent) => any
  ondragover?: (e: DragEvent) => any
  ondragstart?: (e: DragEvent) => any
  ondrop?: (e: DragEvent) => any
  onmousedown?: (e: MouseEvent) => any
  onmouseenter?: (e: MouseEvent) => any
  onmouseleave?: (e: MouseEvent) => any
  onmousemove?: (e: MouseEvent) => any
  onmouseout?: (e: MouseEvent) => any
  onmouseover?: (e: MouseEvent) => any
  onmouseup?: (e: MouseEvent) => any

  onselect?: (e: Event) => any

  ontouchcancel?: (e: TouchEvent) => any
  ontouchend?: (e: TouchEvent) => any
  ontouchmove?: (e: TouchEvent) => any
  ontouchstart?: (e: TouchEvent) => any

  onpointerdown?: (e: PointerEvent) => any
  onpointermove?: (e: PointerEvent) => any
  onpointerup?: (e: PointerEvent) => any
  onpointercancel?: (e: PointerEvent) => any
  onpointerenter?: (e: PointerEvent) => any
  onpointerleave?: (e: PointerEvent) => any
  onpointerover?: (e: PointerEvent) => any
  onpointerout?: (e: PointerEvent) => any

  onscroll?: (e: UIEvent) => any

  onwheel?: (e: WheelEvent) => any

  onanimationstart?: (e: AnimationEvent) => any
  onanimationend?: (e: AnimationEvent) => any
  onanimationiteration?: (e: AnimationEvent) => any

  ontransitionend?: (e: TransitionEvent) => any
}
