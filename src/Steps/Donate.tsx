/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Heading, Text, Box, Collapsible, } from 'grommet';
import { Step } from '../Store/Step';
import { useStore } from '../Store/Store';
import { observer } from 'mobx-react-lite';
import { PayPalButton } from 'react-paypal-button-v2';
import { Paypal } from 'grommet-icons';

const Donate = () => {
    const store = useStore();
    
    return <Collapsible open={store.step === Step.Donate} direction='vertical'>
        <Box border={{ size: 'large', color: 'brand' }} pad='large' round='small' margin='small'>
            <Heading level={2}>
                <Box align='center'>
                    Step 5
                    <Text size='large' color='dark-2' margin={{ top: 'small' }}>Use this often?</Text>
                </Box>
            </Heading>
            <Box align='center' margin={{ bottom: 'medium' }}>
                <Paypal size='xlarge' />
                <Text size='small' color='dark-2'>Would you consider making a donation?</Text>
            </Box>

            <PayPalButton
                amount={2}
                currency='AUD'
                style={{
                    shape: 'pill',
                    color: 'blue',
                    layout: 'horizontal',
                    label: 'paypal'
                }}
                onSuccess={() => {
                    store.notify('good', 'Thank you so much, your donation is very much appreciated! 👍')
                }}
            />
        </Box>
    </Collapsible>;
}

export default observer(Donate);