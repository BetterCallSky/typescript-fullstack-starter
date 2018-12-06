interface ResetPasswordProps {
  username: string;
  url: string;
}

export const resetPassword = (props: ResetPasswordProps) => ({
  title: `Reset password`,
  body: `
  Hello ${props.username}
  <br />
  <br />
  Welcome <a href="${props.url}">here</a> to reset your password.
  <br/>
  <br/>
  Thanks
  Team
  `,
});
