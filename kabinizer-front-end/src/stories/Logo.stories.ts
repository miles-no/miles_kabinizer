import Logo from "@/components/Logo.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Kabinizer/Logo",
  component: Logo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // parameters: {
  //     More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
  // layout: 'fullscreen',
  // },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  // args: {
  //   size: "large",
  // },
};
