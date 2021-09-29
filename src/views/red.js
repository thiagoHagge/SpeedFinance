import React, { useState, useEffect } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import styled from 'styled-components/native';
import { getItemAsync } from 'expo-secure-store';
import { FlatList, Text, ScrollView, StyleSheet } from 'react-native';

import { Layout, Title } from '../components/layout';
import {api} from '../api'

export function Red({ navigation }) {
    const [red, setRed] = useState({})
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
        const response = await api.post('meusindicados.php', params, config);
        console.log(response)
        setRed(response.data)
        })()
    }, [])
    return (
        <Layout navigation={navigation}>
            <Title>Red</Title>
            <ScrollView horizontal={true}>
                <Grid style={{ width: 1100, marginBottom: 75 }}>
                    
                    <FlatList 
                        data={red}
                        renderItem={({item}) => (
                            <>
                                {item.firstColumn && (
                                <Row style={{ borderTopWidth: 1 }}>
                                    <Col style={styles.firstCol}><Th>LOGIN</Th></Col>
                                    <Col style={styles.col}><Th>Nome</Th></Col>
                                    <Col style={styles.col}><Th>E-mail</Th></Col>
                                    <Col style={styles.col}><Th>Data de registro</Th></Col>
                                    <Col style={styles.col}><Th>Data de efetivação</Th></Col>
                                </Row>
                                )}
                                <Row>
                                    <Col style={styles.firstCol}><Td>{item.user}</Td></Col>
                                    <Col style={styles.col}><Td>{item.name}</Td></Col>
                                    <Col style={styles.col}><Td>{item.email}</Td></Col>
                                    <Col style={styles.col}><Td>{item.startDate}</Td></Col>
                                    <Col style={styles.col}><Td>{item.payDate}</Td></Col>
                                </Row>
                            </>
                        )}
                    />
                </Grid>
            </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    firstCol: {
        borderColor: '#000000',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4
    },
    col: {
        borderColor: '#000000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: 4
    },
});
const Th = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const Td = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
`;