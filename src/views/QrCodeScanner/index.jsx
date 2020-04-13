import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { validateQrCode } from '../../utils/validators'
import { CameraView, Exit, XText } from './styled'

const QrCodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const checkAndSetPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  useEffect(() => {
    checkAndSetPermission()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
    try {
      const dataToJson = JSON.parse(data)
      if (validateQrCode(dataToJson)) {
        setScanned(true)
        navigation.navigate('Restaurant', {
          ...dataToJson,
          table: Number.parseInt(dataToJson.table),
        })
      }
    } catch (e) {
      // skip
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <CameraView>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <Exit onPress={() => navigation.goBack()}>
        <XText>&times;</XText>
      </Exit>
    </CameraView>
  )
}

QrCodeScanner.propTypes = {
  navigation: PropTypes.object,
}

export default QrCodeScanner
