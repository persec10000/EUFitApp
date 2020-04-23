import {Alert} from 'react-native';
import {takeLatest, call, put, all, delay} from 'redux-saga/effects';

import api from '../../../services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
  indexAddSuccess,
  indexProfileFailure,
  cicloProfileSuccess,
  cicloProfileFailure,
  checkUpSuccess,
  checkUpFailure,
} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, ...rest} = payload.data;

    const profile = {
      name,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'cadastro', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Erro ao atualizar perfil',
      'Houve um erro ao atualizar seu perfil, confira seus dados',
    );
    yield put(updateProfileFailure());
  }
}

export function* indexProfile({payload}) {
  try {
    const {sexo, peso, altura, imc} = payload;

    const data = yield call(api.post, 'indicadores', {
      sexo,
      peso,
      altura,
      imc,
    });

    delay(3000);

    Alert.alert('Sucesso!', 'Dados cadastrados com sucesso');

    yield put(indexAddSuccess(data));
  } catch (err) {
    Alert.alert('Erro no cadastro', 'Verifique seus dados');
    yield put(indexProfileFailure());
  }
}

export function* cicloProfile({payload}) {
  try {
    const {dia, mes, ano} = payload;

    const data = yield call(api.post, 'ciclo', {
      dia,
      mes,
      ano,
    });

    Alert.alert('Sucesso!', 'Data cadastrada com sucesso');
    yield put(cicloProfileSuccess(data));
  } catch (err) {
    Alert.alert('Erro na hora de cadastrar', 'Por favor, verifique seus dados');
    yield put(cicloProfileFailure());
  }
}

export function* checkUp({payload}) {
  try {
    const {fc, ps, pd} = payload;

    const data = yield call(api.post, 'index', {
      fc,
      ps,
      pd,
    });

    Alert.alert('Sucesso!', 'Dados cadastrados com sucesso!');
    yield put(checkUpSuccess(data));
  } catch (err) {
    Alert.alert('Falha ao cadastrar', 'Por favor, verifique seus dados');
    yield put(checkUpFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/INDEX_ADD_REQUEST', indexProfile),
  takeLatest('@user/CICLO_PROFILE_REQUEST', cicloProfile),
  takeLatest('@user/CHECK_UP_REQUEST', checkUp),
]);
