import React, { useState, createRef, useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { 
  Container, 
  Content,
  Header, 
  Title, 
  Subtitle, 
  Label, 
  Input ,
  Link,
  Button,
  Paragraph,
  Normal,
  Footer,
  Alert
} from '../components/loginComponents';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { AuthContext } from '../../App';

export function Register({navigation}) {
  const [sponsor, setSponsor] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [county, setCounty] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkBox, handleCheckBox] = useState(false)
  const [showAlert, toggleAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState(false)
  const scroll = useRef()
  const { signUp } = useContext(AuthContext);
  async function sendSign() {
    if(checkBox == false) {
      toggleAlert(true)
      scroll.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
      setMessageAlert('Debes aceptar las condiciones de uso.')
    } else {
      const res = await signUp({
        sponsor,
        username,
        name,
        county,
        email,
        confirmEmail,
        password,
        confirmPassword
      })
      if(res != false) {
        toggleAlert(true)
        if(scroll != null){
          scroll.current.scrollTo({
            x: 0,
            y: 0,
            animated: true
          })
        }
        setMessageAlert(res)
      }
        
    }
  }
 
 
  return (
    <Container>
      <ScrollView 
        bounces={false}
        ref={scroll}

      >
        <Header back={true} navigation={navigation}>Registrarse</Header>
        <Content>
          <Title>Bienvenido</Title>
          <Subtitle>Continúe para registrarse!</Subtitle>
          {showAlert && <Alert>{messageAlert}</Alert>}
          <Label>PATROCINADOR</Label>
          <Input
            value={sponsor}
            onChangeText={(value) => setSponsor(value)}
            placeholder="Speedfinance"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>LOGIN</Label>
          <Input
            value={username}
            onChangeText={(value) => setUsername(value)}
            placeholder="john123"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>NOMBRE</Label>
          <Input
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="John Snow"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>PAÍS</Label>
          <Input
            value={county}
            onChangeText={(value) => setCounty(value)}
            placeholder="Republica Domincana"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>CORREO</Label>
          <Input
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="john@gmail.com"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>CONFIRME SU CORREO</Label>
          <Input
            value={confirmEmail}
            onChangeText={(value) => setConfirmEmail(value)}
            placeholder="john@gmail.com"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
          />
          <Label>CONTRASEÑA</Label>
          <Input
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="* * * * * * *"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
            secureTextEntry={true}
          />
          <Label>CONFIRME SU CONTRASEÑA</Label>
          <Input
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            placeholder="* * * * * * *"
            // placeholderTextColor=""
            autoCompleteType="username"
            blurOnSubmit={true}
            keyboardAppearance="dark"
            secureTextEntry={true}
          />
          <Paragraph>
            <TouchableOpacity onPress={() => handleCheckBox(!checkBox)}>
              {checkBox ? <FontAwesome name="check-square-o" size={18} color="#9acd32" /> : <FontAwesome name="square-o" size={18} color="#DDDDDF" />}
            </TouchableOpacity>
            <Normal style={{ marginLeft: 7 }} >He leído y acepto las </Normal>
            <Link>condiciones de uso</Link>
            <Normal>.</Normal>
          </Paragraph>
        <Button onPress={() => sendSign(scroll)}>Crear Cuenta</Button>
        <Footer
          normal="Ya tienes una cuenta? "
          link="Acceso"
          linkTo="Login"
          navigation={navigation}
        />
        </Content>
        <StatusBar barStyle="light-content" />
      </ScrollView>
    </Container>
  )
}
