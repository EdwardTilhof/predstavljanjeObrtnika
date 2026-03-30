import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';

function Registration() {
  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='9' className='my-5'>
          {/* Header already matches your theme color */}
          <h1 className="dynamic-heading mb-4 text-center">Create an Account</h1>

          <MDBCard className='custom-card shadow'>
            <MDBCardBody className='px-4'>

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 dynamic-text">Full name</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Enter your name' size='lg' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              {/* Updated HR to use your theme's border variable */}
              <hr className="mx-n3" style={{ borderColor: 'var(--feature-border)', opacity: 0.2 }} />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 dynamic-text">Email address</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='example@example.com' size='lg' id='form2' type='email'/>
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" style={{ borderColor: 'var(--feature-border)', opacity: 0.2 }} />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 dynamic-text">Password</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Password' size='lg' id='form3' type='password'/>
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" style={{ borderColor: 'var(--feature-border)', opacity: 0.2 }} />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 dynamic-text">Bio / Message</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBTextArea label='Tell us about yourself' id='textAreaExample' rows={3} />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" style={{ borderColor: 'var(--feature-border)', opacity: 0.2 }} />

              <div className='text-center'>
                {/* REPAIR: Added btn-theme-solid and shadow-none */}
                <MDBBtn className='my-4 px-5 btn-theme-solid shadow-none' size='lg'>
                  Register
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Registration;