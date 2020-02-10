import React, { Component } from 'react';
import { Modal, Text, Image, TouchableOpacity, StyleSheet, FlatList, View, Alert } from 'react-native';
import categories from "../data/categories.json"

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      flagVisible: false,
      account: 'Выберите категорию',
      id: props.id,
      checked: false,
      selectedItemId: 0,
      title: props.title,
      callback: props.callback,
      picker: props.picker,
      addItemQuantityPress: props.addItemQuantityPress,
      categories: props.categories,
      //  hey:props.hey

    }
  }

handleAddItemQuantity = (title) => {
  alert(title)
   this.props.addItemQuantityPress(title);
 }


  _onPress(account) {
    this.handleAddItemQuantity(account.title)
    this.setState({ title: account.title, selectedItemId: account.id });
    this.setModalVisible(!this.state.modalVisible);

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <>
       
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
                  data={categories}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.groupModal}>
                     
                      <TouchableOpacity
                        onPress={(id) => this._onPress(item, id)
                        }>
                  
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
            <Text style={styles.selected}>{this.state.title}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}




/*const DATA = [
  {
    id: 1,
    title: 'Машина',
  },
  {
    id: 2,
    title: 'Бензин',
  },
  {
    id: 3,
    title: 'ТО',
  },
  {
    id: 4,
    title: 'Покупки',
  },
  {
    id: 5,
    title: 'Ашан',
  },
  {
    id: 6,
    title: 'Магнит',
  },

];*/

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
    paddingLeft: 3,

  },
  groupModal: {
    width: 150,
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between'
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

export default ModalExample