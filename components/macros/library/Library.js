import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import globalStyles from '../../../globalStyles';
import LibraryItem from './LibraryItem';
import USDAItem from './usdaItem';
import { toggleTab } from '../../../actions/appState';

const API_KEY;

class Library extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            apiSearchItems: [],
            apiSearchItemsInfo: [],
            failedSearch: false,
            loading: false
        }
        this.timeout;

    }

    search(searchQuery) {
        this.setState({searchQuery, apiSearchItemsInfo: [], failedSearch: false})
        if (searchQuery.length < 2) return null;
        if (this.timeout) clearInterval(this.timeout);
        const database = 'Standard+Reference';
        const searchUrl = `https://api.nal.usda.gov/ndb/search/?format=json&max=25&q=${searchQuery}&ds=${database}&api_key=${API_KEY}`;
        this.timeout = setTimeout(() => {
            this.setState({loading: true})
            fetch(searchUrl, {
                method: "GET",
              }).then((res) => {
                return res.json()
              }).then((result) => {
                if (!Object.keys(result).includes('list')) {
                    this.setState({failedSearch: true, loading: false})
                    return null;
                };
                this.setState({apiSearchItems: result.list.item})
                return result.list.item;
              }).then((items)=> {
                if (!items) return null;
                let urlString = 'https://api.nal.usda.gov/ndb/V2/reports?';
                items.forEach((item) => urlString += `ndbno=${item.ndbno}&`);
                urlString += `type=f&format=json&api_key=${API_KEY}`;
                return fetch(urlString, {
                    method: "GET",
                    }).then((res) => {
                        return res.json();
                    }).then((results) => {
                        this.setState({apiSearchItemsInfo: results.foods, loading: false})
                    }).catch((err) => console.error(err));
              }).catch((err) => console.error(err));
        }, 1500);
    }

    renderSearchItems() {
        const items = this.state.apiSearchItemsInfo;
        if (!items || items.length === 0) {
            return <View/>
        };
        return items.filter((item) => item.food.nutrients[0].measures.length !== 0).map((item) => {
            return (
                <USDAItem key={item.food.desc.ndbno} item={item.food} />
            )
        });
    }
    
    render() {
        const { library } = this.props;
        const { searchQuery, failedSearch, loading } = this.state;
        const filteredItems = library.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => moment(a.date).format('x') > moment(b.date).format('x'));
        const listItems = filteredItems.map((item, index) => <LibraryItem key={index} item={item}/>);
        let renderLoading;
        if (loading) renderLoading = <Text style={styles.loading}>Loading Search Results...</Text>

        return (
            <View style={styles.main}>
                <View style={styles.controls}>
                    <TextInput placeholder='Search' style={styles.search} value={searchQuery} onChangeText={(searchQuery) => this.search(searchQuery)}/>
                    <TouchableOpacity onPress={() => this.props.dispatch(toggleTab('newItem'))}>
                        <Text style={styles.newItem}>New Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.list}>
                    <ScrollView>
                        {listItems}
                        {renderLoading}
                        {failedSearch ? <Text style={styles.loading}>No search results!</Text> : this.renderSearchItems()}
                    </ScrollView>
                </View>
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
        backgroundColor: globalStyles.colors.listIcon,
        color: '#fff',
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
        fontSize: 18,
        width: 200,
        padding: 7.5,
    },
    list: {
        height: '39.5%'
    },
    loading: {
        textAlign: 'center',
        width: '100%'
    }
}

const mapStateToProps = state => {
    return {
        quickAdd: state.appState.quickAdd,
        library: state.dataReducer.data.library
    }
}

export default connect(mapStateToProps)(Library);