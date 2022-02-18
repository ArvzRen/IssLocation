import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import axios from "axios";

export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        };
    }

    componentDidMount() {
        this.getIssLocation()
    }

    getIssLocation = () => {
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({ location: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Cargando</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                        
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitud: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitud: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitud (km): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Velocidad (km/h): {this.state.location.velocity}</Text>
                        </View>  
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    },
})