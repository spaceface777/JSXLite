import JSX from '.'
import chai from 'chai'

chai.should()

describe('JSX', () => {
    it('Renders to a string', () => {
        (<h1>Test</h1>).should.be.a('string')
    })

    it('Renders simple HTML correctly', () => {
        (<h1>Test</h1>).should.equal('<h1>Test</h1>')
    })

    it('Renders children correctly', () => {
        (<h1>Child1 <h2>Child2</h2> Child3</h1>).should.equal('<h1>Child1 <h2>Child2</h2> Child3</h1>')
    })

    it('Supports string substitution', () => {
        const id = 'ID', _class = 'Class', child = 'Child'
        ;(<h1 id={id} class={_class}>{child}</h1>).should.equal('<h1 id="ID" class="Class">Child</h1>')
    })

    it('Converts React className to HTML class', () => {
        (<h1 className="Test"></h1>).should.equal('<h1 class="Test"></h1>')
    })
    
    it('Supports self closing tags', () => {
        (<h1 class="Test"/>).should.equal('<h1 class="Test"></h1>')
    })

    it('Encodes HTML entities', () => {
        const classXSS = '" onclick="alert(1)"'
        ;(<h1 class={classXSS}></h1>).should.equal('<h1 class="&quot; onclick=&quot;alert(1)&quot;"></h1>')
    })
})

describe('Custom elements', () => {
    it('Renders custom elements', () => {
        const Example = () => <h1>Test</h1>
        ;(<Example/>).should.equal('<h1>Test</h1>')
    })

    it('Passes props to element', () => {
        interface ExampleProps { title: string }
        const Example = ({ title }: ExampleProps) => <h1 class={title}>{title}</h1>

        ;(<Example title="Hello" />).should.equal('<h1 class="Hello">Hello</h1>')
    })

    it('Passes children to element', () => {
        const Wrapper = (_: any, children: string[]) => <h1 class="Wrapper">{children}</h1>

        ;(<Wrapper><div>Test</div></Wrapper>).should.equal('<h1 class="Wrapper"><div>Test</div></h1>')
    })
})
