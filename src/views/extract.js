import React, { useEffect, useState } from 'react';
import { getItemAsync } from 'expo-secure-store';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import { Layout, Title } from '../components/layout';
import {api} from '../api'

export function Extract({ navigation }) {
  const [extract, setExtract] = useState({})
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
      const response = await api.post('extract.php', params, config);
      setExtract(response.data['extract'])
    })()
  })
  return (
    <Layout navigation={navigation}>
      <Title>Extracto</Title>
      <FlatList
        data={extract}
        renderItem={({item}) => {
          if(item.first == true) {
            return (
              <FirstExtractBox>
                <Date>{item.date}</Date>
                <Description>{item.description}</Description>
                <Value>{item.value}</Value>
              </FirstExtractBox>
            )
          } else if(item.last == true) {
            return (
              <LastExtractBox>
                <Date>{item.date}</Date>
                <Description>{item.description}</Description>
                <Value>{item.value}</Value>
              </LastExtractBox>
            )
          } else {
            return (
              <ExtractBox>
                <Date>{item.date}</Date>
                <Description>{item.description}</Description>
                <Value>{item.value}</Value>
              </ExtractBox>
            )
          }
        }}
      />
    </Layout>
  )
}
const FirstExtractBox = styled.View`
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-width: 0;
  padding: 5px;
  flex-direction: row;
  background-color: #e2f1f4;
`;
const ExtractBox = styled.View`
  border: 1px solid black;
  border-bottom-width: 0;
  padding: 5px;
  flex-direction: row;
  background-color: #e2f1f4;
`;
const LastExtractBox = styled.View`
  border: 1px solid black;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-width: 1px;
  padding: 5px;
  flex-direction: row;
  background-color: #e2f1f4;
  margin-bottom: 110px;
`;
const Date = styled.Text`
  font-size: 12px;
  margin-right: 5px;
`;
const Description = styled.Text`
  font-size: 12px;
  flex: 0.9;
`;
const Value = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: auto;
`;