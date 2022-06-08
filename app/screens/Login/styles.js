import { StyleSheet } from 'react-native'
import { CONTENT } from '~/config/styles'

export default StyleSheet.create({
	container           : {
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	containerSocialLogin: {
		marginTop    : 14,
		marginBottom : 30,
		flexDirection: "row",
	},
	buttonSocialLogin   : {
		marginLeft    : 20,
		width         : 48,
		height        : 48,
		borderRadius  : 48 / 2,
		justifyContent: "center",
		alignItems    : "center"
	}
})