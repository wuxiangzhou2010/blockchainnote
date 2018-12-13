import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
class CampaignNew extends Component {

    state = {
        miniumContribution: '',
        errorMessage:'',
        loading: false
    };
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading:true})
        this.setState({errorMessage:''})
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.miniumContribution)
                .send({
                    from: accounts[0]
                })
        } catch (error) {
            // console.log('error occur'+ error.message)
            this.setState({errorMessage:error.message})
        }
        this.setState({loading:false})
    }

    render() {
        return <Layout>
            <h3>Create a campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Minium Contribution</label>
                    <Input
                        label="wei"
                        labelPosition='right'
                        value={this.state.miniumContribution}
                        onChange={event => this.setState({ miniumContribution: event.target.value })}
                    />
                </Form.Field>
                <Message error header='Oops!' content= {this.state.errorMessage}></Message>
                <Button loading={this.state.loading} primary>Create!</Button>
            </Form>
        </Layout>;
    }
}

export default CampaignNew;