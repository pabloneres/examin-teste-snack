import React, { PureComponent } from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { UIBadge, UIText, UIView } from '~/components'
import { FONTS } from '~/config/styles'
import styles from './styles'

class Button extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const {icon, name, badge, last, styleText} = this.props

		return (
			<TouchableOpacity
				activeOpacity={.6}
				{...this.props}
				style={[styles.buttonStyles, last ? {marginRight: 0} : {}]}
			>
				<View style={styles.buttonContent}>
					{icon}
					<UIView style={{height: "45%"}}>
						<UIText size={12} color="#26160F" style={styleText}>{name}</UIText>
					</UIView>
					{badge && (
						<View style={styles.badgeButton}>
							<UIBadge
								text={badge}
							/>
						</View>
					)}
				</View>
			</TouchableOpacity>
		)
	}
}

export default Button