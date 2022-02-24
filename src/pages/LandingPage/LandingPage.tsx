import { FC, useEffect } from 'react'
import { useActions } from '../../hooks/useActions'

const LandingPage: FC = () => {
  const { notification$ } = useActions()

  return (
    <div>
      landing page <br />
      <button onClick={() => notification$.changeText('test')}>test</button>
    </div>
  )
}

export default LandingPage