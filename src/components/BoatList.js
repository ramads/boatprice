import React from 'react';
import BoatInfo from './BoatInfo';
import { Panel, Pager, ControlLabel, Form, FormGroup, FormControl, Table } from 'react-bootstrap';

class BoatList extends React.Component {

    constructor(props) {
        super(props);

        const number = 10;
        const total = props.boatList.length;

        this.state = {
            page: 0,
            offset: 0,
            number: number,
            orderBy: defaultOrderBy,
            order: defaultOrder,
            boatList: this.sortBoatList(defaultOrderBy, defaultOrder, props.boatList),
            total: total,
            isLastPage:  total <= number
        }
    }

    componentWillReceiveProps(nextProps) {
        const total = nextProps.boatList.length;
        this.setState({
            page: 0,
            offset: 0,
            boatList: this.sortBoatList(this.state.orderBy, this.state.order, nextProps.boatList),
            total: total,
            isLastPage:  total <= this.state.number
        });  
      }
    
    sortBoatList = (orderBy, order, boatList) => {
        boatList = boatList ? boatList : this.state.boatList;
        return boatList.sort((a,b) => {
            if (order === 'ASC') {
                return a[orderBy] < b[orderBy] ? -1 : 1;
            } else {
                return a[orderBy] < b[orderBy] ? 1 : -1;
            }
        });
    }

    handleOrderBy = (e) => {
        const orderBy = e.target.value;
        this.setState(() => ({
            orderBy: orderBy,
            page: 0,
            offset: 0,
            isLastPage: this.state.total <= this.state.number,
            boatList: this.sortBoatList(orderBy, this.state.order)
        }));
    }

    handleOrder = (e) => {
        const order = e.target.value;
        this.setState(() => ({
            order: order,
            page: 0,
            offset: 0,
            isLastPage: this.state.total <= this.state.number,
            boatList: this.sortBoatList(this.state.orderBy, order)
        }));
    }

    nextPage = (e) => {
        const nextPage = this.state.page + 1;
        const offset = (nextPage*this.state.number);
        this.setState(() => ({
            page: nextPage,
            isLastPage: (offset + this.state.number) >= this.state.total,
            offset
        }));
    }

    prevPage = () => {
        const prevPage = this.state.page - 1;
        const offset = (prevPage*this.state.number);
        this.setState(() => ({
            page: prevPage,
            isLastPage: (offset + this.state.number) >= this.state.total,
            offset
        }));
    }

    render() {
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        {this.state.boatList.length} Boats found for Rute <strong>{this.props.depart} - {this.props.arrive}</strong>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Panel>
                        <Panel.Body>
                        <Form inline>
                            <FormGroup>
                                <ControlLabel> Order By:</ControlLabel>{"  "}
                                <FormControl componentClass="select" onChange={this.handleOrderBy}>
                                    {
                                        listOrderBy.map((orderBy, index) => (
                                            <option key={index} 
                                                value={orderBy}>{orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}
                                            </option>
                                        ))
                                    }        
                                </FormControl>{"  "}

                                <FormControl componentClass="select" onChange={this.handleOrder}>
                                    <option value="ASC">Asc</option>
                                    <option value="DESC">Desc</option>    
                                </FormControl>

                            </FormGroup>
                        </Form>
                        </Panel.Body>
                    </Panel>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Boat Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boatList.map((boat, index) => {
                                    if (index >= this.state.offset && index <= (this.state.offset + this.state.number - 1)) {
                                        return (
                                            <tr key={"tr-" + index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <BoatInfo key={index} {...boat} currency={this.props.currency} />
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </Table>

                    <Pager>
                        <Pager.Item previous disabled={this.state.page === 0} onClick={this.prevPage}>
                            &larr; Previous
                        </Pager.Item>
                        <Pager.Item next disabled={this.state.isLastPage} onClick={this.nextPage}>
                            Next &rarr;
                        </Pager.Item>    
                    </Pager>

                </Panel.Body>
            </Panel>
        );
    }
}

const listOrderBy = [
    'price',
    'agent',
    'boat',
    'depart_time'
];

const defaultOrderBy = 'price', defaultOrder = 'ASC';

export default BoatList;