import { Toast } from 'native-base'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export const Height = Dimensions.get('window').height

export const Width = Dimensions.get('window').width

export const displayToast = text =>
  Toast.show({
    text: text,
    textStyle: {
      textAlign: 'center',
    },
  })

export const getAndSetLocation = async store => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)
  // if (status !== 'granted') {
  //   this.setState({
  //     errorMessage: 'Permission to access location was denied',
  //   });
  // }
  if (status === 'granted') {
    let l = await Location.getCurrentPositionAsync({})

    store.setCurLoaciton({
      latitude: l.coords.latitude,
      longitude: l.coords.longitude,
    })
  }
}

export const questionConverter = question => {
  return question.split(',').map(q => {
    const questions = q.split(':')
    if (questions.length === 3) {
      return {
        question: questions[0],
        type: Number(questions[1]),
        choices: questions[2].split(';'),
      }
    } else {
      return {}
    }
  })
}

export const getIncresingPrice = ({ totalPrice, tax, serviceCharge }) => {
  const taxPercent = (100 + tax) / 100
  const serviceChargePercent = (100 + serviceCharge) / 100

  const net = (totalPrice / (taxPercent * serviceChargePercent)).toFixed(2)
  const serviceChargePrice = ((net * serviceCharge) / 100).toFixed(2)
  const taxPrice = (
    ((parseFloat(net) + parseFloat(serviceChargePrice)) * tax) /
    100
  ).toFixed(2)

  return {
    net,
    taxPrice,
    serviceChargePrice,
  }
}
