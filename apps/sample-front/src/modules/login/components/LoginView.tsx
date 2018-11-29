import * as React from 'react';
import * as R from 'r';
import { createConnect } from 'typeless';
import { State } from 'src/types';
import { LoginActions } from '../actions';
import styled from 'styled-components';
import { FormInput } from 'src/components/FormInput';
import { Button } from 'src/components/Button';
import { LoginFormProvider } from './LoginFormProvider';
import { ReduxInput } from 'src/components/ReduxInput';
import { LoginFormActions } from '../login-form';
import { Alert } from 'src/components/Alert';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  ${FormInput} {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 400;
  text-align: center;
`;

export const LoginView = createConnect<State>()
  .mapState(state => ({
    ...R.pick(state.login, ['isLoading', 'error']),
  }))
  .pick(LoginFormActions, ['submit'])
  .pick(LoginActions, [])
  .sfc(props => {
    const { submit, isLoading, error } = props;
    return (
      <Wrapper>
        <LoginFormProvider>
          <Form
            onSubmit={e => {
              e.preventDefault();
              submit();
            }}
          >
            <Title>Please sign in</Title>
            {error && <Alert>{error}</Alert>}
            <ReduxInput name="username" label="Username" />
            <ReduxInput name="password" label="Password" />
            <Button large block loading={isLoading}>
              Sign in
            </Button>
          </Form>
        </LoginFormProvider>
      </Wrapper>
    );
  });
