import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Calculator from './Calculator'

const meta = {
    component: Calculator
} satisfies Meta<typeof Calculator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {}
}
