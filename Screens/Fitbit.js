import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import axios from '../axios/axiosConfig';
import {BarChart, StackedBarChart} from 'react-native-chart-kit';

export default Fitbit = ({logout}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData(setData);
  }, []);
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>Calories</Text>
        {data.calories !== undefined && (
          <BarChart
            data={data.calories}
            width={Dimensions.get('window').width - 20} // from react-native
            height={500}
            verticalLabelRotation={45}
            xLabelsOffset={-15}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1D3354',
              backgroundGradientTo: '#467599',
              decimalPlaces: '0', // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            fromZero
            style={{
              margin: 10,
              borderRadius: 16,
              elevation: 5,
              padding: 5,
            }}
          />
        )}

        <Text style={styles.text}>Steps</Text>
        {data.steps !== undefined && (
          <BarChart
            data={data.steps}
            width={Dimensions.get('window').width - 20} // from react-native
            height={500}
            verticalLabelRotation={45}
            xLabelsOffset={-15}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1D3354',
              backgroundGradientTo: '#467599',
              decimalPlaces: '0', // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            fromZero
            style={{
              margin: 10,
              borderRadius: 16,
              elevation: 5,
              padding: 5,
            }}
          />
        )}

        <Text style={styles.text}>Friends</Text>
        {data.friends &&
          data.friends.map((element) => (
            <Text key={element.key}>{element.name}</Text>
          ))}

        <Text style={styles.text}>Heart Rate</Text>
        {data.heartRate !== undefined && (
          <StackedBarChart
            data={data.heartRate}
            width={Dimensions.get('window').width - 20} // from react-native
            height={500}
            verticalLabelRotation={45}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1D3354',
              backgroundGradientTo: '#467599',
              decimalPlaces: '0', // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            fromZero
            style={{
              margin: 10,
              borderRadius: 16,
              elevation: 5,
              padding: 5,
            }}
          />
        )}

        <Text style={styles.text}>Sleep</Text>
        {data.sleep !== undefined && (
          <BarChart
            data={data.sleep}
            width={Dimensions.get('window').width - 20} // from react-native
            height={500}
            verticalLabelRotation={45}
            xLabelsOffset={-15}
            yAxisSuffix=" min"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1D3354',
              backgroundGradientTo: '#467599',
              decimalPlaces: '0', // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            fromZero
            style={{
              margin: 10,
              borderRadius: 16,
              elevation: 5,
              padding: 5,
            }}
          />
        )}

        <Text style={styles.text}>Profile</Text>
        {data.profile && (
          <View style={styles.mainView}>
            <Image
              source={{uri: data.profile.avatar}}
              style={{height: 100, width: 100}}
            />
            <View style={styles.textView}>
              <Text style={styles.text}>Name: {data.profile.fullName}</Text>
              <Text style={styles.text}>DOB: {data.profile.dateOfBirth}</Text>
              <Text style={styles.text}>Gender: {data.profile.gender}</Text>
              <Text style={styles.text}>Age: {data.profile.age} yr</Text>
              <Text style={styles.text}>Weight: {data.profile.weight} kg</Text>
            </View>
          </View>
        )}

        <Button title="Logout" onPress={logout} />
      </View>
    </ScrollView>
  );
};

const fetchData = async (setData) => {
  try {
    //daily calories
    let res = await axios.get('activities/calories/date/2020-01-12/1w.json');
    console.log('[DailyCalories] data fetched');

    let calories = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    res.data['activities-calories'].forEach((element) => {
      calories.labels.push(element.dateTime);
      calories.datasets[0].data.push(parseInt(element.value));
    });

    //daily steps
    res = await axios.get('activities/steps/date/2020-01-12/1w.json');
    console.log('[DailySteps] data fetched');

    let steps = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    res.data['activities-steps'].forEach((element) => {
      steps.labels.push(element.dateTime);
      steps.datasets[0].data.push(parseInt(element.value));
    });

    // friends
    res = await axios.get('https://api.fitbit.com/1.1/user/-/friends.json');
    // console.log(JSON.stringify(res));
    console.log('[Friends] data fetched');

    let friends = [
      {
        name: 'Friend-example',
        key: '23123',
      },
      ...res.data.data.map((element) => ({
        name: element.attributes.name,
        key: element.id,
      })),
    ];

    //   heart rate
    res = await axios.get('activities/heart/date/2020-01-09/1w.json');
    console.log('[HeartRate] data fetched');

    let heartRate = {
      labels: [],
      legend: ['Out of Range', 'Fat Burn', 'Cardio', 'Peak'],
      data: [],
      barColors: ['lightgrey', 'darkgrey', 'grey', 'black'],
    };

    res.data['activities-heart'].forEach((element) => {
      heartRate.labels.push(element.dateTime);
      heartRate.data.push(
        element.value.heartRateZones.map((ele) =>
          parseInt(ele.caloriesOut || '0'),
        ),
      );
    });

    // sleep
    res = await axios.get(
      'https://api.fitbit.com/1.2/user/-/sleep/date/2020-01-06/2020-01-10.json',
    );
    // console.log(JSON.stringify(res.data));
    console.log('[Sleep] data fetched');

    let sleep = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    res.data['sleep'].forEach((element) => {
      sleep.labels.push(element.dateOfSleep);
      sleep.datasets[0].data.push(parseInt(element.duration) / 60000);
    });

    //profile
    res = await axios.get('profile.json');
    // console.log(JSON.stringify(res));
    console.log('[Profile] data fetched');

    setData({
      profile: res.data.user,
      sleep,
      steps,
      heartRate,
      calories,
      friends,
    });
  } catch (error) {
    console.log('[FetchError]', JSON.stringify(error));
  }
};

const styles = StyleSheet.create({
  mainView: {},
  text: {
    fontSize: 20,
  },
});
