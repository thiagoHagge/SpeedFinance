import React, { useState, useEffect } from 'react';
import { getItemAsync } from 'expo-secure-store';

import { Layout, Title } from '../components/layout';
import {api} from '../api'
import { Input, Button } from '../components/loginComponents';

export function BankAccount({ navigation }) {
    const [wallet, setWallet] = useState('')
    const [usd, setUsd] = useState('')
    const send = async () => {
        let token = await getItemAsync('token')
        const params = new URLSearchParams()
        params.append('token', token)
        params.append('carteira', wallet)
        params.append('neteller', usd)
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const response = await api.post('contabancaria.php', params, config);
      }
    return (
        <Layout navigation={navigation}>
            <Title>Cuenta Bancaria</Title>
            <Input 
                value={wallet}
                onChangeText={value => setWallet(value)}
                placeholder="Ex: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
                // placeholderTextColor=""
                blurOnSubmit={true}
                keyboardAppearance="dark"
            /> 
            <Input 
                value={usd}
                onChangeText={value => setUsd(value)}
                placeholder="Billetera USDT TRC 20"
                // placeholderTextColor=""
                blurOnSubmit={true}
                keyboardAppearance="dark"
            />
            <Button>Actualizar</Button>
        </Layout>
    )
}
