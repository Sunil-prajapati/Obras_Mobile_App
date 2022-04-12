import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "~/components/Header";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Fonts } from "~/constants/Fonts";
import { ProjectContext } from "../../context/ProjectContext";

const { width, height } = Dimensions.get("window");

export default Schedule = () => {
  const insets = useSafeAreaInsets();
  const projectContext = useContext(ProjectContext);
  const { projects } = projectContext;
  const [calendarclickedDate, setCalendarclickedDate] = useState(moment().format('MMMM Do YYYY'));
  const style = styles(insets);

  const onHandleDate = e => {
    const calendarclickedDate = e;
    setCalendarclickedDate(moment(calendarclickedDate).format("MMMM Do YYYY"));
  };



  useEffect(() => {
    setCalendarclickedDate(moment().add(0, "days").format("MMMM Do YYYY"));
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header name={"Schedule"} />
      <View style={style.sheetContainer}>
        <View style={styles.stripeContainer}>
          <CalendarStrip
            scrollable
            style={{ height: height * 0.14, paddingTop: height * 0.015 }}
            calendarColor={Colors.primary.white}
            calendarHeaderStyle={style.calendarHeaderStyle}
            dateNumberStyle={style.dateNumberStyle}
            dateNameStyle={style.dateNameStyle}
            highlightDateNumberStyle={style.highlightDateNumberStyle}
            highlightDateNameStyle={style.highlightDateNameStyle}
            selectedDate={moment().add(0, "days")}
            iconContainer={{ flex: 0.1 }}
            onDateSelected={e => onHandleDate(e)}
          />
        </View>
        {projects?.map((schedule, index) => {
          const scheduleOrganiseDate = moment(schedule.projectStartDate).format(
            "MMMM Do YYYY"
          );       
          if (calendarclickedDate == scheduleOrganiseDate) {
            return (
              <View style={style.notificationContainer} key={index}>
                <Text style={style.date}>
                  {moment(schedule.projectStartDate).format(
                    "dddd MMMM Do YYYY"
                  )}
                </Text>
                <Text style={style.place}>
                  {schedule.city} {schedule.state} {schedule.address}
                </Text>
                <Text style={style.time}>
                  {moment(schedule.dailyStartTime).format("h:mm a")}{" "}
                  {moment(schedule.dailyEndTime).format("h:mm a")}
                </Text>
              </View>
            );
          } else {
            return null;
          }
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.blue,
      justifyContent: "space-between",
    },
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.background,
    },
    stripeContainer: {
      flex: 1,
    },
    calendarHeaderStyle: {
      color: Colors.primary.heading,
      fontSize: 18,
      lineHeight: 21,
      fontFamily: Fonts.primary.bold,
    },
    dateNumberStyle: {
      color: Colors.primary.secondGray,
      fontSize: 12,
      lineHeight: 14,
      fontFamily: Fonts.primary.medium,
    },
    dateNameStyle: {
      color: Colors.primary.heading,
      fontSize: 12,
      lineHeight: 14,
      fontFamily: Fonts.primary.medium,
      paddingBottom: height * 0.02,
    },
    highlightDateNumberStyle: {
      backgroundColor: Colors.primary.blue,
      color: Colors.primary.white,
      padding: 3,
    },
    highlightDateNameStyle: {
      paddingBottom: height * 0.015,
      color: Colors.primary.heading,
      fontSize: 10,
      lineHeight: 12,
      fontFamily: Fonts.primary.medium,
    },
    notificationContainer: {
      flexDirection: "column",
      backgroundColor: Colors.primary.white,
      marginTop: "4%",
      borderRadius: 5,
      marginHorizontal: "4.17%",
    },
    date: {
      fontSize: 13,
      lineHeight: 15,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      color: Colors.primary.gray,
      fontFamily: Fonts.primary.semiBold,
      marginTop: "2%",
      paddingHorizontal: "3%",
    },
    place: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
      paddingHorizontal: "3%",
    },
    time: {
      fontSize: 12,
      lineHeight: 22,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
      paddingVertical: "1%",
      paddingHorizontal: "3%",
    },
  });
