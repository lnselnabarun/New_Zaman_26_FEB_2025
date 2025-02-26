import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import normalise from './normalize';
import PropTypes from 'prop-types';


export default function Selector(props) {
  return (
    <TouchableOpacity
      style={{
        height: normalise(42),
        width: '100%',
        borderColor: '#DDDDDD',
        borderWidth: normalize(1),
        borderRadius: normalize(10),
        marginTop: props.marginTop,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
      }}
      activeOpacity={0.6}
      onPress={props.onPress}>
      <Text
        numberOfLines={1}
        style={{
          paddingLeft: normalise(3),
          paddingRight: normalise(14),
          marginLeft: normalise(10),
          color: '#000',
          fontSize: normalise(12),
        }}>
        {props.text && props.text != '' ? props.text : props.placeholder}
      </Text>
      <Image
        source={props.icon}
        style={{
          height: normalise(15),
          width: normalise(15),
          position: 'absolute',
          right: normalise(15),
          top: normalise(13),
        }}
        resizeMode="contain"></Image>
    </TouchableOpacity>
  );
}

Selector.propTypes = {
  onPress: PropTypes.func,
  marginTop: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
};

Selector.defaultProps = {
  onPress: () => {},
  marginTop: 0,
  text: '',
  placeholder: '',
  icon: null,
};
