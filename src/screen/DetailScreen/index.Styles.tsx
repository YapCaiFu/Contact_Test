import { StyleSheet } from 'react-native';

const useStyles = () =>
    StyleSheet.create({
        divider: {
            marginHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
        },
        overallContainer: {
            flex: 1,
            backgroundColor: 'white',
        },
        listDetailContainer: {
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: "center",
        },
        listDetailTitleContainer: {
            flex: 0.3
        },
        listDetailTitle: {
            color: 'black'
        },
        listDetailInputContainer: {
            flex: 0.7,
            padding: 7,
        },
        listDetailInput: {
            color: 'black',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            padding: 5,
        },
        invalidListDetailInput: {
            color: "red"
        },
        sectionHeaderTitle: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: 'black',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        listHeaderTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 150
        },
        listHeadetTitleInnerContainer: {
            backgroundColor: '#ff8c00',
            borderRadius: 50,
            width: 100,
            height: 100
        }
    })

export default useStyles;
