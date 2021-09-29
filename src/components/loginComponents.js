import React from 'react';
import { 
  View,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const imageHeight = windowWidth * 230 / 428;

export const Container = styled.View`
  flex: 1;
  /* height: 100px; */
  /* width: 100%; */
  /* background-color: #ffffff;
  align-items: center;
  justify-content: flex-start; */
`;
export const Content = styled.View`
  background-color: #ffffff;
  width: 100%;
  border-radius: 10px;
  margin-top: -36px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 57px 45px;
`;
export const Title = styled.Text`
  font-size: 22px;
  line-height: 37px;
  font-weight: bold;
  color: #005851;
`;
export const Subtitle = styled.Text`
  font-size: 16px;
  line-height: 19px;
  font-weight: normal;
  color: #757482;
  margin-bottom: 114px;
`;
export const Label = styled.Text`
  font-size: 10px;
  line-height: 12px;
  font-weight: normal;
  color: #005851;
  margin-bottom: 6px;
  margin-left: 11px;
  text-transform: uppercase;
`;
export const Input = styled.TextInput`
  background-color: #F5F7FB;
  width: 100%;
  padding: 11px 15px;
  font-size: 12px;
  color: #757482;
  line-height: 16px;
  border-radius: 4px;
  margin-bottom: 25px;
`;
export const Normal = styled.Text`
  font-size: 12px;
  line-height: 18px;
  font-weight: normal;
  color: #757482;
`;
export const Paragraph = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Alert = styled.Text`
  padding: 8px 16px;
  border: 1px solid #f00;
  width: 100%;
  position: relative;
  top: -50px;
`;
export function Header(props) {
    return (
      <HeaderBox resizeMode="contain" source={require('../../assets/header.png')} >
        <HeaderView>
          <View>

            {props.back && <TouchableOpacity onPress={() => props.navigation.navigate('Login')}><AntDesign name="arrowleft" size={30} color="white" /></TouchableOpacity>}
          </View>
          
          <View>
            <HeaderText>{props.children}</HeaderText>
          </View>
        </HeaderView>
      </HeaderBox>
    )
}

export function Link(props) {
  return (
    <TouchableOpacity { ...props }>
      <LinkText>{props.children}</LinkText>
    </TouchableOpacity>
  )
}
export function Button(props) {
  return (
    <ButtonBox { ...props }>
      <ButtonText>{props.children}</ButtonText>
    </ButtonBox>
  )
}

export function Footer({normal, link, navigation, linkTo}) {
  return (
    <FooterBox>
      <Paragraph>
        <Normal>{normal}</Normal>
        <Link onPress={() => navigation.navigate(linkTo)}>{link}</Link>
      </Paragraph>
      <FlagsRow>
        <TouchableOpacity>
          <Flag source={require('../../assets/bra-flag.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Flag source={require('../../assets/esp-flag.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Flag source={require('../../assets/usa-flag.png')} />
        </TouchableOpacity>
      </FlagsRow>
    </FooterBox>
  )
}

const HeaderBox = styled.ImageBackground`
  width: ${windowWidth}px;
  height: ${imageHeight}px;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderView = styled.View`
  width: 100%;
  margin-top: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 44.5px;
  padding-right: 49px;
`;

const HeaderText = styled.Text`
  font-size: 27px;
  line-height: 32px;
  font-weight: bold;
  color: #ffffff;
`;

const LinkText = styled.Text`
  font-size: 12px;
  line-height: 18px;
  font-weight: normal;
  color: #005851;
`;

const ButtonBox = styled.TouchableOpacity`
  width: 100%;
  height: 58px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: #10BF21;
  margin-top: 37px;
  margin-bottom: 37px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  color: #ffffff;
`;
const FooterBox = styled.View`
  width: 100%;
  height: 109px;
  justify-content: space-between;
  align-items: center;
`;
const FlagsRow = styled.View`
  width: 130px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Flag = styled.Image`
  width: 30px;
  height: 30px;
`;