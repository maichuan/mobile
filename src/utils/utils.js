import { Toast } from 'native-base'
import { Dimensions } from 'react-native'

export const Height = Dimensions.get('window').height

export const Width = Dimensions.get('window').width

export const displayToast = text =>
  Toast.show({
    text: text,
    textStyle: {
      textAlign: 'center',
    },
  })

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

export const getIncresingPrice = ({ totalPrice, vat, serviceCharge }) => {
  const vatPercent = (100 + vat) / 100
  const serviceChargePercent = (100 + serviceCharge) / 100

  const net = (totalPrice / (vatPercent * serviceChargePercent)).toFixed(2)
  const serviceChargePrice = ((net * serviceCharge) / 100).toFixed(2)
  const vatPrice = (
    ((parseFloat(net) + parseFloat(serviceChargePrice)) * vat) /
    100
  ).toFixed(2)

  return {
    net,
    vatPrice,
    serviceChargePrice,
  }
}

export const getTime = date => {
  date = new Date(date)
  const minute = date.getMinutes()
  return date.getHours() + '.' + (minute < 10 ? '0' + minute : minute)
}

export const generateListOfOrderDetails = details => {
  return details.map(detail => {
    return (
      '-' +
      detail.question +
      ': ' +
      (Array.isArray(detail.choices) ? detail.choices.join() : detail.choices)
    )
  })
}
