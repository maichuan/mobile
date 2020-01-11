import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Root } from 'native-base'

import { Provider } from 'mobx-react'
import { rootStore } from './src/stores/RootStore'

import AppNavigator from './src/navigators/AppNavigator'

const App = () => {
  const [isReady, setIsReady] = useState(false)

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    setIsReady(true)
  }

  useEffect(() => {
    loadFont()
  }, [])

  return isReady ? (
    <Provider rootStore={rootStore}>
      <AppNavigator />
    </Provider>
  ) : (
    <Root>
      <AppLoading />
    </Root>
  )
}

export default App
