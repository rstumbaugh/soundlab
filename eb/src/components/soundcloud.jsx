import React from 'react';
import PropTypes from 'prop-types';
import SoundcloudWidget from 'soundcloud-widget';

const propTypes = {
  trackId: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  width: PropTypes.string
};

class SoundCloud extends React.Component {
  componentDidMount() {
    const widget = new SoundcloudWidget('trackPlayer');
    widget.on(SoundcloudWidget.events.FINISH, () => {
      this.props.onFinish();
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.trackId !== this.props.trackId;
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
              '&amp;auto_play=true' +
              '&amp;hide_related=true' +
              '&amp;show_comments=false' +
              '&amp;show_user=true' +
              '&amp;show_reposts=false' +
              '&amp;show_teaser=false' +
              '&amp;visual=true'}
          title='Song'
          width={this.props.width || '100%'}
          height='300'
          scrolling='no'
          frameBorder='no'
        />
      </div>
    );
  }
}

SoundCloud.propTypes = propTypes;

export default SoundCloud;
