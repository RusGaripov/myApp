import React, { Component } from 'react';
import { Modal, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, Alert } from 'react-native';


class ModalExample_2 extends Component {
  state = {
    modalVisible: false,
    flagVisible: false,
    account: 'Перевод',
    checked: false,
    selectedItemId: 0
  }
  _onPress(account) {
    this.setState({ account: account.title });
    this.setState({ selectedItemId: account.id })
    this.setModalVisible(!this.state.modalVisible);
    this.flagVisibility(!this.state.flagVisible);

  }

  flagVisibility() {
    this.setState({
      flagVisible: !this.state.flagVisible
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.listAndCloser}>
            <View style={styles.list}>
              <FlatList
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.groupModal}>
                    <TouchableOpacity
                      onPress={(id) => this._onPress(item, id)}>
                      <View style={styles.subItem}>
                        <Text style={styles.subItemText}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.checkbox}>
                      {
                        item.id == this.state.selectedItemId ? <Image
                          source={require('../assets/image/check.png')} style={styles.check} /> : null}
                    </View>
                  </View>
                )}
              />
            </View>
            <View style={styles.closerContainer} >
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}><Image source={require('../assets/image/closer.png')} style={styles.closer}
                />
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.selected}>{this.state.account}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const DATA = [
  {
    id: 1,
    title: 'Тинькофф',
  },
  {
    id: 2,
    title: 'Тинькофф Бизнес',
  },
  {
    id: 3,
    title: 'Сбербанк',
  },
  {
    id: 4,
    title: 'Яндекс.Деньги',
  },
  {
    id: 5,
    title: 'Альфа Банк',
  }

];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  miniContainer: {

  },

  title: {
    fontSize: 16
  },
  listAndCloser: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  list: {
    paddingTop: 20,
    paddingLeft: 10
  },

  selected: {
    fontSize: 16,
    paddingTop: 15,
    paddingLeft: 5,
    opacity:0.4

  },
  groupModal: {
    width:150,
    flexDirection:'row',
    marginBottom: 30,
    justifyContent:'space-between'
  },
  subItemText: {
    fontSize: 16,
  },
  checkbox: {
    paddingRight: 20,
  },
  closerContainer: {
    paddingTop: 20,
    paddingRight: 20,
    alignItems: 'flex-end'

  },
  closer: {
    width: 26,
    height: 26
  },

  buttonText: {
    flexDirection: 'row',


  },
  check: {
    width: 20,
    height: 20
  }


});

export default ModalExample_2