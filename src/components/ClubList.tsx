import { View } from '@ant-design/react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Image, StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import queryClient from '../api/queryClient';
import colors from '../assets/colors/colors';
import { queryKeys } from '../constants/key';
import { useGetClubList } from '../hooks/useClub';
import { ClubGetRes } from '../types/club/response/ClubGetRes';
import CustomLoader from './Loader';

type SettingEntryProps = {
	handlePressClubDetailScreen: (club: ClubGetRes) => void;
	handlePressWebView: (clubId: string) => void;
};

const ClubList: React.FC<SettingEntryProps> = ({ handlePressClubDetailScreen, handlePressWebView }) => {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { data: clubList, isLoading: clubListIsLoading } = useGetClubList();
	// MockData
	const images = [
		require('../assets/welcom.png'),
		require('../assets/withdrawal.png'),
		require('../assets/deposit.png'),
		require('../assets/deposit.png'),
	];

	const handleRefresh = async () => {
		try {
			setIsRefreshing(true);
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.CLUB, queryKeys.GET_CLUBLIST],
			});
		} catch (error) {
			console.error('Error refreshing club list:', error);
		} finally {
			setIsRefreshing(false);
		}
	};
	if (clubListIsLoading) {
		return <CustomLoader />;
	}
	return (
		<ScrollView
			style={styles.scrollContrainer}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={handleRefresh}
				/>
			}
		>
			{clubList?.clubGetListDto.map((club: ClubGetRes) => (
				<TouchableOpacity
					key={club.clubId}
					onPress={() => handlePressWebView(club.clubId)}
				>
					<View style={styles.clubContainer}>
						<View style={styles.clubInfo}>
							<View style={styles.clubNameDescription}>
								<Text style={styles.clubName} numberOfLines={1}>{club.name}</Text>
								<Text style={styles.clubDescription} numberOfLines={1}>{club.description}</Text>
							</View>
							{/* 회원 정보 API수정 후 프로필 이미지 받아오기 */}
							<View style={styles.clubMembersProfiles}>
								{images.map((img, index) => (
									index < 3 && (
										<Image
											key={index}
											source={img}
											style={styles.profileImage}
										/>
									)
								))}
								{images.length > 3 && (
									<View style={[styles.profileImage, { backgroundColor: colors.Gray300, justifyContent: 'center', alignItems: 'center' }]}>
										<Text style={{ fontSize: 12, color: colors.Black }}>+{4 - 3}</Text>
									</View>
								)}
							</View>
						</View>
						<View style={styles.clubComplex}>
							<View style={styles.clubDetailButton}>
								<TouchableOpacity
									style={styles.detailButton}
									onPress={() => handlePressClubDetailScreen(club)}
								>
									<AntDesign name="arrowright" style={styles.detailIcon} />
								</TouchableOpacity>
							</View>
							<View style={styles.clubBalanceText}>
								<Text style={styles.balanceText} numberOfLines={1}>
									{new Intl.NumberFormat('ko-KR').format(club.balance)}원
								</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContrainer: {

	},
	clubContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
		borderRadius: 10,
		marginBottom: 15,
		height: 127,
		backgroundColor: colors.Gray100,
	},
	clubInfo: {
		flex: 0.5,
		justifyContent: 'space-between',
		alignContent: 'flex-start',
	},
	clubNameDescription: {

	},
	clubName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.Black,
	},
	clubDescription: {
		fontSize: 13,
		color: colors.Black,
		marginTop: 2,
	},
	clubMembersProfiles: {
		flexDirection: 'row',
	},
	profileImage: {
		width: 28,
		height: 28,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: colors.White,
		marginRight: -7,
	},
	clubComplex: {
		flex: 0.5,
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: 5,
	},
	clubDetailButton: {

	},
	detailButton: {
		padding: 8,
		backgroundColor: colors.White,
		borderRadius: 20,
	},
	detailIcon: {
		fontSize: 20,
		color: colors.Black,
	},
	clubBalanceText: {
	},
	balanceText: {
		fontSize: 17,
		fontWeight: '600',
		color: colors.Black,
	},
});

export default ClubList;