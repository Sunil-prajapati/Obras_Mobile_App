import React,{useContext} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import mapMark from '~/assets/icons/map_marker.png';
import { Fonts } from '~/constants/Fonts';
import grayMoreImg from '~/assets/icons/GrayMore.png';
import { AuthContext } from '~/context/AuthContext';

const { width, height } = Dimensions.get('window')

const projects = [
    {
        distance: '10 mi away',
        place: 'Washington Place',
        address: '3145 Washington Boston, MA 90000',
        start: ' 4:00am',
        team: " 4 ",
    },
    {
        distance: '10 mi away',
        place: 'Washington Place',
        address: '3145 Washington Boston, MA 90000',
        start: ' 5:00am',
        team: " 2 ",
    },
    {
        distance: '10 mi away',
        place: 'Washington Place',
        address: '3145 Washington Boston, MA 90000',
        start: ' 6:00am',
        team: " 3 ",
    },
    {
        distance: '10 mi away',
        place: 'Washington Place',
        address: '3145 Washington MA 90000',
        start: ' 8:00am',
        team: "7 ",
    },
]

export default Inactive = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const authContext = useContext(AuthContext)
    const { grid } = authContext;

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: height * 0.13}}>
                {grid === true?(
                <> 
                {projects.map((project, index) => {
                    return (
                        <View style={style.boxContainer} key={index}>
                            <View style={style.headerContainer}>
                                <Text style={style.title}>
                                    {"Inactive"}
                                </Text>
                                <Image source={grayMoreImg}/>
                            </View>
                            <View style={style.contentContainer}>
                                <View style={style.upperContainer}>
                                    <Text style={style.distanceText}>
                                        {project.distance}
                                    </Text>
                                    <Text style={style.cityText}>
                                        {project.place}
                                    </Text>
                                    <View style={style.addressLine}>
                                        <Image style={style.mark} source={mapMark} style={{alignSelf:'center',marginRight:3}}/>
                                        <Text style={style.addressText}>
                                            {project.address}
                                        </Text>
                                    </View>
                                </View>

                                <View style={style.lowerContainer}>
                                    <Text style={style.textTime}>
                                        {"Daily Start: " }
                                        <Text style={style.time}>
                                            {project.start}
                                        </Text>
                                    </Text>
                                    <Text style={style.teamText}>
                                        {"Team members "}
                                        <Text style={style.team}>
                                            {project.team}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
                 </>
                ):(
                    <View style={style.condensedBoxContainer}>
                        {projects.map((project, index) => {
                            return (
                            <View style={style.condensedContainer} key={index}>
                                <View style={style.condensedHeaderContainer}>
                                    <Text style={style.title}>
                                        {"Inactive"}
                                    </Text>
                                    <Image source={grayMoreImg} />
                                </View>
                                <View style={style.contentContainer}>
                                    <View style={style.upperContainer}>
                                        <Text style={style.distanceText}>
                                            {project.distance}
                                        </Text>
                                        <Text style={style.cityText}>
                                            {project.place}
                                        </Text>
                                        <View style={style.addressLine}>
                                            <Text style={style.addressText}>
                                                {project.address}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={style.lowerContainer}>
                                        <Text style={style.textTime}>
                                            {"Daily Start: " }
                                            <Text style={style.time}>
                                                {project.start}
                                            </Text>
                                        </Text>
                                        <Text style={style.teamText}>
                                            {"Team members "}
                                            <Text style={style.team}>
                                                {project.team}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            )
                        })}
                    </View> 
                )}
            </ScrollView>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary.background,
        paddingHorizontal: width * 0.05,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: Colors.primary.inputBorderColor,
        justifyContent: 'space-between',
        height: height * 0.05,
        flexDirection: "row",
        paddingHorizontal: 10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    condensedHeaderContainer:{
        alignItems: 'center',
        backgroundColor:Colors.primary.inputBorderColor,
        justifyContent:'space-between',
        paddingVertical:5,
        height:height * 0.025,
        flexDirection:"row",
        paddingHorizontal:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    boxContainer: {
        marginTop: height * 0.02,
    },
    condensedBoxContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent:'space-between',
    },
    condensedContainer: {
        borderRadius: 10,
        marginTop: height * 0.02,
        width: width * 0.4,
    },
    title: {
        fontSize: 14,
        color: Colors.primary.heading,
        backgroundColor: 'transparent',
        lineHeight: 40,
        fontFamily: Fonts.primary.regular,
    },
    distanceText: {
        fontSize: 14,
        lineHeight: 22,
        color: Colors.primary.lightGray,
        fontFamily: Fonts.primary.regular,
    },
    cityText: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.primary.heading,
        fontFamily: Fonts.primary.semiBold,
    },
    addressText: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.primary.lightGray,
        fontFamily: Fonts.primary.regular,
    },
    contentContainer: {
        backgroundColor: Colors.primary.white,
    },
    upperContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.primary.border,
        paddingVertical: 10,
        paddingLeft: 10
    },
    lowerContainer: {
        paddingLeft: 10,
        paddingBottom: height * 0.02,
    },
    textTime: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.primary.heading,
        fontFamily: Fonts.primary.regular,
    },
    time: {
        fontWeight: 'bold',
    },
    teamText: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.primary.heading,
        marginTop: 5,
        fontFamily: Fonts.primary.regular,
    },
    team: {
        fontWeight: 'bold',
    },
    addTeamContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: "7%",
        alignSelf: 'center'
    },
    iconContainer: {
        backgroundColor: Colors.primary.blue,
        width: 25,
        height: 25,
        alignItems: 'center',
        borderRadius: 25 / 2
    },
    plusIcon: {
        fontSize: 18,
        color: Colors.primary.white,
    },
    textContainer: {
        justifyContent: 'center',
    },
    textAdd: {
        paddingHorizontal: 10,
        fontSize: 15,
        lineHeight: 22,
        color: Colors.primary.blue,
        letterSpacing: 0.2
    },
    FileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
    },
    createProject: {
        alignItems: 'center',
    },
    createProjectText: {
        fontSize: 24,
        lineHeight: 28,
        color: Colors.primary.heading,
    },
    button: {
        marginTop: height * 0.025,
        width: width * 0.35,
        alignSelf: "center",
        marginBottom: height * 0.06,
    },
    mark: {
        alignSelf: "center",
    },
    addressLine: {
        flexDirection: 'row',
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})