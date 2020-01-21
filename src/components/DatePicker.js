import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Modal, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, Alert } from 'react-native';
//import moment from 'moment';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props)
    //this.state = { date: "2020-01-01" }
    this.state = {
      date: new Date()
    }
  }

  render() {
    return (
      <DatePicker
        style={styles.datepicker}
        date={this.state.date}
        mode="datetime"
        showIcon={false}
        placeholder="select date"
        format="DD-MM-YYYY "
        minDate="2019-01-01"
        maxDate="2030-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={
          {
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              paddingTop: 0,
              marginLeft: 0,
              borderWidth: 0,
              borderColor: 'black',
              opacity: 2,
            },
            dateText: {
              fontSize: 16,
              marginTop: -8,
            }
            // ... You can check the source to find the other keys.
          }
        }
        onDateChange={(date) => { this.setState({ date: date }) }}
      />
    )
  }
}

const styles = StyleSheet.create({
  datepicker: {
    width: 150,
    marginTop: 10,
    marginBottom: 0,
    paddingRight: 60,
    marginLeft: 0,
  },
});