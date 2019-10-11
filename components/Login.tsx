import React from 'react'
import { Image, View } from 'react-native'
import { Button, Icon, Input, Text } from 'react-native-elements'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Container, SpaceAFew } from './App'
// @ts-ignore
import Logo from '../assets/logo.png'
import styled from 'styled-components/native'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface State {
  username: string
  password: string
  loading: boolean
  error?: string
}

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: ''
    }
  }

  onLogin() {
    this.setState({ loading: true })

    const { username, password } = this.state
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        const user: FirebaseAuthTypes.User = auth()
          .currentUser as FirebaseAuthTypes.User

        this.setState({ loading: false })
        this.props.navigation.navigate('Applications')
      })
      .catch((error: any) => {
        this.setState({
          loading: false,
          error: error.nativeErrorMessage
        })
      })
  }

  render(): any {
    const { loading, error } = this.state

    return (
      <Container>
        <Image source={Logo} style={{ alignSelf: 'center' }} />

        <Input
          keyboardType={'email-address'}
          label={'username'}
          leftIcon={<Icon name="ios-person" type={'ionicon'} />}
          leftIconContainerStyle={{ marginRight: 20 }}
          placeholder="email"
          onChangeText={username => this.setState({ username })}
        />

        <SpaceAFew />

        <Input
          label={'password'}
          placeholder="password"
          leftIcon={<Icon name={'ios-lock'} type={'ionicon'} />}
          leftIconContainerStyle={{ marginRight: 20 }}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />

        <SpaceAFew />

        <Button
          title="LOGIN"
          type="outline"
          raised={true}
          loading={loading}
          onPress={() => this.onLogin()}
        />

        {error != '' && (
          <ErrorMessage>
            <ErrorText onPress={() => this.setState({ error: '' })}>
              {error}
            </ErrorText>
          </ErrorMessage>
        )}
      </Container>
    )
  }
}

const ErrorMessage = styled.View`
  align-self: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  padding: 30px;
  position: absolute;
  text-align: center;
  width: 80%;
`

const ErrorText = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`
