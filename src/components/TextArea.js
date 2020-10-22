const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge');

import { withTheme } from './Theme';

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class TextArea extends React.Component {
  static propTypes = {
    elementProps: PropTypes.object,
    elementRef: PropTypes.func,
    rows: PropTypes.number,
    styles: PropTypes.object,
    theme: themeShape,
    valid: PropTypes.bool
  };

  static defaultProps = {
    elementProps: {},
    rows: 5,
    valid: true
  };

  state = {
    focus: false
  };

  _onFocus = () => {
    this.textarea.focus();

    this.setState({
      focus: true
    });
  };

  _onBlur = () => {
    if (this.textarea && this.textarea.blur) { 
      this.textarea.blur();
    }

    this.setState({
      focus: false
    });
  };

  render () {
    const { elementProps, rows } = this.props;
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div
        className='mx-text-area'
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        ref={this.props.elementRef}
        style={Object.assign({}, styles.wrapper, this.state.focus ? styles.active : null)}
        tabIndex={0}
      >
        <textarea
          {...elementProps}
          ref={ref => {
            this.textarea = ref;
          }}
          rows={rows}
          style={styles.textarea}
        />
      </div>
    );
  }

  styles = (theme) => {
    return _merge({}, {
      component: {
        display: 'block'
      },
      wrapper: {
        padding: theme.Spacing.SMALL,
        boxSizing: 'border-box',
        backgroundColor: theme.Colors.WHITE,
        border: this.props.valid ? '1px solid ' + theme.Colors.GRAY_300 : '1px solid ' + theme.Colors.DANGER,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        outline: 'none',
        boxShadow: 'none'
      },
      active: {
        border: '1px solid ' + theme.Colors.PRIMARY
      },
      textarea: {
        flex: '1 0 0%',
        backgroundColor: theme.Colors.WHITE,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(TextArea);
