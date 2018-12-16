import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleTab } from '../actions/appState';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
            {
                name: 'Home',
                icon: 'home',
                type: 'font-awesome',
                action: () => this.props.dispatch(toggleTab('home')),
            },
            {
                name: 'Quick Add',
                icon: 'add',
                type: 'MaterialIcons',
                action: () => this.props.dispatch(toggleTab('quickAdd')),
            },
            {
                name: 'Library',
                icon: 'local-library',
                type: 'MaterialIcons',
                action: () => this.props.dispatch(toggleTab('library')),
            },
            {
                name: 'Graphs',
                icon: 'line-graph',
                type: 'entypo',
                action: () => this.props.dispatch(toggleTab('graphs')),
            },
            {
                name: 'Settings',
                icon: 'cog',
                type: 'entypo',
                action: () => this.props.dispatch(toggleTab('settings')),
            },
            ],
        }
    }

    renderItems() {
        const { items } = this.state;
        return items.map((item) => {
            return (
                <TouchableOpacity style={styles.item} key={item.name} onPress={() => item.action()}>
                    <Icon style={styles.itemIcon} name={item.icon} type={item.type} size={35} color='#fff'/>
                    <Text style={styles.itemText}>{item.name}</Text>                    
                </TouchableOpacity>
            );
        })
    }
  
    render() {
        const { items } = this.state;

        return (
            <View style={styles.main}>
                {this.renderItems()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        height: '11%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#4C9FFE',
        bottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    }, 
    item: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20%',
    },
    itemIcon: {

    },
    itemText: {
        marginTop: 10,
        marginBottom: 10,
    }
});

const mapStateToProps = state => {
  return {
      quickAdd: state.appState.quickAdd,
  }
}

export default connect(mapStateToProps)(Footer);