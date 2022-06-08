import React, { Component } from "react"

import { View, ScrollView, Image } from "react-native"
import { UIHeader, UIScrollView, UIText, UIView, UIViewScreen } from "~/components"
import { CONTENT, FONTS } from "~/config/styles";

class About extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Sobre"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView style={{paddingHorizontal: 0}} indicatorStyle="white">
					<UIView mb={20} style={{paddingHorizontal: CONTENT.paddingHorizontal}}>
						<UIText weight="bold" size={FONTS.sizeLarge}>Lorem ipsum</UIText>
					</UIView>
					<UIView mb={15}>
						<Image style={{width: "100%"}} source={require("~/assets/img/aboutimage.png")} />
					</UIView>
					<UIText size={16} color="#686868" style={{paddingHorizontal: CONTENT.paddingHorizontal}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus eleifend euismod. Donec at lorem fermentum, rhoncus ante aliquam, ultricies augue. Aliquam tristique purus eget pulvinar vulputate. Proin tellus magna, cursus vel nibh nec, posuere faucibus nulla. Suspendisse ultricies diam nec auctor finibus. Morbi sed fringilla neque, eu dictum dolor. Donec sollicitudin fermentum quam, sed pretium massa porttitor eu. Suspendisse vitae dui ultricies, viverra risus ac, pretium lacus.

						Proin hendrerit condimentum turpis nec congue. Donec in mattis dolor. Nunc quis purus non ligula ultrices venenatis. Suspendisse non volutpat tortor. Nulla aliquam libero vitae mauris pharetra, ac lacinia mauris laoreet. Fusce gravida purus eu augue luctus ullamcorper. Phasellus quis velit sollicitudin, luctus diam vel, efficitur elit. Nunc porttitor vitae massa sit amet hendrerit. Maecenas auctor elementum maximus. Curabitur imperdiet leo a massa dictum mollis. Cras posuere eleifend risus, nec tempus orci ullamcorper a. Pellentesque pulvinar, est sit amet consectetur tincidunt, ex mi feugiat leo, eu egestas arcu tortor quis ante. Aenean euismod eleifend lectus, tristique vestibulum turpis fringilla quis. Praesent sodales mi eget fermentum ornare. Aenean dignissim euismod enim eu porta. Mauris efficitur augue diam, a hendrerit turpis tristique vitae.

						Pellentesque congue quis diam id vehicula. Nulla odio tellus, elementum rutrum mi et, feugiat venenatis nulla. In hac habitasse platea dictumst. Duis pellentesque dui vitae velit pellentesque condimentum. Maecenas id mauris ullamcorper, ultrices lorem non, fringilla enim. Proin porta quam nec lacus molestie pharetra. Proin volutpat urna turpis, ac eleifend leo pulvinar ut.

						Cras id leo lacus. Integer a neque suscipit, pulvinar dolor vel, dignissim arcu. Etiam malesuada at massa in pulvinar. Praesent eget pretium dolor. Suspendisse rutrum ante sed blandit pretium. Donec tortor risus, commodo vitae neque sit amet, dictum iaculis leo. Sed tristique neque turpis, vitae facilisis mi aliquet vitae. Fusce sagittis condimentum mauris in vehicula. Aenean bibendum magna sed lacus porttitor euismod. Mauris at magna a nisl suscipit laoreet nec id risus. Etiam mi lorem, commodo id sodales vitae, posuere sed nisi. Curabitur in magna ac lorem viverra consectetur vitae vel elit. Curabitur ornare eros in sem mollis, eget luctus neque porttitor. Proin accumsan egestas laoreet. Morbi ultricies, turpis eu porttitor suscipit, augue tortor fringilla arcu, et egestas lorem nisi quis orci. Donec malesuada suscipit odio.

						Aenean vitae tellus viverra, faucibus quam in, imperdiet quam. Proin vitae risus metus. Cras ut elementum eros, vitae mattis sem. Nulla facilisi. Cras id ligula eu nisl sollicitudin interdum. Mauris eleifend malesuada ipsum, eu lobortis velit accumsan quis. Aenean accumsan ultricies velit, vel viverra ante molestie pretium. Donec gravida tempus ante maximus maximus. Aenean sit amet mi vitae ligula fringilla porttitor. Integer consequat, ex at hendrerit viverra, turpis mauris iaculis velit, eu auctor nibh nisi tincidunt lorem. Vivamus consequat tempus ultrices.
					</UIText>
				</UIScrollView>
			</UIViewScreen>
		)
	}
}

export default About