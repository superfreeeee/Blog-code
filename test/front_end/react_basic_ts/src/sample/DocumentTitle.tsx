import React, {
  ChangeEventHandler,
  ChangeEvent,
  useEffect,
  useState,
  useRef,
} from 'react'

function useAutoFocusRef() {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('auto focus')
    ref.current?.focus()
  }, [])

  return ref
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

function useFormInput(
  initialValue: string
): [string, ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState(initialValue)

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return [value, handleValueChange]
}

function useFormInputWithDocumentTitle(
  initialValue: string
): [string, ChangeEventHandler<HTMLInputElement>] {
  const [name, handleNameChange] = useFormInput(initialValue)
  useDocumentTitle(`name: ${name}`)
  return [name, handleNameChange]
}

const DocumentTitle: React.FC = () => {
  const [name, handleNameChange] =
    useFormInputWithDocumentTitle('Alice')

  const ref = useAutoFocusRef()

  return (
    <div>
      <input
        type="text"
        ref={ref}
        value={name}
        onChange={handleNameChange}
      />
    </div>
  )
}

export default DocumentTitle
