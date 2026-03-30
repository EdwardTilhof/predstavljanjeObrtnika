import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

function Login() {
  const navigate = useNavigate();

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        {/* Left Side: Image */}
        <MDBCol col='10' md='6'>
          <img 
            src="https://placehold.co/600x800" 
            className="img-fluid" 
            alt="Sample image" 
          />
        </MDBCol>

        {/* Right Side: Form */}
        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3 dynamic-text">Sign in with</p>

            {/* Social Buttons: Now using your btn-theme-solid class */}
            <MDBBtn floating size='md' tag='a' className='me-2 shadow-none btn-theme-solid'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a' className='me-2 shadow-none btn-theme-solid'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a' className='me-2 shadow-none btn-theme-solid'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 dynamic-text">Or</p>
          </div>

          {/* Inputs: These automatically follow your .form-control CSS from ColorsStyle.css */}
          <MDBInput wrapperClass='mb-4' label='Email address' id='formEmail' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formPass' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' className="dynamic-text" />
            <a href="#!" className="dynamic-heading text-decoration-none">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            {/* Main Login Button: Switched from inline style to your theme class */}
            <MDBBtn className="mb-0 px-5 btn-theme-solid" size='lg'>
              Login
            </MDBBtn>
            
            <p className="small fw-bold mt-2 pt-1 mb-2 dynamic-text">
              Don't have an account? 
              <span 
                onClick={() => navigate(ROUTES.register)} 
                className="ms-1" 
                style={{ cursor: 'pointer', color: 'var(--heading-color)', fontWeight: 'bold' }}
              >
                Register
              </span>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;