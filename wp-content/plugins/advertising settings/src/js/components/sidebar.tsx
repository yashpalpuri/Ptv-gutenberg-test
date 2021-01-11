/**
 * External dependencies.
 */
import React from 'react'

/**
 * Local dependencies.
 */
import AdToggleField from './AdToggleField';
import CommercialTypeField from './CommercialTypeField';
import AdNameField from './AdNameField';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;

/**
 * Advertisements sidebar component for the gutenberg editor.
 *
 * @since 1.0.0
 */
const Sidebar = () => {
        return (
            <Fragment>
                <PluginSidebarMoreMenuItem target="advertisingsettings-sidebar" icon='awards'>
                    {__("Advertising Settings", "advertisingsettings")}
                </PluginSidebarMoreMenuItem>

                <PluginSidebar name="advertisingsettings-sidebar" title={__("Advertising Settings", "advertisingsettings")} >
                    <div className="advertisement-sidebar-content">
                        <AdToggleField />
                        <CommercialTypeField>
                        <AdNameField />
                        </CommercialTypeField>
                    </div>
                </PluginSidebar>
            </Fragment>
        )
    }

export default Sidebar
