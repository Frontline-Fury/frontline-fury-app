declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { FlatListProps, ScrollViewProps, ViewStyle } from 'react-native';
  
    interface CarouselProps<T> extends FlatListProps<T> {
      data: T[];
      renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
      sliderWidth: number;
      itemWidth: number;
      firstItem?: number;
      inactiveSlideScale?: number;
      inactiveSlideOpacity?: number;
      loop?: boolean;
      autoplay?: boolean;
      autoplayInterval?: number;
      onSnapToItem?: (index: number) => void;
      containerCustomStyle?: ViewStyle;
      contentContainerCustomStyle?: ViewStyle;
      scrollInterpolator?: (index: number, carouselProps: any) => any;
      slideInterpolatedStyle?: (index: number, animatedValue: any, carouselProps: any) => any;
      enableMomentum?: boolean;
      lockScrollWhileSnapping?: boolean;
    }
  
    export default class Carousel<T> extends Component<CarouselProps<T>> {}
  }
  