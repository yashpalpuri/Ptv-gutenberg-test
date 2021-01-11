/**
 * External dependencies.
 */
import React from 'react'

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { select, dispatch, withDispatch, withSelect } = wp.data;
const { ToggleControl,Disabled } = wp.components;

/**
 * Advertisements toggle component.
 *
 * @since 1.0.0
 */
class AdToggleField extends React.Component {

    constructor() {
        super()
        this.state = {
            on_off: select('core/editor').getEditedPostAttribute('meta')['advertisements_toggle'],
        };
        this.toggleOnOff = this.toggleOnOff.bind(this);
    }
    toggleOnOff(value) {
        this.setState({ on_off: value.toString() });
        dispatch('core/editor').editPost({ meta: { advertisements_toggle: value.toString() } });
    }


    render() {
        var { on_off } = this.state;
        var boolean_on_off = (on_off === 'true');
        
        if (this.props.isUpdating)
            return (
                <div className="field-wrapper">
                    <Disabled>
                        <ToggleControl
                        label={__("Advertisements", "advertisingsettings")}
                        checked={boolean_on_off}
                        onChange={this.toggleOnOff}
                    />
                    </Disabled>
                </div>
            )
        else
            return (
                <div className="field-wrapper">
                    <ToggleControl
                        label={__("Advertisements", "advertisingsettings")}
                        checked={boolean_on_off}
                        onChange={this.toggleOnOff}
                    />
                </div>
            )
    }
}

export default compose([
    withDispatch((dispatch, props) => {
        return {
            setMetaFieldValue: function (value) {
                dispatch('core/editor').editPost({ meta: { advertisements_toggle: value } });
            }
        }
    }),
    withSelect((select, props) => {
        return {
            metaFieldValue: select('core/editor').getEditedPostAttribute('meta')['advertisements_toggle'],
            isUpdating: wp.data.select('core/editor').isSavingPost(),
        };
    }),
])(AdToggleField);