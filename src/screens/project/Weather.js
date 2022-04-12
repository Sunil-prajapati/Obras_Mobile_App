import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "~/constants/Colors";
import { Fonts } from "~/constants/Fonts";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import sunImg from "~/assets/icons/sun.png";
import weatherBg from "~/assets/images/home/weatherBg.png";
import { ForceTouchGestureHandler } from "react-native-gesture-handler";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default Weather = ({ route }) => {
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  useEffect(() => {
    const API_KEY = "ca6356c3595842dabbce7a258f6f6744";
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=weekly&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        setWeeklyWeather(json.daily);
      });
  }, []);
  const { otherParam } = route.params;
  const { WeatherIcon, currentCity, temparture, weatherType } = otherParam;
  const insets = useSafeAreaInsets();
  const style = styles(insets);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Text style={style.weatherText}>{"Weather"}</Text>
      </View>
      <View style={style.address}>
        <Text style={style.city}>{currentCity}</Text>
      </View>
      <View style={style.temperatureContainer}>
        <Text style={style.temperature}>{temparture}</Text>
        <View style={style.iconContainer}>
          <Image
            style={style.icon}
            source={{
              uri: `http://openweathermap.org/img/w/${WeatherIcon}.png`,
            }}
          />
          <Text style={style.type}>{weatherType}</Text>
        </View>
      </View>
      <View style={style.bgContainer}>
        <Image style={style.bottomImage} source={weatherBg} />
      </View>
      <View style={style.timeIntervalContainer}>
        <View style={style.dayContainer}>
          <Text style={style.time}>{"Weekly"}</Text>
        </View>
        <Text style={style.time}>{"Daily"}</Text>
        <Text style={style.time}>{"Hourly"}</Text>
      </View>
      <View style={style.mainContainer}>
        {weeklyWeather.map((weatherDetail, index) => {
          let tempCelsius = weatherDetail.temp.day - 273;
          let Fahrenheit = (tempCelsius * 9) / 5 + 32;
          return (
            <View style={style.weekContainer} key={index}>
              <Text style={style.day}>
                {moment.unix(weatherDetail.dt).format("dddd").substring(0, 3)}
              </Text>
              {weatherDetail.weather?.map(icons => {
                const { icon } = icons;
                return (
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/w/${icon}.png`,
                    }}
                    style={style.tempImg}
                  />
                );
              })}

              <Text style={style.temp}>
                {Fahrenheit.toString().substr(0, 2)}°F
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
    },
    header: {
      backgroundColor: Colors.primary.blue,
      height: height * 0.06,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    weatherText: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0.4,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    address: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: "2%",
    },
    city: {
      fontSize: 20,
      lineHeight: 38,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.medium,
    },
    temperatureContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: "2%",
    },
    temperature: {
      fontSize: 75,
      lineHeight: 88,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.medium,
    },
    iconContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    type: {
      fontSize: 20,
      lineHeight: 23,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.medium,
      marginTop: 10,
    },
    icon: {
      width: width * 0.09,
      height: height * 0.04,
    },
    tempImg: {
      marginLeft: "3%",
      width: width * 0.05,
      height: height * 0.05,
    },
    bgContainer: {
      marginTop: "5%",
      alignItems: "center",
    },
    bottomImage: {
      resizeMode: "contain",
    },
    timeIntervalContainer: {
      flexDirection: "row",
      backgroundColor: Colors.primary.lightBackground,
      borderRadius: 5,
      marginHorizontal: "4.27%",
      height: height * 0.04,
      marginVertical: "3%",
      alignItems: "center",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dayContainer: {
      borderRadius: 4,
      backgroundColor: Colors.primary.white,
      marginLeft: 7,
    },
    time: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.medium,
      paddingHorizontal: "8%",
      paddingVertical: "1%",
    },
    weekContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: "7%",
      height: height * 0.16,
    },
    day: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.medium,
    },
    temp: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    mainContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "4.27%",
    },
  });
