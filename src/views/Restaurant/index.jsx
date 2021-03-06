import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Icon } from 'native-base'
import { Linking } from 'expo'
import PropTypes from 'prop-types'
import Menu from '../../components/restaurant/Menu'
import PopularMenu from '../../components/restaurant/PopularMenu'

import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'

import Cart from '../../components/restaurant/Cart'
import { RestaurantContext } from '../../utils/context'
import {
  HeadImage,
  TextImage,
  RestaurantName,
  TableNoView,
  TableNo,
  SearchView,
  FilterButton,
  PopularText,
  HorizontalView,
  Container,
  LocationView,
  LocationIconView,
  LocationTextView,
  LocationText,
  LocationIcon,
  Hr,
  Detail,
} from './styled'
import SearchInput from '../../components/common/SearchInput'
import { SafeView } from '../../components/common/styled'
import { Width } from '../../utils/utils'
import { serverClient } from '../../api'
import Constants from '../../utils/constants'

import { API_READY } from 'react-native-dotenv'
import { mock } from './mock'

const Restaurant = ({ navigation, menusStore, spinnerStore }) => {
  const { id, imgURL, name, table } = navigation.state.params

  const [searchText, setSearchText] = useState('')
  const [restaurant, setResturant] = useState(null)

  const fetchMenu = async () => {
    spinnerStore.open()
    if (API_READY === 'true') {
      const res = await serverClient.get(`/restaurants/${id}`)

      setResturant(res.data)
    } else {
      setResturant(mock)
    }
    spinnerStore.close()
  }

  useEffect(() => {
    menusStore.clear()
    fetchMenu()
  }, [])

  const openMap = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        `http://maps.apple.com/?q=${restaurant.lat},${restaurant.long}`,
      )
    } else {
      Linking.openURL(
        `http://maps.google.com/?q=${restaurant.lat},${restaurant.long}`,
      )
    }
  }

  const openTel = () => {
    Linking.openURL(`tel:${restaurant.phoneno}`)
  }

  return (
    restaurant && (
      <RestaurantContext.Provider value={{ navigation }}>
        <Container>
          <HeadImage
            source={
              restaurant.imgURL
                ? imgURL
                  ? { uri: imgURL }
                  : { uri: restaurant.imgURL }
                : require('../../../assets/mock_res.jpg')
            }
          />
          <TextImage>
            <TableNoView>
              <RestaurantName>{name ? name : restaurant.name}</RestaurantName>
              {/* <RestaurantName>{restaurant.id}</RestaurantName> */}
            </TableNoView>
            {table !== 0 && (
              <TableNoView>
                <RestaurantName>Table No.</RestaurantName>
                <TableNo>{table}</TableNo>
              </TableNoView>
            )}
          </TextImage>
          <Detail>
            <LocationView onPress={openMap}>
              <LocationIconView>
                <LocationIcon name="location" type="Entypo" />
              </LocationIconView>
              <LocationTextView>
                <LocationText>{restaurant.address}</LocationText>
              </LocationTextView>
            </LocationView>
            <Hr />
            <LocationView onPress={openTel}>
              <LocationIconView>
                <LocationIcon name="mobile-phone" type="FontAwesome" />
              </LocationIconView>
              <LocationTextView>
                <LocationText>{'Tel: ' + restaurant.phoneno}</LocationText>
              </LocationTextView>
            </LocationView>
          </Detail>
          <PopularText>Most Popular</PopularText>
          <HorizontalView horizontal>
            {restaurant.menus &&
              restaurant.menus.map((m, i) => <PopularMenu key={i} data={m} />)}
          </HorizontalView>
          <PopularText>All Menu</PopularText>
          {restaurant.menus &&
            restaurant.menus.map((d, i) => <Menu key={i} data={d} />)}
        </Container>
        <Cart table={table} restaurantId={restaurant.id} />
        {Platform.OS === 'ios' && (
          <SafeView bottom color={Constants.weakColor} />
        )}
      </RestaurantContext.Provider>
    )
  )
}

Restaurant.propTypes = {
  navigation: PropTypes.object,
  menusStore: PropTypes.object,
  spinnerStore: PropTypes.object,
}

Restaurant.navigationOptions = props => {
  // console.log(props)
  return { headerShown: false }
}

export default compose(
  inject(({ rootStore }) => ({
    menusStore: rootStore.menusStore,
    spinnerStore: rootStore.spinnerStore,
  })),
  observer,
)(Restaurant)
