import React, { PureComponent } from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { UIBadge, UIIcon, UIText, UIView } from '~/components'
import { FONTS } from '~/config/styles'
import styles from './styles'

class Task extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const {title, onClose, onContinue, last} = this.props

		return (
			<View
				activeOpacity={.6}
				{...this.props}
				style={styles.taskStyles}
			>
				<View style={styles.taskContent}>
					<UIText color="#26160F">{title}</UIText>
					<TouchableOpacity
						onPress={onContinue}
						activeOpacity={.6}
					>
						<UIText primary weight="bold">CONTINUAR</UIText>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={onClose}
					activeOpacity={.6}
				>
					<UIIcon name="video-close" color="#989292" size={12} style={{marginRight: 20}} />
				</TouchableOpacity>
			</View>
		)
	}
}

export default Task