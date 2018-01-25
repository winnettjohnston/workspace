import React, { Component } from 'react';
import { View } from 'react-native';
import {Header, Button, CardSection, Spinner} from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyC1uJaL2ihFrPp0Cmh-_xnPF4UtSuw0SKU",
            authDomain: "auth-48ce8.firebaseapp.com",
            databaseURL: "https://auth-48ce8.firebaseio.com",
            projectId: "auth-48ce8",
            storageBucket: "auth-48ce8.appspot.com",
            messagingSenderId: "162070961277"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                    );

            case false:
                return <LoginForm/>;

            default:
                return <CardSection><Spinner size="large" /></CardSection>;
        }

    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
