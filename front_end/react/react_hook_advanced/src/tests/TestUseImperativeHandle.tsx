import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

interface InnerRefElement {
  hi: () => void
  value: () => void
}

interface InnerProps {
  onChange: () => void
}

const Inner = React.forwardRef((props: InnerProps, ref) => {
  const inputRef = useRef<HTMLInputElement>()

  useImperativeHandle(
    ref,
    (): InnerRefElement => ({
      hi: () => {
        console.log('say Hi')
      },
      value: () => {
        console.log(`value = ${inputRef.current.value}`)
      },
    }),
    [inputRef]
  )

  return (
    <input type="text" ref={inputRef} onChange={props.onChange} />
  )
})

const TestUseImperativeHandle = () => {
  const ref = useRef<InnerRefElement>()

  useEffect(() => {
    if (ref.current) {
      ref.current.hi()
    }
  }, [ref])

  const onChange = useCallback(() => {
    ref.current.value()
  }, [ref])

  return (
    <div>
      <h2>useImperativeHandle</h2>
      <Inner ref={ref} onChange={onChange} />
    </div>
  )
}

export default TestUseImperativeHandle
