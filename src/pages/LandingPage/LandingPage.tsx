import { FC } from 'react'
import Alert from '../../components/Modal/Alert'
import Confirm from '../../components/Modal/Confirm'
import Prompt from '../../components/Modal/Prompt'
import { useActions } from '../../hooks/useActions'

const LandingPage: FC = () => {
  const { modal } = useActions()
  return (
    <div>
      landing page <br />
      <button onClick={() => modal.show(<Alert title='test'/>)}>alert</button> <br />
      <button onClick={() => modal.show(<Confirm title='confirm??'/>)}>confirm</button> <br />
      <button onClick={() => modal.show(<Prompt title='prompt' onChange={(val, set) => {
        console.log({val, set})
        set(curr => curr.replace('a', 'b'))
      }}/>)}>prompt</button>
    </div>
  )
}

export default LandingPage