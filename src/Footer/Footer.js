import React from 'react'
import Copy from '../Footer/c.png'
import styled from 'styled-components'

const Footer = () => {
  return (
    <div>
      <P>Copyright  <Image></Image> Tobi 2022 </P>
    </div>
  )
}

export default Footer
const Image = styled.img`
  width: 15px;
  height:15px;
  border-radius: 50%;   
  background-image: url(${Copy});  
  background-size: cover;
  margin: 5px;
`
const P = styled.p`
    display: flex;
    justify-content: center;
    background-color: grey;
    color: white;
`

