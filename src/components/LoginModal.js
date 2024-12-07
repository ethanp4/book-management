import {forwardRef} from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router';

const LoginModal = forwardRef(function ResultModal({success}, ref){
  const navigate = useNavigate(); 

  return createPortal(
    <dialog ref={ref} onClose={success ? () => navigate('/') : undefined }>
      <h2>
        {success ? 'Login successful' : 'Login failed'}  
      </h2>
      <p>
        {success ? 'Welcome Back' : 'Please try again'}
      </p>
      <form method='dialog'>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default LoginModal