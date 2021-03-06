import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleTab, toggleMode } from '../../actions/appState';
import globalStyles from '../../globalStyles';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {
                macros: [
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
                    // {
                    //     name: 'Graphs',
                    //     icon: 'line-graph',
                    //     type: 'entypo',
                    //     action: () => this.props.dispatch(toggleTab('graphs')),
                    // },
                    {
                        name: 'Settings',
                        icon: 'cog',
                        type: 'entypo',
                        action: () => this.props.dispatch(toggleTab('goals')),
                        // When we have more setting windows, use this below.
                        // action: () => this.props.dispatch(toggleTab('settings')),
                    },
                    // {
                    //     name: 'Workouts',
                    //     icon: 'fitness-center',
                    //     type: 'MaterialIcons',
                    //     action: () => this.props.dispatch(toggleMode('workouts')),
                    // },
                    ],
                workouts: [
                    {
                        name: 'Home',
                        icon: 'home',
                        type: 'font-awesome',
                        action: () => this.props.dispatch(toggleTab('home')),
                    },
                    {
                        name: 'Exercises',
                        icon: 'fitness-center',
                        type: 'MaterialIcons',
                        action: () => this.props.dispatch(toggleTab('exercises')),
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
                        action: () => this.props.dispatch(toggleTab('goals')),
                        // When we have more setting windows, use this below.
                        // action: () => this.props.dispatch(toggleTab('settings')),
                    },
                    {
                        name: 'Macros',
                        icon: 'food-apple',
                        type: 'material-community',
                        action: () => this.props.dispatch(toggleMode('macros')),
                    },
                ]
            },
        }
    }

    renderItems() {
        const { mode } = this.props;
        let items = this.state.items.macros;
        if (mode === 'workouts') items = this.state.items.workouts;
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
        const { mode, data } = this.props;
        const { items } = this.state;
        if (!data) return <View style={[styles.main, {backgroundColor: globalStyles.menuColor.macros, width: '100%'}]}></View>
        return (
            <View style={[styles.main, mode === 'macros' ? {backgroundColor: globalStyles.menuColor.macros} : {backgroundColor: globalStyles.menuColor.workouts}]}>
                {this.renderItems()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main: {
        height: '11%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: globalStyles.menuColor.macros,
        bottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    }, 
    item: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        // width: '20%',
        width: '25%',
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
      mode: state.appState.mode,
      data: state.dataReducer.data,
  }
}

export default connect(mapStateToProps)(Footer);