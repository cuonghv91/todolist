import { ComponentStory, ComponentMeta } from '@storybook/react';
import ControlTab from './index';

export default {
    title: 'ControlTab',
    component: ControlTab,
    displayName: 'ControlTab',
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof ControlTab>;

const Template: ComponentStory<typeof ControlTab> = (args) => <ControlTab {...args} />;

export const Default = Template.bind({});
Default.args = {};
