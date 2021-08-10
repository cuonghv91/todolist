import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './index';

export default {
    title: 'Card',
    component: Card,
    displayName: 'Card',
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                {Story()}
            </div>
        ),
    ],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.parameters = {
    docs: {
        source: {
            id: 'This is id of the card',
            isChecked: 'This is id of the card',
            description: 'This is id of the card',
            onRemove: 'This is id of the card',
            onToggleCheck: 'This is id of the card',
        },
    },
};

Default.args = {
    id: 1,
    isChecked: false,
    description: 'my task',
    onRemove: (id: number) => alert(id),
    onToggleCheck: (id: number) => alert(id)
};

export const Checked = Template.bind({});
Checked.args = {
    ...Default.args,
    isChecked: true,
};
