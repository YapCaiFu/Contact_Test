import { StyleSheet } from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    navigationRightHeaderBar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    navigationRightHeaderButton: {
      marginLeft: 10
    },
    overallContainer: {
      flex: 1,
      backgroundColor: 'white'
    },
    contactListContainer: {
      paddingHorizontal: 15,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.2)',
    },
    contactOverallContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    contactImageContainer: {
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    contactDefaultImage: {
      backgroundColor: '#ff8c00',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    contactDescriptionContainer: {
      flex: 0.85,
      paddingLeft: 10,
    },
    contactDescriptionTitle: {
      color: 'black',
    },
    contactDescriptionSubTitle: {
      color: 'rgba(0,0,0,0.5)',
    },
    footerOverallContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.2)',
      padding: 15
    },
    footerAllButton: {
      flex: 0.15,
      padding: 5,
      borderColor: '#ff8c00',
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    footerAllButton_Active: {
      backgroundColor: '#ff8c00',
    },
    footerAllText: {
      color: '#ff8c00',
    },
    whiteText: {
      color: 'white',
    },
    footerDeleteButton: {
      flex: 0.15,
      padding: 5,
      borderRadius: 10,
      backgroundColor: '#d11a2a',
      borderColor: '#d11a2a',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerDeleteButton_Active: {
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },

  })

export default useStyles;