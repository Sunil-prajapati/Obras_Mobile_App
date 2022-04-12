import React, { useEffect, useState } from "react";
import { Colors } from "~/constants/Colors";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
export default WeatherApi = props => {
  const navigation = useNavigation();
  const [WeatherIcon, setWeatherIcon] = useState([]);
  const [temparture, setTemperature] = useState([]);
  const [weatherType, setWeatherType] = useState([]);
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const currentCity = props.city;

  useEffect(() => {
    const API_KEY = "ca6356c3595842dabbce7a258f6f6744";
    // const subscribe =
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}`
    )
      .then(resp => resp.json())
      .then(json => {
        setWeatherIcon(json.weather[0].icon);
        setWeatherType(json.weather[0].description);
        let tempCelsius = json.main.temp - 273;
        let Fahrenheit = (tempCelsius * 9) / 5 + 32;
        setTemperature(Fahrenheit.toString().substr(0, 2));
      })
      .catch(err => alert(err));
    // return () => subscribe();
  }, []);
  return (
    <View style={style.contOfTemp}>
      <TouchableOpacity
        style={style.temperatureContainer}
        onPress={() =>
          navigation.navigate("Weather", {
            otherParam: { WeatherIcon, temparture, currentCity, weatherType },
          })
        }
      >
        <Text style={style.title}>{temparture} °F</Text>
      </TouchableOpacity>
      <Image
        source={{
          uri: `http://openweathermap.org/img/w/${WeatherIcon}.png`,
        }}
        style={style.tempImg}
      />
    </View>
  );
};

const styles = insets =>
  StyleSheet.create({
    contOfTemp: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },

    title: {
      fontSize: 24,
      textAlign: "center",
      color: Colors.primary.heading,
      backgroundColor: "transparent",
      lineHeight: 32,
      paddingLeft: 10,
    },

    temperatureContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    tempImg: {
      marginLeft: "3%",
      width: width * 0.05,
      height: height * 0.05,
    },
  });
