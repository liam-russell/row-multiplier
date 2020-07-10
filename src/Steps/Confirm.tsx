import React from 'react';
import { Heading, Text, Box, Button, Collapsible, Table, TableBody, TableRow, TableCell } from 'grommet';
import { Step } from '../Store/Step';
import { useStore } from '../Store/Store';
import { observer } from 'mobx-react-lite';

const Confirm = () => {
    const store = useStore();
    return <Collapsible open={store.step === Step.Confirm} direction='vertical'>
        <Box border={{ size: 'large', color: 'brand' }} pad='large' round='small' margin='small'>
            <Heading level={2}>
                <Box align='center'>
                    Step 3
                    <Text size='large' color='dark-2' margin={{ top: 'small' }}>Does this look right?</Text>
                    <Text size='small' color='dark-2'>(ony showing first 20 rows)</Text>
                </Box>
            </Heading>
            <Table margin={{ bottom: 'small' }}>
                <TableBody>
                    {store.processed?.slice(0, Math.min(store.processed.length, 20)).map((row, index) => <TableRow key={index}>
                        {row.map((col, index) => <TableCell key={index}>{col}</TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
            <Button alignSelf='center' label='yep, looks right' onClick={store.nextStep} />
        </Box>
    </Collapsible>;
}

export default observer(Confirm);