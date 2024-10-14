import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Form, Picker, Button, Radio, Provider } from '@ant-design/react-native';

import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { useGetClubUserList, useMutateCreateClubUser, useMutateDelegateClubUser } from '../../hooks/useClubUser';
import AntdWithStyleButton from '../../components/AntdWithStyleButton';
import { ScrollView } from 'react-native-gesture-handler';
import { ClubUserDelegateReq } from '../../types/clubUser/request/ClubUserReq';

type ClubUserUpdateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_USER_UPDATE
>;

function ClubUserUpdateScreen({ route, navigation }: ClubUserUpdateScreenProps) {
  const { clubId } = route.params;
  const { data: clubUserList, isLoading, isError } = useGetClubUserList(clubId);
  const delegateClubUser = useMutateDelegateClubUser();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const queryParams = {
      clubId: clubId,
    }
    delegateClubUser.mutate(
      { toIdentifier: values.toIdentifier, queryParams: queryParams },
      {
        onSuccess: navigation.goBack,
        onError: (error) => {
          console.error('Error Delegating:', error,
            error.message, error.name, error.response?.data);
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Form
          form={form}
          name="delegateManagerRole"
          layout="vertical"
          onFinish={onFinish}
          style={styles.form}
        >
          <Form.Item
            name="toIdentifier"
            label="역할 선택"
            rules={[{ required: true, message: '역할을 선택해주세요.' }]}
            style={styles.formItem}
          >
            <Radio.Group>
              <View style={styles.checkboxGroup}>
                <ScrollView style={styles.checkboxSelectGroup}>
                  {clubUserList && clubUserList.clubUserGetResDtoList.map((clubUser) => (
                    <View key={clubUser.clubUserId} style={styles.clubUserItem}>
                      <Radio key={clubUser.clubUserId} value={clubUser.identifier} style={styles.checkbox}>
                        {clubUser.identifier}
                      </Radio>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Radio.Group>
          </Form.Item>
          <AntdWithStyleButton onPress={form.submit}>
            총무 권한 위임
          </AntdWithStyleButton>
        </Form>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  form: {
    backgroundColor: 'white',
  },
  formItem: {
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    paddingHorizontal: 0,
    position: 'relative',
    color: 'black',
  },
  checkboxGroup: {
    borderRadius: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    padding: 7,
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  checkboxSelectGroup: {
    height: 120,
  },
  checkbox: {
    marginVertical: 5,
  },
});

export default ClubUserUpdateScreen;