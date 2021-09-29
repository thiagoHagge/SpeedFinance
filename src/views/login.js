import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
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
import { AuthContext } from '../../App';

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
const imageHeight = vw * 230 / 428;
export function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, toggleAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState(false)
  const { signIn } = useContext(AuthContext);
  async function sendSign() {
    const res = await signIn({username, password})
    if(res != false) {
      toggleAlert(true)
      setMessageAlert(res)
    }
  }
  return (
    <Container>
      <Header>Sign in</Header>
      <Content>
        <Title>Bienvenido</Title>
        <Subtitle>Continúe para iniciar sesión!</Subtitle>
        {showAlert && <Alert>{messageAlert}</Alert>}
        <Label>LOGIN</Label>
        <Input
          value={username}
          onChangeText={value => setUsername(value)}
          placeholder="john123"
          // placeholderTextColor=""
          autoCompleteType="username"
          blurOnSubmit={true}
          keyboardAppearance="dark"
        />
        <Label>CONTRASEÑA</Label>
        <Input 
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="* * * * * * *"
          // placeholderTextColor=""
          autoCompleteType="password"
          blurOnSubmit={true}
          clearTextOnFocus={true}
          onFocus={() => setPassword('')}
          secureTextEntry={true}
        />
        <Link style={{ marginTop: 12 }}>Has olvidado tu contraseña?</Link>
        <Button onPress={() => sendSign()}>Sign In</Button>
        <Footer
          normal="No tienes una cuenta? "
          link="Inscribirse"
          linkTo="Register"
          navigation={navigation}
        />
      </Content>
      <StatusBar barStyle="light-content" />
    </Container>
  );
}

