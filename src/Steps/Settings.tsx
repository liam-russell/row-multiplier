import React from 'react';
import { Heading, Text, Box, Button, Collapsible, TextInput, FormField, CheckBox } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStore } from '../Store/Store';
import { Step } from '../Store/Step';

const Confirm = () => {
    const store = useStore();
    return <Collapsible open={store.step === Step.Settings} direction='vertical'>
        <Box border={{ size: 'large', color: 'brand' }} pad='large' round='small' margin='small'>
            <Heading level={2}>
                <Box align='center'>
                    Step 2
                    <Text size='large' color='dark-2' margin={{ top: 'small' }}>What do you want to do?</Text>
                </Box>
            </Heading>

            <Box margin={{ bottom: 'small' }}>
                <FormField label={`Copy each row ${store.multipler} times?`}>
                    <TextInput
                        value={store.multipler}
                        type='number'
                        min='2'
                        onChange={event => { store.multipler = event.target.valueAsNumber; }}
                    />
                </FormField>
                <CheckBox
                    checked={store.removeHeader}
                    label="Remove first row (eg. a header)?"
                    onChange={(event) => { store.removeHeader = event.target.checked; }}
                />
            </Box>
            <Button alignSelf='center' label='see how it looks' onClick={store.nextStep} />
        </Box>
    </Collapsible>;
}

export default observer(Confirm);