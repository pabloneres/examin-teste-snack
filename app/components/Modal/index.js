import React, { Component } from 'react'
import {View, Text, Keyboard, TouchableOpacity} from "react-native"
import Modal from "react-native-modal"

import styles from './styles'

import UIButton from '../Button'
import UIText from "../Text"
import UIIcon from "../Icon"

import {MODAL} from "~/config/styles";
import PropTypes from "prop-types";

class UIModal extends Component {
    static propTypes = {
        title      : PropTypes.string,
        buttons    : PropTypes.array,
        closable   : PropTypes.bool,
        transparent: PropTypes.bool
    }

    static defaultProps = {
        closable   : false,
        transparent: false
    }

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        }
    }

    /**
     * Focus field
     */
    focus = () => {
        this.show();
    };

    /**
     * Show modal
     */
    show = () => {
        this.setState({
            modalVisible: true
        })
    };

    /**
     * Hide modal
     */
    hide = () => {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        return (
            <Modal
                onRequestClose={this.hide}
                isVisible={this.state.modalVisible}
                onBackdropPress={this.hide}
            >
                <View style={[styles.modalContainer, this.props.transparent ? {backgroundColor: "transparent"} : {}]}>
                    {this.props.title && <UIText size={MODAL.titleFontSize} weight="bold" textAlign="center">{this.props.title}</UIText>}
                    <View style={{marginVertical: this.props.title ? 20 : 0, marginBottom: this.props.title || !this.props.buttons ? 0 : 20}}>
                        {this.props.children}
                    </View>
                    {this.props.buttons && (
                        <View style={styles.buttonsContainer}>
                            {
                                this.props.buttons.map((item, index) => (
                                    <View key={index} style={{flex: 1, marginRight: index === 0 ? 10 : 0}}>
                                        <UIButton
                                            {...item}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    )}
                    {
                        this.props.closable && (
                            <TouchableOpacity style={{paddingTop: 20}} onPress={this.hide}>
                                <UIText textAlign="center" weight="bold">FECHAR</UIText>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </Modal>
        )
    }
}
0
export default UIModal