import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

export default class BackgroundImage extends Component{
	render () {
		console.log(this.props.childrens)
		const {source, children} = this.props;
		return(
			<ImageBackground
			source={source}
			style={{flex: 1, width: '100%'}}>
			{children}
			</ImageBackground>
			);
	}
}