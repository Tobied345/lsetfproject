import React from 'react'
// import Photo from '../Header/thanks.jpg'
import styled from 'styled-components'


const Header = () => {
  return (
    <div>
      <Container >WELCOME TO LSETF CANDIDATE PORTAL</Container>
    </div>
  )
}

export default Header

const Container = styled.div`
  background-color:white;
  color: black;
  width: 100%;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;       
  border-right: .15em solid C3008B;       
  white-space: nowrap;      
  margin: 0 auto;       
  animation: typing 10s steps(40, end), blink-caret .75s step-end infinite;
  z-index: 1;
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: orange; }
    }
  
`