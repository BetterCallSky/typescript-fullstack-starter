import { V } from 'veni';

export const SendEmailSchema = {
  to: V.string().email(),
  data: V.or().items(
    V.object().keys({
      type: V.enum().literal('welcome'),
      props: V.object().keys({
        username: V.string(),
      }),
    }),
    V.object().keys({
      type: V.enum().literal('resetPassword'),
      props: V.object().keys({
        username: V.string(),
        url: V.string(),
      }),
    })
  ),
};
