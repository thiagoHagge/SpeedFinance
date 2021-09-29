import React, { Component } from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styled from 'styled-components';
import { View } from 'react-native';

export class MyCarousel extends Component {

  state = {
    entries: this.props.data,
    activeSlide: 0
  }

    

  get pagination () {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginTop: 10,
          marginBottom: 30
        }}
        dotContainerStyle={{ 
          height: 6,
          marginHorizontal: 3,
          padding: 0,
        }}
        dotStyle={{
            width: 20,
            height: 6,
            borderRadius: 5,
            margin: 0,
            padding: 0,
            // flex: 1,
            backgroundColor: this.props.dotColor
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          margin: 0,
          backgroundColor: '#757482'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  render () {
    return (
      <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', }}>
        <Carousel
          layout={this.props.layout}
          data={this.state.entries}
          renderItem={this.props.renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          sliderWidth={this.props.sliderWidth}
          itemWidth={this.props.itemWidth}
          // containerCustomStyle={this.props.containerCustomStyle}
          // contentContainerCustomStyle={this.props.contentContainerCustomStyle}
          {...this.props}
        />
        { this.pagination }
      </View>
    );
  }
}