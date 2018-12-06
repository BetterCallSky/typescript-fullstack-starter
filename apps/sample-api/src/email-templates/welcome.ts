interface WelcomeEmailProps {
  username: string;
}

export const welcome = (props: WelcomeEmailProps) => ({
  title: `Welcome ${props.username}`,
  body: `
  Hello ${props.username}
  <br />
  <br />
  Welcome to your website.
  <br/>
  <br/>
  Thanks
  Team
  `,
});
