import { ComponentStory, ComponentMeta } from '@storybook/react';
import EnterBox from './index';

export default {
    title: 'EnterBox',
    component: EnterBox,
    displayName: 'EnterBox',
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof EnterBox>;

const Template: ComponentStory<typeof EnterBox> = (args) => <EnterBox {...args} />;

export const Base = Template.bind({});
Base.args = {};
