import React, { Component } from 'react';
import { Modal, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, Alert } from 'react-native';


class ModalForAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: props.title,
      selectField: props.selectField,
      id: props.id,
      selectedItemId: 0,
      callback: props.callback,
    }
  }


  _onPress(account) {
    this.setState({ title: account.title, selectedItemId: account.id });
    this.setModalVisible(!this.state.modalVisible);
    if (this.state.callback)
      this.state.callback({ title: this.state.title, id: this.state.id, selectField: this.state.selectField });
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
        >
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
          {this.state.selectField == 'Справа' ?
            <Text style={styles.selected_2}
              >Перевод</Text>
            : <Text style={styles.selected}>{this.state.title}</Text>}

          {/* <Text style={styles.selected}>Перевод</Text>*/}
        </TouchableOpacity>
      </View>
    );
  }
}

const DATA = [
  {
    id: 1,
    title: 'Наличные',
  },
  {
    id: 2,
    title: 'Тинькофф',
  },
  {
    id: 3,
    title: 'Тинькофф Бизнес',
  },
  {
    id: 4,
    title: 'Сбербанк',
  },
  {
    id: 5,
    title: 'Яндекс.Деньги',
  },
  {
    id: 6,
    title: 'Альфа Банк',
  },

];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  miniContainer: {

  },

  title: {
    fontSize: 16,

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
    paddingLeft: 5

  },
  selected_2: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'dodgerblue',
    paddingTop: 5,
    paddingLeft: 25


  },
  groupModal: {
    width: 180,
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  subItemText: {
    fontSize: 16,
  },
  checkbox: {
    paddingRight: 0,
  },
  closerContainer: {
    paddingTop: 20,
    paddingRight: 20,
    alignItems: 'flex-end'

  },
  closer: {
    width: 26,
    height: 26,
  },

  buttonText: {
    flexDirection: 'row',


  },
  check: {
    width: 20,
    height: 20
  }


});

export default ModalForAccounts