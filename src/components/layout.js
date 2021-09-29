import React, { useState, useEffect } from 'react';
import { getItemAsync } from 'expo-secure-store';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabBar } from './tabBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Feather } from '@expo/vector-icons';
import { api } from '../api';
const statusBarHeight = getStatusBarHeight();
export function Layout({children, navigation, scroll=false}) {
  const [name, setName] = useState('')
  useEffect(() => {
    (async () => {
      let token = await getItemAsync('token')
      const params = new URLSearchParams()
      params.append('token', token)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const response = await api.post('header.php', params, config);
      setName(response.data.user.name)
      
    })()
  })
  return (
    <Container>
      <Header name={name} />
      {scroll ? 
        (
          <ScrollContent bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollContent>
        ) : (
          <Content>
            {children}
          </Content>
        )
      }
      <TabBar navigation={navigation} />
    </Container>
  )
}
const Container = styled.View`
  flex: 1;
`;
const Row  = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Profile  = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 17.5px;
  border-width: 1px;
  border-color: #10BF21;
  margin-right: 15px;
`;
const Name = styled.Text`
  color: #fff;
  font-size: 12px;
  line-height: 14.4px;
  font-weight: 500;
`;
// const Content = styled.ScrollView`
const Content = styled.View`
  background-color: #E7ECF5;
  width: 100%;
  border-radius: 10px;
  margin-top: -27px;
  min-height: 100%;
  padding: 15.5px 25px 190px;
`;
const ScrollContent = styled.ScrollView`
  background-color: #E7ECF5;
  width: 100%;
  border-radius: 10px;
  margin-top: -27px;
  /* min-height: 100%; */
  padding: 15.5px 25px 190px;
`;
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
function Header({name}) {
  return (
    <LinearGradient
      colors={['#005851', '#001210']}
      style={{ 
        height: 91 + statusBarHeight, 
        paddingHorizontal: 25, 
        paddingTop: statusBarHeight + 14,
        paddingBottom: 14 + 27,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' }}
    >
      <Row>
        <Profile source={{ uri: 'https://i.imgur.com/TLy646u.png' }} />
        <Name>{name}</Name>
      </Row>
      <Feather name="list" size={18} color="white" />
    </LinearGradient>
  )
}