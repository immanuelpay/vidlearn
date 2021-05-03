import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import headerLogo from '../img/brand/white.png'
import Icon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios'
import { BubblesLoader } from 'react-native-indicator'
import { ScrollView } from 'react-native-gesture-handler'
import WebView from 'react-native-webview'

const urlAPIThumbnail = 'http://vidlearn.rf.gd/images/thumbnail/'
const urlAPIProfile = 'http://vidlearn.rf.gd/images/avatar/'

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            playlist: [],
            videos: [],
            videoShow: [],
            tags: [],
            category: '',
            author: [],
            isLoading: true,
            isLoadingVideo: false,
            isClickVideo: false,
            isError: false
        }
    }

    getPlaylist = async () => {
        this.setState({ isLoading: true })
        try {
            this.setState({ isLoading: true, isError: false })
            const res = await Axios.get(this.props.route.params.url)

            this.setState({
                playlist: res.data.data,
                videos: res.data.data.videos,
                tags: res.data.data.tags,
                category: res.data.data.category.name,
                author: res.data.data.author,
                isError: false,
                isLoading: false,
            })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    clickVideo = (url) => {
        this.setState({ isLoadingVideo: true, isError: false })
        this.showVideo(url)
        this.setState({isClickVideo: true})
    }

    showVideo = async (url) => {
        try {
            this.setState({ isLoadingVideo: true, isError: false })
            const res = await Axios.get(url)
            this.setState({ 
                videoShow: res.data.data,
                isLoadingVideo: false,
                isError: false
            })
        } catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }

    generateSlug = (text) => {
        return text.toString().toLowerCase()
            .replace(/^-+/, '')
            .replace(/-+$/, '')
            .replace(/\s+/g, '-')
            .replace(/\-\-+/g, '-')
            .replace(/[^\w\-]+/g, '');
    }

    getUrlThumbnail = (url) => {
        var urlThumbnail = url.split('/')
        return urlAPIThumbnail + urlThumbnail[5]
    }

    getUrlProfile = (url) => {
        var urlThumbnail = url.split('/')
        return urlAPIProfile + urlThumbnail[5]
    }

    componentDidMount() {
        this.getPlaylist()
    }

    render() {
        if (this.state.isError) {
            return (
                <View style={{
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                    <BubblesLoader color='#FC3F00' />
                    <Text style={{
                        fontSize: 12, 
                        fontWeight: 'bold', 
                        marginTop: 10, 
                        color: '#FC3F00'
                    }}>Terjadi Error Saat Memuat Data</Text>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{
                    height: 75,
                    backgroundColor: '#FC3F00',
                    justifyContent: 'center',
                    borderBottomRightRadius: 25
                    }}>

                    <Image source={headerLogo} />
                    
                </View>

                {this.state.isLoading ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <BubblesLoader color='#FC3F00' />
                </View> :

                <ScrollView>
                    <View style={{
                        flexDirection: 'row', 
                        padding: 10, 
                        alignItems: 'center'
                    }}>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <View style={{width: 35, height: 35, backgroundColor: '#ffffff', marginHorizontal:3, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: '#FC3F00', borderWidth: 1}}>
                                <Icon name="chevron-left" size={10} color="#FC3F00" />
                            </View>
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal: 5, marginHorizontal: 5, fontSize: 18, fontWeight: 'bold', color: '#FC3F00'}}>{this.state.playlist.name}</Text>
                    </View>

                    <View style={{flex: 1, marginHorizontal: 15, borderRadius: 10, marginBottom: 7, elevation: 1, backgroundColor: 'white'}}>
                        {this.state.isLoadingVideo ? 
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 15}}>
                                <BubblesLoader color='#FC3F00' dotRadius={5} size={25} />
                            </View> : 
                            <View>
                                {this.state.isClickVideo ? 
                                <WebView
                                    source={{uri: this.state.videoShow.link_watch}}
                                    style={{height: 225, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                /> : 
                                <WebView source={{uri: this.getUrlThumbnail(this.state.playlist.thumbnail)}} style={{height: 225, borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                                }
                            </View>
                        }

                        <View style={{padding: 15}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#FC3F00',}}>{this.state.playlist.name} {this.state.isClickVideo && !this.state.isLoadingVideo ? '- ' + this.state.videoShow.title : ''}</Text>
                            
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                                    <Icon name="user" size={13} color="#646363" />
                                    <Text style={{ color: '#646363', marginLeft: 5,fontSize: 11, }}>{this.state.author.name}</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', paddingHorizontal: 20}}>
                                    <Icon name="calendar" size={13} color="#646363" />
                                    <Text style={{ color: '#646363', marginLeft: 5,fontSize: 11, }}>{this.state.playlist.created_at_date_format}</Text>
                                </View>
                            </View>

                            <Text style={{fontSize: 14, marginVertical: 10, color: '#454642',}}>{this.state.playlist.description}</Text>
                            {this.state.isClickVideo ? 
                                <View>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 5, color: '#454642',}}>Deskripsi Video</Text>
                                    <Text style={{fontSize: 14, marginBottom: 10, color: '#454642',}}>{this.state.videoShow.description}</Text>
                                </View>
                            : <View></View>}
                            <Text style={{fontSize: 14, fontWeight: 'bold', marginVertical: 5, color: '#454642',}}>Daftar Video</Text>
                            
                            {this.state.videos.map(item => {
                                return <TouchableOpacity key={item.name} onPress={() => {
                                    this.clickVideo(item.url)
                                }}>
                                    <Text key={item.name} style={{
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    marginVertical: 5, 
                                    paddingHorizontal: 13, 
                                    paddingVertical: 5, 
                                    color: '#fea077', 
                                    borderLeftWidth: 2, 
                                    borderColor: '#454642', 
                                    backgroundColor: '#f9f9ff'
                                }}>{item.name}</Text>
                                </TouchableOpacity>
                            })}

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', marginVertical: 5, color: '#454642',}}>Tag: </Text>
                                <View>
                                    {this.state.tags.map(item => {
                                    return <Text key={item.name} style={{
                                        fontSize: 14, 
                                        fontWeight: 'bold',
                                        marginVertical: 5,
                                        marginHorizontal: 3,
                                        color: '#fea077',
                                    }}>#{this.generateSlug(item.name)}</Text>
                                })}
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <Text style={{
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    color: '#454642',
                                }}>Kategori: </Text>

                                <Text style={{
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    marginHorizontal: 3,
                                    color: '#fea077', 
                                }}>{this.state.category}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        marginHorizontal: 15, 
                        paddingHorizontal: 15, 
                        paddingVertical: 10,
                        borderRadius: 10, 
                        marginBottom: 20, 
                        elevation: 1, 
                        backgroundColor: 'white'}}>
                        
                        
                        <Text style={{fontSize: 13, fontWeight: 'bold', color: '#FC3F00', paddingHorizontal: 10, paddingTop: 10}}>Deskripsi Author</Text>
                        <Text style={{fontSize: 12, color: '#454642', paddingHorizontal: 10, paddingBottom: 10, paddingTop:5}}>{this.state.author.name} adalah {this.state.author.description}</Text>
                    </View>
                
                    {/* <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{
                            backgroundColor: '#341620',
                            padding: 10,
                            fontSize: 12,
                            color: 'white',
                            }}>Copyright ©2021 All rights reserved | By KELOMPOK 5.</Text>
                    </View> */}

                </ScrollView>
                }
                
            </View>
        )
    }
}

export default Playlist;