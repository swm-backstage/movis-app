import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Form, Picker, Button } from '@ant-design/react-native';

import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { useGetClubUserList } from '../../hooks/useClubUser';

type ClubUserUpdateScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.CLUB_USER_UPDATE
>;

function ClubUserUpdateScreen({ route, navigation }: ClubUserUpdateScreenProps) {
  const { clubId } = route.params;
  const { data: clubUserList, isLoading, isError } = useGetClubUserList(clubId);

  console.log(clubUserList);

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // 특정 함수를 여기에서 실행합니다.
    console.log('선택된 역할:', values.role);
    // TODO: 원하는 함수를 여기에 추가하세요.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={styles.form}
      >
        <Form.Item
          name="role"
          label="역할 선택"
          rules={[{ required: true, message: '역할을 선택해주세요.' }]}
        >
          <Picker
            data={[
              { label: 'role_executive', value: 'role_executive' },
            ]}
            cols={1}
            value={['role_executive']}
          />
        </Form.Item>
        <Button type="primary" onPress={form.submit}>
          확인
        </Button>
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginTop: 20,
  },
});

export default ClubUserUpdateScreen;