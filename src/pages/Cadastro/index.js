/* eslint-disable no-const-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, Alert, Button, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Text,
  Form,
  FormInput,
  SignLink,
  SignLinkText,
} from './styles';

import {indexAddRequest} from '../../store/modules/user/actions';

export default function Cadastro({navigation}) {
  const [sexo, setSexo] = useState(true);
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [imc, setImc] = useState();

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const pesoRef = useRef();
  const imcRef = useRef();

  const showAlert = () => {
    Alert.alert(
      'IMC = PESO / (ALTURA X ALTURA)',
      `Multiplique sua altura por ela mesma, depois divida seu peso pelo resultado da multiplicação`,
    );
  };

  function handleSubmit() {
    dispatch(indexAddRequest(sexo, altura, peso, imc));
    switch (imc) {
      case imc < 25: {
        navigation.navigate('Dieta');
        break;
      }
      case imc <= 25 && imc >= 30: {
        navigation.navigate('Dieta');
        break;
      }
      case imc > 30: {
        navigation.navigate('Dieta');
        break;
      }
      default: {
        navigation.navigate('Home');
      }
    }
  }

  return (
    <ScrollView>
      <Container>
        <Text>Bem vindo a EU FIT BRASIL!</Text>
        <Text>Você está em nosso aplicativo de controle.</Text>
        <Form>
          <Text style={{padding: 9}}>Qual o seu sexo?</Text>
          <Picker
            style={{
              padding: 9,
              height: 50,
              innerWidth: 150,
              fontSize: 23.5,
              backgroundColor: '#203a47',
              width: 330,
              marginLeft: 9,
              color: '#707070',
            }}
            selectedValue={sexo || 'Masculino'}
            onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}>
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>

          <Text style={{padding: 9}}>Altura</Text>
          <FormInput
            minLength={3}
            maxLength={4}
            keyboardType="numeric"
            placeholder="altura"
            returnKeyType="next"
            onSubmitEditing={() => pesoRef.current.focus()}
            value={altura}
            onChangeText={setAltura}
          />

          <Text style={{padding: 9}}>Peso</Text>
          <FormInput
            minLength={2}
            maxLength={3}
            keyboardType="numeric"
            ref={pesoRef}
            placeholder="peso"
            returnKeyType="next"
            onSubmitEditing={() => imcRef.current.focus()}
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={{marginTop: 40, padding: 9}}>IMC</Text>
          <FormInput
            minLength={4}
            maxLength={7}
            ref={imcRef}
            placeholder="imc"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={imc}
            onChange={setImc}
          />

          <SignLink
            onPress={showAlert}
            style={{alignSelf: 'center', marginBottom: 30}}>
            <SignLinkText>Como calcular o IMC?</SignLinkText>
          </SignLink>

          <Button
            loading={loading}
            onPress={
              () => Alert.alert(
                'Não disponivel','Dieta disponível apenas na versão Premium'
                )}
            title="Ir para minha dieta"
            color="#203a47"
          />
        </Form>
      </Container>
    </ScrollView>
  );
}

Cadastro.navigationOptions = {
  tabBarLabel: 'IMC',
  tabBarIcon: ({tintColor}) => (
    <Icon name="calculator" size={25} color={tintColor} />
  ),
};
