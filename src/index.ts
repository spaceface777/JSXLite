type ElementName =
  | string
  | ((props: any) => Node) // Function components

interface PropsArg {
  [prop: string]: any
}

type Child = string | number | boolean | null | undefined | Node

type Children = Array<Child | Child[]>


export const Fragment = Symbol('Fragment')

// Overloads so TypeScript infers the precise return type from the tag name
function createElement<K extends keyof HTMLElementTagNameMap>(name: K, props: PropsArg, ...children: Children): HTMLElementTagNameMap[K]
function createElement(name: typeof Fragment, props: PropsArg, ...children: Children): DocumentFragment
function createElement(name: (props: any) => Node, props: PropsArg, ...children: Children): Node
function createElement(name: string, props: PropsArg, ...children: Children): HTMLElement
function createElement(name: ElementName | typeof Fragment, props: PropsArg, ...children: Children): Node {
  props ??= {} // Prevent null from being passed

  // Flatten children (handles nested arrays from mapped lists)
  const flatChildren: Child[] = (children as any[]).flat(Infinity) as Child[]

  // Fragment: return a DocumentFragment containing all children
  if (name === Fragment || name === undefined) {
    const frag = document.createDocumentFragment()
    for (const child of flatChildren) createChild(frag, child)
    return frag
  }

  // Allow for function components
  if (typeof name === 'function') {
    // Forward children via props.children (non-empty only)
    if (flatChildren.length > 0) {
      props = { ...props, children: flatChildren.length === 1 ? flatChildren[0] : flatChildren }
    }
    return name(props)
  }

  const element = document.createElement(name)

  for (const prop of Object.keys(props)) {
    const val = props[prop]

    if (prop === 'className') {
      // React-like className alias
      element.setAttribute('class', String(val))
    } else if (prop === 'innerHTML') {
      element.innerHTML = String(val)
    } else if (prop === 'style' && typeof val === 'object' && val !== null) {
      // Support style as an object: { color: 'red', fontSize: '14px' }
      Object.assign(element.style, val)
    } else if (typeof val === 'boolean') {
      // Boolean attributes: disabled={true} → set attribute, disabled={false} → remove
      if (val) element.setAttribute(prop, '')
      else element.removeAttribute(prop)
    } else if (typeof val === 'function') {
      // Event listeners: match both lowercase (onclick) and camelCase (onClick)
      const match = prop.match(/^on([A-Za-z].*)$/)
      if (match) {
        element.addEventListener(match[1].toLowerCase(), val as EventListener)
      }
    } else if (val !== null && val !== undefined) {
      element.setAttribute(prop, String(val))
    }
  }

  for (const child of flatChildren) createChild(element, child)

  return element
}

function createChild(parent: Element | DocumentFragment, child: Child): void {
  if (child === null || child === undefined || child === false) {
    // Render nothing for falsy non-zero values (React convention)
    return
  }
  if (child instanceof Node) {
    parent.appendChild(child)
  } else {
    parent.appendChild(document.createTextNode(String(child)))
  }
}

export const JSX = { createElement, Fragment }

export default JSX

// TypeScript types
declare global {
  namespace JSX {
    type Element<T> = Node
    type Fragment = typeof Fragment
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: ElementProps<HTMLElementTagNameMap[K]>
    }
  }
}

// Detects readonly via the IfEquals trick: compares { readonly k } vs { k }
type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B

type WritableKeys<T> = {
  [K in keyof T]-?: IfEquals<
    { [Q in K]: T[K] },
    { -readonly [Q in K]: T[K] },
    K,
    never
  >
}[keyof T]

export interface Props extends Partial<GlobalEventHandlers> {
  id?: string;
  class?: string;
  className?: string;
  innerHTML?: string;
  style?: string | Partial<CSSStyleDeclaration>;
}

// From a concrete element type, pick writable props
type ElementProps<T extends HTMLElement> =
& Props
& { [K in WritableKeys<Omit<T, keyof Props>>]?: T[K] }
// & { [prop: string]: any }
