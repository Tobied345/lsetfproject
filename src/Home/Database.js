import React from 'react'
import styled from 'styled-components';
import  {useState, useEffect,useRef} from 'react';
import {toast} from 'react-toastify';
import 'aos/dist/aos.css';
import {db,storage} from '../Base';
import Icon from '../img/ws.png';
import Icon2 from '../img/fb.png';
import Icon3 from '../img/gitp.png';
import Icon4 from '../img/lk.png';
import {collection, addDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import {ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';


const Database = () => {
  const [Names, setNames] = useState([]);
  const [Desc, setDesc] = useState('');
  const [Githup, setGithup] = useState('');
  const [Linkedin, setLinkedin] = useState('');
  const [Facebook, setFacebook] = useState('');
  const [Whatsapp, setWhatsapp] = useState('');
  const [imgurl, setimgurl] = useState('');
  const [progress, setProgress] = useState(0);
  const [newtime, setNewTime] = useState(Timestamp.now().toDate())

  const collectionRef = collection(db, 'lsetfbiodata');

      const AddStud = () => {
        const storageRef = ref(storage, `/images/${Date.now()}${imgurl.name}`);
        const uploadImage = uploadBytesResumable(storageRef, imgurl)
        uploadImage.on("state_changed", (snapshot) => {
        const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
    },
    (err)=>{
        console.log(err)
    },
    ()=> {
        getDownloadURL(uploadImage.snapshot.ref)
        .then((url)=> {
            addDoc(collectionRef, {name:Names, desc:Desc, gitup:Githup, linkedin:Linkedin,facebook:Facebook,  whatsapp:Whatsapp, img:url,})
            .then(() => {
                toast("Uploaded Successfully", {type:"success"});
                setProgress(0);
            })
            .catch(err=>{
                toast("Upload Failed", {type:"error"});
            })
        }) 
    })   
    }


  const CardId = async () => {
    await addDoc(collectionRef, {name:Names, desc:Desc, gitup:Githup, linkedin:Linkedin,
    facebook:Facebook, whatsapp:Whatsapp, img:imgurl})
    console.log(CardId)
  }


  const getData = async () => {
    const data = await getDocs(collectionRef);
    setNames(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
  }

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = Names.filter(Names => 
      (`${Names.name}`.toLowerCase().includes(value)));
      setNames(filteredUsers)
      
  }
  

  useEffect(() => {
    getData()
    
  }, []);
  
  return (
    <Container>
      <H1>CANDIDATE PROFILE</H1>
      <SearchBox onInput={filterCards} placeholder="Search..."></SearchBox>
      <CardsHolder>
        {Names.map((datas) => (
        <div key={datas.id}>
          <Card>
            <img style={{height:'100px', width:'100px', borderRadius: '50%'}} src={datas.img} alt="img"/>
          <CardTitle>{datas.name}</CardTitle>
          <CardDesc>{datas.desc}</CardDesc><br/>
          <CardIcon>
          <CardDesc><a target='_blank' href={`${datas.gitup}`}><ImgIcon3></ImgIcon3></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.linkedin}`}><ImgIcon4></ImgIcon4></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.facebook}`}><ImgIcon2></ImgIcon2></a></CardDesc>
          <CardDesc><a target='_blank' href={`${datas.whatsapp}`}><ImgIcon></ImgIcon></a></CardDesc>
          </CardIcon>
          </Card>
          
        </div>
      ))}
      </CardsHolder>
    </Container>
  )
}

export default Database

const Container = styled.div`
  background-color: grey;
  padding: 4rem;  
   @media screen and  (max-width: 480px) {
    body {        
      width:100%;
      display:flex;
      justify-content: center;
    }
}
 
@media screen and (min-width: 1025px) {
    body {
      width:100%;
      display:block;
      justify-content: center;
    }
}
`
const SearchBox = styled.input`
  outline: none;
  width: 100%;
  border: 1px solid grey;
  font-size: 1rem;
  padding: 1rem;
  border-radius: .5rem;
`
const H1 = styled.h1`
  text-align: center; 
  color: black;
  
`

const CardsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Card = styled.div`
    background-color: white;
    margin: 2rem 2rem 2rem 0;
    padding: 1.5rem;
    width: 250px;
    box-shadow: 0 0 28px 4px rgba(0,0,0,0.1);
    transition: transform .3s ease;
    cursor: pointer;
    :hover {
        transform: scale(1.1);
        background-color: grey;
        color: white;
    }
`
const CardTitle = styled.div`
    font-weight: 800;
    font-size: 1.5rem;
`
const CardImage = styled.img`
    display: flex;
    justify-content: flex-end;
    img{
        border-radius: 50%;
    }
`
const CardDesc = styled.div`
    font-size: 12px;
    font-style: italic;       
`
const  CardIcon  = styled.div`
    display: flex;
    justify-content: space-around;
      
`
const ImgIcon = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;
  background-image: url(${Icon});  
  background-size: cover;  
`
const ImgIcon2 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;  
  background-image: url(${Icon2});
  background-size: cover;
  `
  const ImgIcon3 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;   
  background-image: url(${Icon3});
  background-size: cover;
  `
  const ImgIcon4 = styled.img`
  width: 30px;
  height:30px;
  border-radius: 50%;   
  background-image: url(${Icon4});  
  background-size: cover;
  `