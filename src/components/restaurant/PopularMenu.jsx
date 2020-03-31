import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Width } from '../../utils/utils'
import MenuModal from './MenuModal'

const MenuButton = styled.TouchableOpacity`
  margin: 10px 10px 10px 0px;
  width: ${Width / 1.5};
  height: ${Width / 2.5};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MenuImage = styled.Image`
  width: ${Width / 1.5};
  height: ${Width / 2.5};
  border-radius: 10px;
`
const NameView = styled.View`
  position: absolute;
  bottom: 0;
  align-self: stretch;
`
const Box = styled.View``
const Name = styled.Text`
  padding: 15px 10px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  text-shadow: 2px 2px black;
`

const PopularMenu = ({ data }) => {
  const [showModal, setShowModal] = useState(false)

  const addMenu = () => {
    setShowModal(true)
  }

  return (
    <>
      <Box>
        <MenuButton onPress={() => addMenu()}>
          <MenuImage
            source={
              data.imgURL
                ? { uri: data.imgURL }
                : require('../../../assets/shrimp.jpg')
            }
          />
        </MenuButton>
        <NameView>
          <Name> {data.name}</Name>
        </NameView>
      </Box>
      <MenuModal
        data={data}
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  )
}

PopularMenu.propTypes = {
  data: PropTypes.object,
}

export default PopularMenu
