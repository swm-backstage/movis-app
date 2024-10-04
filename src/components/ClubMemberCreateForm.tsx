import { Form, Input, View } from "@ant-design/react-native";
import React from 'react';
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';

const ClubMemberCreateForm: React.FC = ({ }) => {
  return (
    <ScrollView style={styles.formScrollContrainer}>
      <Form.List name="memberList">
        {(fields, { add, remove }) => (
          <View style={styles.formList}>
            {fields.map(({ key, name, ...restField }) => (
              <View key={name} style={styles.formRow}>
                <View style={styles.formInputName}>
                  <Form.Item
                    {...restField}
                    label="이름"
                    name={[name, 'name']}
                    rules={[{ required: true, message: '필수 항목' }]}
                  >
                    <Input type="text" placeholder="이름" style={styles.input} />
                  </Form.Item>
                </View>
                <View style={styles.formInputPhoneNum}>
                  <Form.Item
                    {...restField}
                    label="전화번호"
                    name={[name, 'phoneNo']}
                    rules={[
                      { pattern: /^010-\d{4}-\d{4}$/, message: '전화번호 형식이 옳바르지 않습니다.' },
                      { required: true, message: '필수 항목' }
                    ]}
                  >
                    <Input placeholder="010-1234-5678" style={styles.input} />
                  </Form.Item>
                </View>
                <View style={styles.formBtn}>
                  <AntDesign
                    name="minuscircleo"
                    size={20}
                    color='grey'
                    onPress={() => {
                      remove(name);
                    }}
                    style={styles.UserFormIcon}
                  />
                </View>
              </View>
            ))}
            <Form.Item>
              <View style={styles.addUserFormIconContainer}>
                <AntDesign
                  name="pluscircleo"
                  onPress={() => {
                    add()
                  }}
                  style={styles.UserFormIcon}
                />
              </View>
            </Form.Item>
          </View>
        )}
      </Form.List>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formScrollContrainer: {
    maxHeight: 250,
    paddingBottom: 10,
    marginBottom: 10,
  },
  formList: {

  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  formInputName: {
    width: 120,
    position: 'relative',
    color: 'black',
  },
  formInputPhoneNum: {
    width: 160,
    position: 'relative',
    color: 'black',
  },
  formBtn: {
    position: 'relative',
    marginTop: 30,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    color: 'black',
  },
  addUserFormIconContainer: {
    alignItems: 'center',
  },
  UserFormIcon: {
    color: 'rgba(153, 102, 255, 1)',
    fontSize: 20,
  },
});

export default ClubMemberCreateForm;