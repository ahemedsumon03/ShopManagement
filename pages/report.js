import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListReport from "../components/listReport";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps() {

    return{
        props:{
            url:process.env.APIBASEURL
        }
    }
}

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myData:[]
        }
    }


    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }

        axios.get(this.props.url+"/ReportList/"+SessionHelper.getUserName()).then(response=>{
            this.setState({myData:response.data})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <NavbarDesktop/>
                <ListReport
                    myData={this.state.myData}
                />
            </Fragment>
        );
    }
}

export default Report;