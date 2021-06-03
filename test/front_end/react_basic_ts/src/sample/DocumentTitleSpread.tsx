import React, {
  ChangeEvent,
  useEffect,
  useState,
  useRef,
} from 'react'


const DocumentTitleSpread: React.FC = () => {
  const [name, setName] = useState('Alice')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // set document title
  //   when name change
  useEffect(() => {
    document.title = `name: ${name}`
  }, [name])

  const ref = useRef<HTMLInputElement>(null)

  // auto focus at initial
  useEffect(() => {
    console.log('auto focus')
    ref.current?.focus()
  }, [])

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

export default DocumentTitleSpread
