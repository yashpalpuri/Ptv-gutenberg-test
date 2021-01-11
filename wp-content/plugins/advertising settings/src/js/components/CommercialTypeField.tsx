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
const { RadioControl,Disabled } = wp.components;

/**
 * Commercial content type input component.
 *
 * @since 1.0.0
 */
class CommercialTypeField extends React.Component {

    constructor(props) {
        super(props)
        var type_meta = select('core/editor').getEditedPostAttribute('meta')['commercial_content_type'];
        type_meta = type_meta ? type_meta : 'none';
        this.state = {
            content_type: type_meta,
        };
        this.changeType = this.changeType.bind(this);
    }

    changeType(type) {
        this.setState({ content_type: type });
        dispatch('core/editor').editPost({ meta: { commercial_content_type: type } });
    }

    render() {
        var { children } = this.props;
        const { content_type } = this.state;

        if (this.props.isUpdating)
            return (
                <div className="field-wrapper">
                    <Disabled>
                        <RadioControl
                            label={__("Commercial content type", "advertisingsettings")}
                            selected={this.props.metaFieldValue ? this.props.metaFieldValue : 'none'}
                            options={[
                                { label: 'None', value: 'none' },
                                { label: 'Sponsored content', value: 'sponsored content' },
                                { label: 'Partnered content', value: 'partnered content' },
                                { label: 'Brought to you by', value: 'brought to you by' },
                            ]}
                            onChange={this.changeType}
                        />
                        {content_type != 'none' && (
                            <div>
                                {children}
                            </div>
                        )}
                    </Disabled>
                </div>

            )
        else
            return (
                <div className="field-wrapper">
                    <RadioControl
                        label={__("Commercial content type", "advertisingsettings")}
                        selected={this.props.metaFieldValue ? this.props.metaFieldValue : 'none'}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Sponsored content', value: 'sponsored content' },
                            { label: 'Partnered content', value: 'partnered content' },
                            { label: 'Brought to you by', value: 'brought to you by' },
                        ]}
                        onChange={this.changeType}
                    />
                    { content_type != 'none' && (
                        <div>
                            {children}
                        </div>
                    )}
                </div>
            )
    }
}

export default compose([
    withDispatch((dispatch, props) => {
        return {
            setMetaFieldValue: function (value) {
                dispatch('core/editor').editPost({ meta: { commercial_content_type: value } });
            }
        }
    }),
    withSelect((select, props) => {
        return {
            metaFieldValue: select('core/editor').getEditedPostAttribute('meta')['commercial_content_type'],
            isUpdating: wp.data.select('core/editor').isSavingPost(),
        };
    }),

])(CommercialTypeField);