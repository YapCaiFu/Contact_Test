import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MutableRefObject, RefObject, createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RootStackParamList } from "../../../App";
import { Pressable, SectionList, Text, TextInput, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@store/index";
import { contactsSelector, selectedContactsSelector } from "@store/contacts/selector";
import { addContact } from "@store/contacts/reducer";
import { uniqueItemId } from "utils/utils";
import useStyles from "./index.Styles";

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailRefList: ContactDetail[] = [
    { label: 'First Name', data: 'firstName', compulsory: true, title: 'Main Information' },
    { label: 'Last Name', data: 'lastName', compulsory: true, title: 'Main Information' },
    { label: 'Email', data: 'email', title: 'Sub Information' },
    { label: 'Phone', data: 'phone', title: 'Sub Information' },
]

const ProfileDetail = DetailRefList.reduce((acc, item) => {
    const section = acc.find((s: ContactDetailSection) => s.title === item.title);
    if (!section) {
        acc.push({ title: item.title, data: [{ label: item.label, data: item.data, compulsory: item.compulsory }] });
    } else {
        section.data.push({ label: item.label, data: item.data, compulsory: item.compulsory });
    }
    return acc;
}, [] as ContactDetailSection[]);

const lastItem = DetailRefList[DetailRefList.length - 1];

export default function DetailScreen() {
    const { params } = useRoute<NavigationProps['route']>();
    const navigation = useNavigation<NavigationProps['navigation']>();
    const selectedContact = useAppSelector(selectedContactsSelector(params?.id ?? ''));
    const [contactData, setContactData] = useState<Contact & { [key: string]: string }>({
        "id": '',
        "firstName": '',
        "lastName": '',
    });
    const inputRefs = useRef<{ [key: string]: RefObject<TextInput> }>(DetailRefList.reduce((acc, input) => {
        acc[input.data] = createRef();
        return acc;
    }, {} as { [key: string]: RefObject<TextInput>; }));
    const [invalidData, setInvalidData] = useState<{ [key: string]: string }>({});
    const dispatch = useAppDispatch();
    const contact = useAppSelector(contactsSelector);
    const styles = useStyles();

    useEffect(() => {
        if (selectedContact) {
            setContactData({ ...selectedContact });
        }
    }, [selectedContact])

    const onSaveData = useCallback(() => {
        let tmpInvalidData = {} as { [key: string]: string }
        let tmpContactData = { ...contactData }
        if (tmpContactData?.firstName?.trim() === '') {
            tmpInvalidData.firstName = 'Please Enter Valid First Name.';
        }
        if (tmpContactData?.lastName?.trim() === '') {
            tmpInvalidData.lastName = 'Please Enter Valid Last Name.';
        }
        if (tmpContactData?.email && contact.find(con => con.id !== tmpContactData?.id && con.email?.trim() === tmpContactData?.email?.trim())) {
            tmpInvalidData.email = 'Existing Email. Please use another email.';
        }
        if (tmpContactData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpContactData?.email)) {
            tmpInvalidData.email = 'Please Enter Valid Email.';
        }
        if (tmpContactData?.phone && contact.find(con => con.id !== tmpContactData?.id && con.phone?.trim() === tmpContactData?.phone?.trim())) {
            tmpInvalidData.phone = 'Existing Phone Number. Please use another Phone Number.';
        }
        if (tmpContactData?.phone && !/^[\d()\s-]+$/.test(tmpContactData?.phone)) {
            tmpInvalidData.phone = 'Please Enter Valid Phone Number.';
        }
        if (Object.keys(tmpInvalidData).length !== 0) {
            return setInvalidData(tmpInvalidData);
        }
        if (!tmpContactData.id) {
            tmpContactData.id = uniqueItemId({ ...tmpContactData, createdDate: new Date() });
        }
        dispatch(addContact(tmpContactData));
        navigation.goBack();
    }, [dispatch, contactData, navigation, contact]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#ff8c00' }}>Cancel</Text>
                </Pressable>
            ),
            headerTitle: '',
            headerRight: () => (
                <Pressable onPress={() => onSaveData()}>
                    <Text style={{ color: '#ff8c00' }}>Save</Text>
                </Pressable>
            ),
        });
    }, [navigation, onSaveData]);

    const focusNextInput = useCallback((key: string) => {
        const currentInput = DetailRefList.findIndex(input => input.data === key);
        if (lastItem?.data !== key) {
            inputRefs.current[DetailRefList[currentInput + 1]?.data].current?.focus();
        }
    }, []);

    const onSetContactData = useCallback((data: string, text: string) => {
        const tmpInvalidData = { ...invalidData };
        if (tmpInvalidData[data]) {
            delete tmpInvalidData[data];
            setInvalidData(tmpInvalidData);
        }
        setContactData(prev => ({ ...prev, [data]: text }))
    }, [invalidData])

    return <View style={styles.overallContainer}>
        <SectionList
            sections={ProfileDetail}
            keyExtractor={(item, index) => item?.label + index}
            ListHeaderComponent={() => <View style={styles.listHeaderTitleContainer}>
                <View style={styles.listHeadetTitleInnerContainer} />
            </View>}
            renderItem={({ item }) => (
                <View style={styles.listDetailContainer}>
                    <View style={styles.listDetailTitleContainer}>
                        <Text style={styles.listDetailTitle}>{item.label}</Text>
                    </View>
                    <View style={styles.listDetailInputContainer}>
                        <TextInput
                            returnKeyType={lastItem?.data !== item.data ? 'next' : 'done'}
                            onSubmitEditing={() => focusNextInput(item.data)}
                            ref={inputRefs.current[item.data]}
                            style={styles.listDetailInput}
                            value={contactData[item.data]}
                            onChangeText={text => onSetContactData(item.data, text)} />
                        {!!invalidData[item.data] && <Text style={styles.invalidListDetailInput} >*{invalidData[item.data]}</Text>}
                    </View>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeaderTitle}>{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
    </View>
}