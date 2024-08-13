
import type { Meta, StoryFn } from '@storybook/react';
import '../../index.css'
import AlertStory from './AlertStory';

// Default export for Storybook
export default {
  title: "Story/Alert",
  component: AlertStory,
  argTypes:{
    type : {
      options: ["success" ,"error"],
      control : {type: "select" }
    }
  }
} as Meta<typeof AlertStory>;

// Template for the stories
const Template: StoryFn<typeof AlertStory> = (args) => <AlertStory {...args} />;

export const Success = Template.bind({});
Success.args = {
     
 
        type: "success",
        message: "Login Successful",
   
     removeAlert: () => {},
};
const alert={
    message: "Error Message",
    type: "error",
}

