import React from 'react'
import { Text } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Container } from './App'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const App: React.FC<Props> = ({ navigation }) => {
  const user: FirebaseAuthTypes.User = auth()
    .currentUser as FirebaseAuthTypes.User

  return (
    <Container>
      <Icon name={'ios-person'} type={'ionicon'} />
      <Text>registry at {new Date(parseInt(user.metadata.creationTime as string)).toDateString()}</Text>
      <Text>
        {user.email} (verified {user.emailVerified ? '' : 'not'} confirm)
      </Text>
      <Text>your cellphone is {user.phoneNumber || 'Unknown'}</Text>

      <Button
        type={'outline'}
        title={'logout'}
        onPress={() => {
          auth().signOut()
          navigation.navigate('Authentications')
        }}
      />

      <Button
        type={'outline'}
        title={'send confirm email'}
        onPress={() => {
          const user: FirebaseAuthTypes.User = auth()
          .currentUser as FirebaseAuthTypes.User

          user.sendEmailVerification()
            .throw((reason: any) => console.log('sendEmailVerification::', reason))
        }}
      />

    </Container>
  )
}

export default App
