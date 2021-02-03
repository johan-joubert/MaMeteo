import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import WeatherItem from './WeatherItem'
import {getWeatherFromOPMWithSearch} from '../API/OWMApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            forecast: null,
        }
        this.searchedText = ""
    }

    _loadWeather() {
            getWeatherFromOPMWithSearch(this.searchedText).then(data => {this.setState({forecast: data}, () => console.log(this.state.forecast))})
            
    }
    
    _searchTextInputChanged(text) {
        this.searchedText = text
    }
    

    render() {
        console.log("RENDER")
        return (
            <View style={styles.main_container}>
                <TextInput placeholder='Ville' onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} />
                <Button color="red" title='Rechercher' onPress={() => this._loadWeather()} />
                <ListItem
                    data={this.state.forecast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <WeatherItem forecast={item}/>}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 50,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search