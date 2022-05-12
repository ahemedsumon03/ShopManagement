import React, {Component,Fragment} from 'react';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

class ListCategoryTransaction extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[]
        }
    }

    componentDidMount() {
        axios.get("https://shopapi.sumonahemed.com/api/ProductSelectByCategory/"+this.props.category).then(res=>{
            this.setState({ProductData:res.data})
        }).catch();
    }


    render() {

        let ProductData = this.state.ProductData;

        let MyView=ProductData.map((List,i)=>{
            return(
                <div key={i.toString()} className="col-md-3 p-1 text-center col-lg-3 col-sm-6 col-3">
                    <Link as={'/productdetails/'+List.product_code} href={'/productdetails/[Pcode]'}>
                        <div className='product-card'>
                            <Image className="product-img-one"  src={List.product_icon} alt='image'/>
                            <h1 className="product_details_name">{List.product_name}</h1>
                            <h1 className="product-price">{List.product_price} TK</h1>
                        </div>
                    </Link>
                </div>
            )
        })

        return (
            <Fragment>
                <div className="mt-1 ">
                    <div  className="animated  zoomIn container-fluid">
                        <div className="row">
                            <div className="col-md-12 p-1  col-lg-12 col-sm-12">
                                <div className="container shadow-sm p-3 bg-white">
                                    <div className="row">
                                        <h4 className='ml-auto mr-auto heading-name'>{this.props.category}</h4>
                                    </div>
                                    <hr/>
                                    <div className="row ListTransactionHeight">
                                        {MyView}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListCategoryTransaction;