import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Alert, FlatList, ListRenderItemInfo, Pressable, RefreshControl, Text, TextInput, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import { contactsSelector } from '@store/contacts/selector';
import useStyles from './index.Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteContact, refreshContact } from '@store/contacts/reducer';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const contact = useAppSelector(contactsSelector);
    const styles = useStyles();
    const [onSearch, setOnSearch] = useState(false);
    const searchBarRef = useRef<TextInput>(null);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingList, setEditingList] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onPressCloseSearchButton = () => {
            setOnSearch(false);
            setSearchKeyWord('');
        }
        const onPressCloseEditButton = () => {
            setEditing(false)
            setEditingList([]);
        }
        navigation.setOptions({
            headerLeft: editing ? undefined : onSearch ?
                () => <Pressable onPress={() => onPressCloseSearchButton()}>
                    <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={'#ff8c00'}
                    />
                </Pressable> :
                () => <Pressable onPress={() => setOnSearch(true)}>
                    <Ionicons
                        name="search"
                        size={24}
                        color={'#ff8c00'}
                    />
                </Pressable>,
            headerTitle: editing ? '' : onSearch ?
                () => <TextInput
                    ref={searchBarRef}
                    value={searchKeyWord}
                    placeholder='Search by First Name / Last Name...'
                    placeholderTextColor="black"
                    style={{ color: 'black' }}
                    onChangeText={text => setSearchKeyWord(text)} /> :
                'Contacts',
            headerTitleAlign: onSearch ? 'left' : 'center',
            headerRight: onSearch ? undefined :
                () => editing ? <Pressable onPress={() => onPressCloseEditButton()}>
                    <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={'#ff8c00'}
                    />
                </Pressable> : <View style={styles.navigationRightHeaderBar}>
                    <Pressable onPress={() => setEditing(true)}>
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={24}
                            color={'#ff8c00'}
                        />
                    </Pressable>
                    <Pressable style={styles.navigationRightHeaderButton} onPress={() => navigation.navigate('Detail', {})}>
                        <MaterialCommunityIcons
                            name="plus"
                            size={24}
                            color={'#ff8c00'}
                        />
                    </Pressable>
                </View>,
        });
    }, [navigation, searchKeyWord, onSearch, editing]);

    const contactList = useMemo(() => {
        return contact.filter(val => val.lastName.toUpperCase().includes(searchKeyWord?.trim()?.toUpperCase()) ||
            val.firstName?.toUpperCase().includes(searchKeyWord?.trim()?.toUpperCase()) ||
            val.phone?.toUpperCase().includes(searchKeyWord?.trim()?.toUpperCase()) ||
            val.email?.toUpperCase().includes(searchKeyWord?.trim()?.toUpperCase()))
    }, [searchKeyWord, contact])

    const onRefresh = useCallback(() => {
        if (!editing) {
            setRefreshing(true);
            dispatch(refreshContact());
            setRefreshing(false);
        }
    }, [dispatch, editing])

    const isAllTicked = useMemo(() => {
        return editingList.length === contact.length && editingList.length > 0;
    }, [editingList, contact])

    const onPressAllButton = useCallback(() => {
        if (isAllTicked) {
            setEditingList([]);
        } else {
            setEditingList(contact.map(val => val.id));
        }
    }, [isAllTicked, contact])

    const onPressDeleteContact = useCallback(() => {
        Alert.alert('Deletion', 'Are you sure to delete the selected contact?',
            [
                { text: 'Cancel' },
                {
                    text: 'OK', onPress: () => {
                        setEditing(!editing);
                        dispatch(deleteContact(editingList));
                        setEditingList([]);
                    }
                },
            ]
        )
    }, [editing, editingList, dispatch])

    const onPressContactDetail = useCallback((id: string) => {
        if (editing) {
            const tmpEditingList = [...editingList]
            const selectedEditItemIndex = tmpEditingList.findIndex(val => val === id)
            if (selectedEditItemIndex != -1) {
                tmpEditingList.splice(selectedEditItemIndex, 1);
            } else {
                tmpEditingList.push(id);
            }
            setEditingList(tmpEditingList);
        } else {
            navigation.navigate('Detail', { id })
        }
    }, [editing, editingList, navigation])

    const renderItem = useCallback(({ item }: ListRenderItemInfo<Contact>) => (
        <Pressable onPress={() => onPressContactDetail(item.id)}>
            <View style={styles.contactOverallContainer}>
                <View style={styles.contactImageContainer}>
                    <View style={styles.contactDefaultImage} >
                        {editingList.includes(item.id) && <MaterialCommunityIcons
                            name="check"
                            size={24}
                            color={'white'}
                        />}
                    </View>
                </View>
                <View style={styles.contactDescriptionContainer}>
                    <Text style={styles.contactDescriptionTitle}>{`${item.firstName} ${item.lastName}`}</Text>
                    {!!item.email && searchKeyWord.trim().length > 0 && <Text style={styles.contactDescriptionSubTitle}>{`${item.email}`}</Text>}
                    {!!item.phone && searchKeyWord.trim().length > 0 && <Text style={styles.contactDescriptionSubTitle}>{`${item.phone}`}</Text>}
                </View>
            </View>

        </Pressable>
    ), [onPressContactDetail, editingList, searchKeyWord]);

    return (
        <View style={styles.overallContainer}>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.contactListContainer}
                initialNumToRender={15}
                data={contactList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
            {editing && <View style={styles.footerOverallContainer}>
                <Pressable
                    onPress={() => onPressAllButton()}
                    style={[styles.footerAllButton, isAllTicked && styles.footerAllButton_Active]}>
                    <Text style={[styles.footerAllText, isAllTicked && styles.whiteText]}>All</Text>
                </Pressable>
                <Pressable
                    disabled={editingList.length === 0}
                    onPress={() => onPressDeleteContact()}
                    style={[styles.footerDeleteButton, editingList.length === 0 && styles.footerDeleteButton_Active]}>
                    <Text style={styles.whiteText}>Delete</Text>
                </Pressable>
            </View>}
        </View>
    )
}