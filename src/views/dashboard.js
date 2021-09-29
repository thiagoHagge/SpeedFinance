import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { setString } from 'expo-clipboard';
import { getItemAsync } from 'expo-secure-store';

import { Feather, AntDesign } from '@expo/vector-icons';
import { MyCarousel } from '../components/MyCarousel';
import { ProgressCircle } from '../components/progressCircle';
import { Layout } from '../components/layout';
import { api } from '../api';

export function Dashboard({ navigation }) {
  const [ganhosRestantes, setGanhosRestantes] = useState("")
  const [totalAccountsPercent, setTotalAccountsPercent] = useState(0)
  const [totalAccountFormat, setTotalAccountFormat] = useState("")
  const [balance, setBalance] = useState("")
  const [trading, setTrading] = useState("")
  const [paquete, setPaquete] = useState("")
  const [bonus, setBonus] = useState("")
  const [ganhos, setGanhos] = useState("")
  const [rede, setRede] = useState("")
  const [link, setLink] = useState("")
  const isCarousel = React.useRef(null)
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
      const response = await api.post('dashboard.php', params, config);
      // console.log(response)
      setGanhosRestantes(response.data.format.ganhosRestantes)
      setTotalAccountsPercent(response.data.default.totalAccounts / 2000 * 100)
      setTotalAccountFormat(response.data.format.totalAccounts)
      setBalance(response.data.format.balance)
      setTrading(response.data.format.trading)
      setPaquete(response.data.format.paquete)
      setBonus(response.data.format.bonus)
      setGanhos(response.data.format.ganhosGerais)
      setRede(response.data.format.rede)
      setLink(response.data.user.link)
      
    })()
  })
  const carouselDATA = [
    {
      index: 0,
      value: ganhosRestantes
    },
    {
      index: 1,
    }
  ];
  const carouselWidth = Dimensions.get('window').width
  const GreenBg = styled.View`
    width: ${totalAccountsPercent > 100 ? 100 : totalAccountsPercent}%;
    background-color: #10BF21;
    padding: 4px;
    border-radius: 15px;
    align-items: center;
  `;
  return (
    <Layout navigation={navigation} scroll={true}>
      <SpaceBetween style={{ marginBottom: 15.5 }}>
        <Title>Backoffice</Title>
        <LangButton>
          <Flag source={require('../../assets/esp-flag.png')} />
          <AntDesign name="caretdown" size={6} color="#757482" />
        </LangButton>
      </SpaceBetween>
      <Row>

        <MyCarousel
          layout="stack"
          layoutCardOffset={10}
          ref={isCarousel}
          data={carouselDATA}
          renderItem={renderCarousel}
          sliderWidth={carouselWidth - 50}
          itemWidth={carouselWidth - 50 - 13}
          inactiveSlideShift={0}
          useScrollView={false}
          dotColor="#08A652"
          // containerCustomStyle={{ backgroundColor: "#fff000", }}
          // contentContainerCustomStyle={{ backgroundColor: "#ff0f0f" }}
        />
      </Row>
      <BigCard>
        <Label>Total de Cuentas</Label>
        <MutedBg>
          <GreenBg>
            <SmallWhite>{totalAccountFormat} Cuentas</SmallWhite>
          </GreenBg>
        </MutedBg>
      </BigCard>
      <SpaceBetween style={{ marginTop: 25 }}>
        <Card 
          colors={['#10bf21', '#086011']}
          icon="layers"
          title="Balance"
          value={balance}
        />
        <Card 
          colors={['#fb0', '#805e00']}
          icon="bar-chart"
          title="Billetera de Trading"
          value={trading}
        />
      </SpaceBetween>
      <SpaceBetween style={{ marginTop: 25 }}>
        <Card 
          colors={['#9a00ff', '#4d0080']}
          icon="dollar-sign"
          title="Valor del Paquete"
          value={paquete}
        />
        <Card 
          colors={['red', 'maroon']}
          icon="briefcase"
          title="Bono de Retiro"
          value={bonus}
        />
      </SpaceBetween>
      <SpaceBetween style={{ marginTop: 25 }}>
        <Card 
          colors={['#00dcff', '#006e80']}
          icon="trending-up"
          title="Ganancias Generales"
          value={ganhos}
        />
        <Card 
          colors={['#f0c', '#800066']}
          icon="user"
          title="Tamaño de la Red"
          value={rede}
        />
      </SpaceBetween>
      <TouchableOpacity style={{ width: '100%', marginTop: 25 }} onPress={() => setString(link)}>
        <LinearGradient
          colors={['#10bf21', '#086011']}
          style={{ 
            width: '100%', 
            paddingHorizontal: 12, 
            paddingVertical: 11, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderRadius: 5
          }}
        >
          <View style={{ width: 18 }} />
          <ButtonText>Copiar link de Registro</ButtonText>
          <Feather name="copy" size={18} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <SpaceBetween style={{ marginTop: 15, marginBottom: 100 }}>
        <TouchableOpacity style={{ width: '48%' }}>
          <LinearGradient
            colors={['#10bf21', '#086011']}
            style={{ 
              width: '100%', 
              paddingHorizontal: 12, 
              paddingVertical: 11, 
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center',
              borderRadius: 5
            }}
          >
            <ButtonText>Retiro de Bonus</ButtonText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '48%' }}>
          <LinearGradient
            colors={['#10bf21', '#086011']}
            style={{ 
              width: '100%', 
              paddingHorizontal: 12, 
              paddingVertical: 11, 
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center',
              borderRadius: 5
            }}
          >
            <ButtonText>Retiro de Pasivo</ButtonText>
          </LinearGradient>
        </TouchableOpacity>
      </SpaceBetween>   
    </Layout>
  )
}
function renderCarousel({item}) {
  // REFATORAR MARGEM
  return (
    item.index == 0 ? (
      <CarouselBackground style={{ borderRadius: 10, overflow: 'hidden' }} source={require('../../assets/carousel-graph.png')}>
        <Center>
          <TextWhite>Ganancias Restantes</TextWhite>
          <StrongWhite>{item.value}</StrongWhite>
        </Center>
        <ProgressCircle progress={.71}/>
      </CarouselBackground>
    ) : (
      <GreenView />
    )
  )
}

