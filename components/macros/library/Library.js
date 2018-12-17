import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import globalStyles from '../../../globalStyles';
import LibraryItem from './LibraryItem';
import { toggleTab } from '../../../actions/appState';

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
    }
    
    render() {
        const { library } = this.props;
        const { searchQuery } = this.state;
        const filteredItems = library.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => moment(a.date).format('x') > moment(b.date).format('x'));
        const listItems = filteredItems.map((item, index) => <LibraryItem key={index} item={item}/>);

        return (
            <View style={styles.main}>
                <View style={styles.controls}>
                    <TextInput placeholder='Search' style={styles.search} value={searchQuery} onChangeText={(searchQuery) => this.setState({searchQuery})}/>
                    <TouchableOpacity onPress={() => this.props.dispatch(toggleTab('newItem'))}>
                        <Text style={styles.newItem}>New Item</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.list}>
                    {listItems}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    main: {
        height: '128.5%',
    },
    newItem: {
        fontSize: 18,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        backgroundColor: globalStyles.colors.two,
        padding: 7.5
    },
    controls: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    search: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: globalStyles.color,
        width: 200,
        padding: 7.5,
    },
    list: {
        marginTop: 20,
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        library: state.dataReducer.data.library
    }
}

export default connect(mapStateToProps)(Library);