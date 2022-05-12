import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListTransaction from "../components/listTransaction";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getServerSideProps(context)
{

    const response = await axios.get(process.env.APIBASEURL+"/SelectCategory");
    const jsonData = await response.data;

    const response1 = await axios.get(process.env.APIBASEURL+"/SelectProduct");
    const jsonData1 = await response1.data;

    return{
        props:{
            myData:jsonData,
            newData:jsonData1,
            url:process.env.APIBASEURL,
        }
    }
}

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CartData:[],
            TotalPrice:''
        }
    }


    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }

        axios.get(this.props.url+"/SelectAllCartProduct/"+SessionHelper.getUserName()).then(response=>{
            this.setState({CartData:response.data})
        }).catch();

        axios.get(this.props.url+"/CartTotalPrice/"+SessionHelper.getUserName()).then(response=>{
            this.setState({TotalPrice:response.data})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <NavbarDesktop/>
                <ListTransaction
                    myData={this.props.myData}
                    newData={this.props.newData}
                    url={this.props.url}
                    cartData={this.state.CartData}
                    totalPrice={this.state.TotalPrice}
                />
            </Fragment>
        );
    }
}

export default Transaction;