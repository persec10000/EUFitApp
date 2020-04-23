/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, ScrollView, SafeAreaView, Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import axios from 'axios';

import {Container, Title, ButtonView, List} from './styles';

import api from '~/services/api';
import {signOut} from '~/store/modules/auth/actions';

import Profile from '~/components/Profile';

function Update({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  console.log("response=========",token)
  const [profile, setProfile] = useState([]);
  const URL = `https://eufitapi.herokuapp.com/cadastro`
  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    async function showProfile() {
      // const AuthStr = 'Bearer '.concat(token); 
      // axios.get(URL, { headers: { Authorization: AuthStr } })
      // .then(response => {
      //     // If request is good...
      //     console.log(response.data);
      //   })
      // .catch((error) => {
      //     console.log('error ' + error);
      //   });
      const response = await api.get('cadastro');
      setProfile(response.data);
    }
    showProfile();
  }, [])

  return (
    <Container>
      <SafeAreaView>
        <View>
          <Title>PERFIL</Title>
        </View>
        <ScrollView style={{flex: 1, paddingHorizontal: 30}}>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>Nome:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.nome}</Text>
            </View>
          </View>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize: 18, fontWeight:'700', textAlign:'center'}}>
              Indicators
            </Text>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>sexo:</Text>
            </View>
            <View style={{flex:1}}>
              {profile.sexo?
              <Text style={{fontSize: 18, fontWeight:'700'}}>male</Text>
              :
              <Text style={{fontSize: 18, fontWeight:'700'}}>female</Text>
              }
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>altura:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.altura}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>peso:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.peso}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>imc:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.imc}</Text>
            </View>
          </View>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize: 18, fontWeight:'700', textAlign:'center'}}>
              Index
            </Text>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>fc:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.fc}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>ps:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.ps}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>pd:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.pd}</Text>
            </View>
          </View>
          <View style={{marginVertical:10}}>
            <Text style={{fontSize: 18, fontWeight:'700', textAlign:'center'}}>
              Ciclo
            </Text>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>dia:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.dia}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>mes:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.mes}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginVertical:3}}>
            <View style={{width: 100}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>ano:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize: 18, fontWeight:'700'}}>{profile.ano}</Text>
            </View>
          </View>
        </ScrollView>
          {/* <List
            data={profile}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Profile data={item} />}
          /> */}
        
        <ButtonView>
          <Button
            onPress={() => navigation.navigate('Home')}
            title="VOLTAR"
            color="#203a47"
          />
        </ButtonView>
        <ButtonView>
          <Button
            onPress={handleLogout}
            title="SAIR"
            color="#FF4500"
          />
        </ButtonView>
      </SafeAreaView>      
    </Container>
  );
}

Update.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarIcon: ({tintColor}) => <Icon name="gear" size={25} color={tintColor} />,
};

const mapStateToProps = state => {
  return {
    token: state.auth,
  };
};

const UpdatePage = connect(
  mapStateToProps
)(Update);

export default UpdatePage;