import {forwardRef} from 'react'
import { createPortal } from 'react-dom'

const LoginModal = forwardRef(function ResultModal({header, description, redirect}, ref){

  return createPortal(
    <dialog ref={ref} onClose={redirect ? () => window.location.href = redirect : undefined }>
      <h2>
        {header}
      </h2>
      <p>
        {description}
      </p>
      <form method='dialog'>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default LoginModal