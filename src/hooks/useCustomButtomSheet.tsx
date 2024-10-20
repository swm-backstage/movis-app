// useCustomBottomSheet.tsx
import React, { useRef, useCallback, useEffect, useState, ReactNode, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface UseCustomBottomSheetProps {
  snapPoints?: (string | number)[];
  contentContainerStyle?: ViewStyle;
}

const useCustomBottomSheet = ({
  snapPoints,
  contentContainerStyle,
}: UseCustomBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openCustomBottomSheet = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeCustomBottomSheet = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsVisible(false);
      }
    },
    []
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  const CustomBottomSheet: React.FC<{ children: ReactNode }> = ({ children }) => (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      overDragResistanceFactor={2.5}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      onDismiss={closeCustomBottomSheet}
    >
      <BottomSheetView style={contentContainerStyle}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );

  return { openCustomBottomSheet, closeCustomBottomSheet, CustomBottomSheet };
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
});

export default useCustomBottomSheet;