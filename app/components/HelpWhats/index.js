import React, { Component } from 'react'
import PropTypes from "prop-types";
import {View, Linking, ViewPropTypes} from 'react-native'
import { connect } from "react-redux";

import UIText from '../Text';
import UIButton from '../Button';

import { FONTS } from "../../config/styles";

class HelpWhats extends Component {
	static propTypes = {
		viewStyle: ViewPropTypes.style,
	};

    static defaultProps = {
        viewStyle: null
    }

    openWhatsapp = async () => {
		await Linking.openURL(this.props.whatsappUrl)
	}

    render () {
        const {viewStyle} = this.props

        return (
            <View style={viewStyle}>
                <UIText size={FONTS.sizeBase} style={{ textAlign: "center", color:"#6a6a84", fontFamily: FONTS.fontFamilyMedium, paddingBottom: 5}}>
                    Tem dúvidas ou precisa de ajuda?
                </UIText>
                <UIButton
                    type="default"
                    theme="transparent"
                    styleButton={{height: "auto"}}
                    title="Chame no WhatsApp"
                    uppercase={false}
                    styleText={{ fontSize: 18, fontFamily: FONTS.fontFamilyMedium, color: "#26d366" }}
                    onPress={this.openWhatsapp}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
	return {
		whatsapp: state.general.whatsapp,
		whatsappText: state.general.whatsappText,
		whatsappUrl: state.general.whatsappUrl,
	};
};

export default connect(mapStateToProps, null)(HelpWhats);
