import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native'
import { styles } from '../Styles/Styles'
import headerLogo from '../img/brand/white.png'
import Axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BubblesLoader } from 'react-native-indicator'
import Moment from 'moment'
import WebView from 'react-native-webview'

const baseUrlAPI = 'https://vidlearn-api.herokuapp.com'
const urlPlaylist = baseUrlAPI + '/playlist'
const urlCategory = baseUrlAPI + '/categories'
const urlTag = baseUrlAPI + '/tags'
const urlPopularPlaylist = baseUrlAPI + '/playlist?popular'
const urlAPIThumbnail = 'http://vidlearn.rf.gd/images/thumbnail/'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            tags: [],
            headerName: 'SEMUA PLAYLIST',
            playlists: [],
            popularPlaylists: [],
            baseUrl: urlPlaylist,
            urlPagination: [],
            meta: [],
            isCategory: false,
            isClickNav: false,
            isClickPage: 1,
            isTag: false,
            isAll: true,
            isLoading: true,
            isError: false,
            isLoadingPopularPlaylist: true,
            isLoadingPlaylist: true
        }
    }

    getCategories = async () => {
        try {
            const res = await Axios.get(urlCategory)
            this.setState({ categories: res.data.data })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    getTags = async() => {
        try {
            const res = await Axios.get(urlTag)
            this.setState({ tags: res.data.data })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    getPlaylists = async (url) => {
        this.setState({ isLoadingPlaylist: true })

        try {
            const res = await Axios.get(url != '' ? url : urlPlaylist)
            this.setState({ playlists: [] })
            this.setState({ playlists: res.data.data, meta: res.data.meta })

            var urlPaginatinate = []
            var url = this.state.baseUrl == urlPlaylist ? '?' : '&'

            for (let i = 1; i <= res.data.meta.total_pages; i++) {
                urlPaginatinate.push(this.state.baseUrl + url + 'page=' + i)
            }

            this.setState({ urlPagination: [] })
            this.setState({ urlPagination: urlPaginatinate })
            this.setState({ isLoadingPlaylist: false })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    getPopularPlaylists = async () => {
        this.setState({ isLoadingPopularPlaylist: true })

        try {
            const res = await Axios.get(urlPopularPlaylist)
            this.setState({ popularPlaylists: res.data.data })
            this.setState({ isLoadingPopularPlaylist: false })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    getUrlThumbnail = (url) => {
        var urlThumbnail = url.split('/')
        return urlAPIThumbnail + urlThumbnail[5]
    }

    getUrlThumbnailPlaylist = (url) => {
        var urlThumbnail = url.split('/')
        return urlAPIThumbnail + urlThumbnail[5]
    }

    componentDidMount() {
        this.getCategories()
        this.getTags()
        this.getPopularPlaylists()
        this.getPlaylists('')
        
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000);
    }

    render() {
        if (this.state.isError) {
            return (
                <View style={styles.loaderWrap}>
                    <BubblesLoader color='#FC3F00' />
                    <Text style={styles.loaderText}>Terjadi Error Saat Memuat Data</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#e6373d' barStyle='light-content' />
                
                <View style={styles.header}>
                    <Image source={headerLogo} />
                </View>

                { this.state.isLoading ?
                    <View style={styles.loaderWrap}>
                        <BubblesLoader color='#FC3F00' />
                    </View> : 

                    <ScrollView>
                    <View style={styles.navbar}>
                        
                        {/* Main Menu */}
                        <View style={styles.navbarItem}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isAll: true,
                                    isCategory: false,
                                    isTag: false,
                                    isClickNav: false,
                                    headerName: 'SEMUA PLAYLIST',
                                    baseUrl: urlPlaylist
                                })

                                this.getPlaylists('')
                            }}>
                                <Text style={this.state.isAll ? styles.navbarTextActive : styles.navbarText}>SEMUA</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isAll: false,
                                    isCategory: true,
                                    isTag: false
                                })
                            }}>
                                <Text style={this.state.isCategory ? styles.navbarTextActive : styles.navbarText}>KATEGORI</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isAll: false,
                                    isCategory: false,
                                    isTag: true
                                })
                            }}>
                                <Text style={this.state.isTag ? styles.navbarTextActive : styles.navbarText}>TAG</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.navbarItem}>
                            <ScrollView horizontal>
                            
                            {/* Data Categories */}
                            { this.state.isCategory ? this.state.categories.map(item => {
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => {
                                        this.setState({
                                            isClickNav: true,
                                            isClickPage: 1,
                                            headerName: 'KATEGORI ' + item.name,
                                            baseUrl: item.url
                                        })

                                        this.getPlaylists(item.url)
                                    }}>
                                        <Text style={styles.navbarItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }) : <View></View> }

                            {/* Data Tags */}
                            { this.state.isTag ? this.state.tags.map(item => {
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => {
                                        this.setState({
                                            isClickNav: true, 
                                            isClickPage: 1,
                                            headerName: 'TAG ' + item.name,
                                            baseUrl: item.url
                                        })

                                        this.getPlaylists(item.url)
                                    }}>
                                        <Text style={styles.navbarItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }) : <View></View> }
                                
                            </ScrollView>
                        </View>
                    </View>

                    { !this.state.isClickNav ? 
                    <View style={{ padding: 10 }}>
                        <Text style={styles.listHeaderText}>POPULER PLAYLIST</Text>

                        <View style={styles.popularPlaylistItemContainer}>
                        {this.state.isLoadingPopularPlaylist ? 
                            <View style={styles.loaderWrap}>
                                <BubblesLoader color='#FC3F00' dotRadius={5} size={25} />
                            </View> :

                            <ScrollView horizontal>
                            { this.state.popularPlaylists.map(data => {
                                return (
                                    <TouchableOpacity key={data.id} onPress={() => {
                                        this.props.navigation.navigate('PlaylistShow', {
                                        url: data.url
                                        })
                                    }}>
                                        <View style={styles.popularPlaylistContainer}>
                                            <WebView 
                                                source={{uri: this.getUrlThumbnail(data.thumbnail)}} 
                                                style={styles.popularPlaylistImage}
                                            />
                                            
                                            <View style={styles.popularPlaylistTextContainer}>
                                                <Text style={styles.popularPlaylistTextName}>{data.name.length > 10 ? data.name.substr(0, 10) + '...' : data.name}</Text>
                                                <Text style={styles.popularPlaylistText}>{data.author}</Text>
                                                <Text style={styles.popularPlaylistText}>{Moment(data.created_at).format('dddd, DD MMMM YYYY')}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                            </ScrollView> }
                        </View>
                    </View> : <View></View> }

                    <View style={styles.containerPlaylist}>
                        <Text style={styles.listHeaderText}>{this.state.headerName}</Text>

                        <View style={styles.wrapPlaylist}>
                            { this.state.isLoadingPlaylist ? 
                                <View style={styles.loaderWrap}>
                                    <BubblesLoader color='#FC3F00' dotRadius={5} size={25} />
                                </View> :

                                <ScrollView>
                                { this.state.playlists.map(data => {
                                    return (
                                        <TouchableOpacity key={data.id} onPress={() => {
                                            this.props.navigation.navigate('PlaylistShow', {
                                                url: data.url
                                            })
                                        }}>
                                            <View style={styles.playlistItem}>
                                                <View>
                                                    <WebView source={{uri: this.getUrlThumbnailPlaylist(data.thumbnail)}} style={{ height: 175, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginBottom: 5 }} />
                                                    <View style={{position: 'absolute', bottom: -5, left: 20, backgroundColor: '#FC3F00', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, alignItems: 'center'}}>
                                                        <Text style={{fontWeight: 'bold', color: 'white'}}>{Moment(data.created_at).format('DD')}</Text>
                                                        <Text style={{fontWeight: 'bold', color: 'white'}}>{Moment(data.created_at).format('MMM')}</Text>
                                                        <Text style={{fontWeight: 'bold', color: 'white'}}>{Moment(data.created_at).format('Y')}</Text>
                                                    </View>
                                                </View>
                                    
                                                <Text style={{ color: '#FC3F00', fontSize: 16, fontWeight: 'bold', marginHorizontal: 20, marginTop: 10}}>{data.name}</Text>
                                                <Text style={{ color: '#454642', fontSize: 14, marginHorizontal: 20, marginVertical: 10}}>{data.description}</Text>
                                                <View style={{flexDirection: 'row', marginVertical: 10}}>
                                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', paddingHorizontal: 20}}>
                                                        <Icon name="user" size={13} color="#646363" />
                                                        <Text style={{ color: '#646363', marginLeft: 5,fontSize: 11, }}>{data.author}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                                                        <Icon name="calendar" size={13} color="#646363" />
                                                        <Text style={{ color: '#646363', marginLeft: 5,fontSize: 11, }}>{data.created_at_date_format}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}

                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        {this.state.urlPagination.map((item, key) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                            this.setState({isClickPage: key + 1})
                                            this.getPlaylists(item)
                                            }} key={item}>
                                            <Text style={this.state.isClickPage == key + 1 ? styles.paginationActive : styles.pagination}>{key + 1}</Text>
                                            </TouchableOpacity>
                                        )
                                        })}
                                    </View>
                                </ScrollView> }
                            </View>
                        </View>

                    </ScrollView>
                }
            </View>
        )
    }
}

export default Home