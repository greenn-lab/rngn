import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './Login'
import Main from './Main'
import styled from 'styled-components/native'

export default createAppContainer(
  createSwitchNavigator({
      Authentications: createStackNavigator({
        Login
      }),
      Applications: createStackNavigator({
        Main
      })
    },
    {
      initialRouteName: 'Authentications'
    })
)

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
`
export const SpaceAFew = styled.View`
  height: 50px
`
