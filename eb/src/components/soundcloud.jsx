import React from 'react';
import PropTypes from 'prop-types';
import SoundcloudWidget from 'soundcloud-widget';

const propTypes = {
  trackId: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired
};

class SoundCloud extends React.Component {
  componentDidMount() {
    const widget = new SoundcloudWidget('trackPlayer');
    widget.on(SoundcloudWidget.events.FINISH, () => {
      this.props.onFinish();
    });
  }

  render() {
    return (
      <div className='soundcloud-widget-wrapper'>
        <iframe
          id='trackPlayer'
          src={
            'https://w.soundcloud.com/player/' +
              `?url=https%3A//api.soundcloud.com/tracks/${this.props.trackId}` +
              '&amp;color=%23ff5500' +
              '&amp;auto_play=false' +
              '&amp;hide_related=true' +
              '&amp;show_comments=false' +
              '&amp;show_user=true' +
              '&amp;show_reposts=false' +
              '&amp;show_teaser=false'}
          title='Song'
          width='100%'
          height='166'
          scrolling='no'
          frameBorder='no'
        />
      </div>
    );
  }
}

SoundCloud.propTypes = propTypes;

export default SoundCloud;
