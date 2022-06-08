import React, {PureComponent} from 'react'
import {View, ImageBackground, TouchableOpacity} from 'react-native'
import { UIBadge, UIText } from '~/components'
import { FONTS } from '~/config/styles'
import styles from './styles'

class Card extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {backgorundImage, icon, name, badge, backgroundColor} = this.props

        return (
            <TouchableOpacity
                activeOpacity={.6}
                {...this.props}
                style={[styles.cardStyles, {backgroundColor}]}
            >
                <View style={styles.cardContent}>
                    {icon}
                    <UIText size={20} color="#fff">{name}</UIText>
                    {badge && (
                        <View style={styles.badgeCard}>
                            <UIBadge
                                text={badge}
                            />
                        </View>
                    )}
                </View>
                <View style={styles.backgroundImageContainer}>
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={backgorundImage}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

export default Card