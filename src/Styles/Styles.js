import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    loaderWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#FC3F00'
    },

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    listHeaderText: {
        backgroundColor: '#FC3F00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 50
    },

    header: {
        height: 75,
        backgroundColor: '#FC3F00',
        justifyContent: 'center',
        borderBottomRightRadius: 25
    },

    navbar: {
        margin: 15,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    navbarText: {
        margin: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FC3F00'
    },

    navbarTextActive: {
        margin: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color:'white',
        backgroundColor: '#FC3F00',
        fontSize: 16,
        borderRadius: 50
    },

    navbarItem: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    navbarItemText: {
        marginHorizontal: 10,
        fontSize: 13,
        color: '#646363',
        marginHorizontal: 10
    },

    paginationActive: {
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: '#FC3F00', 
        marginHorizontal:3, 
        borderRadius: 50, 
        fontWeight: 'bold', 
        color: 'white'
    },

    pagination: {
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: 'white', 
        marginHorizontal:3, 
        borderRadius: 50, 
        fontWeight: 'bold', 
        color: '#FC3F00'
    },

    popularPlaylistContainer: {
        width: 150,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginRight: 10,
        elevation: 1,
        backgroundColor: 'white'
    },

    popularPlaylistImage: {
        width: 150,
        height: 100,
        borderTopLeftRadius: 25,
        marginBottom: 5
    },

    popularPlaylistTextName: {
        color: '#FC3F00',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginBottom: 7
    },

    popularPlaylistText: {
        color: '#646363',
        marginHorizontal: 5,
        fontSize: 12
    },

    popularPlaylistTextContainer: {
        padding: 5,
        marginBottom: 5
    },

    popularPlaylistItemContainer: {
        flexDirection: 'row',
        padding: 15
    },

    containerPlaylist: {
        padding: 10
    },

    wrapPlaylist: {
        flexDirection: 'column',
        padding: 15
    },

    playlistItem : {
        borderRadius: 10,
        marginBottom: 20,
        elevation: 1,
        backgroundColor: 'white'
    }
})