import React, { Component, Fragment } from 'react';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import './item-details.css';


export const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: false,
        error: false,
    };

    componentDidMount = () => {
        if (this.props.itemId !== null ) {
            this.updateItem(this.props.itemId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevId = prevProps.itemId;
        let id = this.props.itemId;
        if (prevId === id || !id) console.log("it is equal");
        else {
            console.log('it is not equal');
            this.updateItem(id);
        }
    }

    itemLoaded = (item, image) => {
        this.setState({
            item,
            image,
            loading: false,
            error: false,
        });
    };

    updateItem = (id) => {
        const { getData, getImageUrl } = this.props;
        
        this.setState({
            loading: true,
            error: false,
        });

        getData(id)
            //.then(this.sleep(1000))
            .then(async (item) => 
                this.itemLoaded(
                    item, 
                    await getImageUrl(id)
                )
            )
            .catch(this.onError);
    }

    sleep = (ms) => (response) => 
    new Promise(resolve => setTimeout(() => resolve(response), ms));

    onError = error => this.setState({ error: true, loading: false });

    itemsRender(item, image) {
        return (
            <div className="item-details card">
                <div class="image-wrapper">
                    <img className="item-image"
                        width="150"
                        src={image}
                        alt="character"
                    />
                </div>
                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            }) 
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        );
    }

    render() {
        const { item, loading, error, image } = this.state;
        const hasData = !(loading || error) && item;
        
        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? 
            <Spinner /> : 
            item ? null : <span>Select a item from a list</span>;
                
        const content = hasData ? 
            this.itemsRender(item, image) : 
            null;


        return (
            <Fragment>
                {errorMessage}
                {spinner}
                {content}
            </Fragment>
        );
    }
};