const CarouselBackground = styled.ImageBackground`
  width: 100%;
  height: 155px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-left: 47px;
  padding-right: 25px;
  border-radius: 10px;
  margin-left: -7px;
`;
const TextWhite = styled.Text`
  font-size: 13px;
  line-height: 15px;
  color: #fff;
  font-weight: 400;
`;
const StrongWhite = styled.Text`
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  font-weight: 600;
`;
const Center = styled.View`
  justify-content: center;
`;
const GreenView = styled.View`
  width: 100%;
  border-radius: 10px;
  height: 155px;
  background-color: #10BF21;
`;
const Flag  = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-right: 5px;
`;
const Row  = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SpaceBetween  = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Title = styled.Text`
  color: #005851;
  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
`;
const LangButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const BigCard = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
`;
const MutedBg = styled.View`
  width: 100%;
  background-color: #dedede;
  border-radius: 15px;
  align-items: flex-start;
  margin-top: 6px;
`;
const Label = styled.Text`
  color: #757482;
  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
`;
const SmallWhite = styled.Text`
  color: #fff;
  font-size: 11px;
  line-height: 13px;
  font-weight: 600;
`;
const SmallCard = styled.View`
  width: 150px;
  height: 77px;
  background-color: #fff;
  padding: 10px 0 10px 30px;
  border-radius: 5px;
  align-items: flex-start;
  margin-left: -26px;
  z-index: -1;
  justify-content: center;
`;
const Strong = styled.Text`
  color: #484848;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
`;
function Card({colors, icon, title, value}) {
  return (
    <Row>
      <LinearGradient
        colors={colors}
        style={{ 
          height: 52,
          width: 52,
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 7
        }}
      >
        <Feather name={icon} size={24} color="white" />
      </LinearGradient>
      <SmallCard>
        <Label>{title}</Label>
        <Strong>{value}</Strong>
      </SmallCard>
    </Row>
  )
}
